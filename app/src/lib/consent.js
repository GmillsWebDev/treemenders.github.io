// Cookie consent: shared state for the banner (CookieConsent.svelte), the footer's
// "Cookie settings" link and the click-to-load map, plus loading/unloading trackers.
// Nothing non-essential loads until the visitor opts in. See /cookie-policy/.
import { writable, get } from 'svelte/store';
import { SITE_URL } from '$lib/site.js';

const STORAGE_KEY = 'cookieConsent';
const EXPIRY_MS = 6 * 30 * 24 * 60 * 60 * 1000; // roughly six months
// Bump when the cookies we use change, so everyone is asked again
const CONSENT_VERSION = 1;

const GA_MEASUREMENT_ID = 'G-9HS1XD1SHH';
const CONTENTSQUARE_HJID = 6513386;
// Trackers only run on the live site, so local dev / previews don't pollute the data
const PRODUCTION_HOST = new URL(SITE_URL).hostname;

/** @typedef {{ analytics: boolean, recording: boolean, maps: boolean }} Choices */

/** @type {Choices} */
const NONE = { analytics: false, recording: false, maps: false };

export const consent = writable({ ...NONE });
export const bannerOpen = writable(false);

export function openCookieSettings() {
	bannerOpen.set(true);
}

/** Call once on page load (root layout). */
export function initConsent() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		const saved = raw ? JSON.parse(raw) : null;
		const valid =
			saved &&
			saved.version === CONSENT_VERSION &&
			Date.now() - saved.timestamp < EXPIRY_MS;
		if (!valid) {
			if (raw) localStorage.removeItem(STORAGE_KEY);
			bannerOpen.set(true);
			return;
		}
		const choices = { analytics: !!saved.analytics, recording: !!saved.recording, maps: !!saved.maps };
		consent.set(choices);
		applyConsent(choices);
	} catch {
		// Storage blocked or corrupt value: ask again
		bannerOpen.set(true);
	}
}

/** @param {Choices} choices */
export function saveConsent(choices) {
	const previous = get(consent);
	consent.set({ ...choices });
	bannerOpen.set(false);
	try {
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({ ...choices, version: CONSENT_VERSION, timestamp: Date.now() })
		);
	} catch {
		// Storage unavailable: the choice still applies for this page view
	}

	// Withdrawing consent must actually stop tracking: scripts already running can't be
	// unloaded, so clear their cookies and reload without them.
	const withdrawn =
		(previous.analytics && !choices.analytics) || (previous.recording && !choices.recording);
	if (withdrawn) {
		if (!choices.analytics) clearCookies(/^_ga/);
		if (!choices.recording) clearCookies(/^(_hj|_cs)/);
		location.reload();
		return;
	}
	applyConsent(choices);
}

export const acceptAll = () => saveConsent({ analytics: true, recording: true, maps: true });
export const rejectAll = () => saveConsent({ ...NONE });

/** Grants map consent from the map placeholder without touching the other choices. */
export function allowMaps() {
	saveConsent({ ...get(consent), maps: true });
}

/** @param {Choices} choices */
function applyConsent(choices) {
	if (location.hostname !== PRODUCTION_HOST) return;
	if (choices.analytics) injectAnalytics();
	if (choices.recording) injectRecording();
}

function injectAnalytics() {
	if (window.gtagLoaded) return;
	const dataLayer = (window.dataLayer = window.dataLayer || []);
	window.gtag = function () {
		// gtag expects the arguments object itself, not an array
		dataLayer.push(arguments);
	};
	// Consent Mode v2: analytics granted (visitor opted in), advertising never used
	window.gtag('consent', 'default', {
		analytics_storage: 'granted',
		ad_storage: 'denied',
		ad_user_data: 'denied',
		ad_personalization: 'denied'
	});
	window.gtag('js', new Date());
	window.gtag('config', GA_MEASUREMENT_ID, { cookie_domain: PRODUCTION_HOST });

	const script = document.createElement('script');
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
	document.head.appendChild(script);
	window.gtagLoaded = true;
}

function injectRecording() {
	if (window.csqLoaded) return;
	if (!window.hj) {
		/** @type {NonNullable<Window['hj']>} */
		const hj = function () {
			(hj.q = hj.q || []).push(arguments);
		};
		window.hj = hj;
	}
	window._hjSettings = { hjid: CONTENTSQUARE_HJID };
	const script = document.createElement('script');
	script.async = true;
	script.src = `https://static.hj.contentsquare.net/c/csq-${CONTENTSQUARE_HJID}.js`;
	document.head.appendChild(script);
	window.csqLoaded = true;
}

/** Expires matching cookies on this host and the parent domain (GA sets them on ".domain"). */
/** @param {RegExp} pattern */
function clearCookies(pattern) {
	const host = location.hostname;
	const domains = ['', host, `.${host}`, `.${host.split('.').slice(-3).join('.')}`];
	for (const cookie of document.cookie.split(';')) {
		const name = cookie.split('=')[0].trim();
		if (!pattern.test(name)) continue;
		for (const domain of domains) {
			document.cookie =
				`${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/` + (domain ? `; domain=${domain}` : '');
		}
	}
}
