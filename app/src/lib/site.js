// Single source of truth for business details used in SEO tags, structured data and the sitemap.
// Keep these consistent with the Google Business Profile and social accounts.

export const SITE_URL = 'https://treemendersarb.co.uk';

export const business = {
	name: 'Treemenders',
	legalName: 'Treemenders Arboriculture',
	// Sole trader: the legal person behind the trading name (named in the privacy policy as data controller)
	owner: 'Jake Williams',
	description:
		'Tree surgery, arboricultural and garden services for homes and businesses across Chichester, West Sussex, East Sussex and Hampshire.',
	telephone: '+447496340967',
	email: 'Treemendersarb@gmail.com',
	locality: 'Chichester',
	region: 'West Sussex',
	country: 'GB',
	areaServed: ['Chichester', 'West Sussex', 'East Sussex', 'Hampshire'],
	sameAs: [
		'https://www.facebook.com/people/Treemenders-Arboriculture/61575724665977/',
		'https://www.instagram.com/treemenders_arboriculture',
		'https://www.google.com/maps/place/?q=place_id:ChIJC8BiotBezQcR0PiSLj0K7b4'
	]
};

/** @param {string} path */
export const absoluteUrl = (path) => new URL(path, SITE_URL).href;
