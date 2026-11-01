// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	// Analytics globals, set by $lib/consent.js once the visitor opts in
	interface Window {
		dataLayer?: unknown[];
		gtag?: (...args: unknown[]) => void;
		gtagLoaded?: boolean;
		hj?: ((...args: unknown[]) => void) & { q?: unknown[] };
		_hjSettings?: { hjid: number };
		csqLoaded?: boolean;
	}
}

export {};
