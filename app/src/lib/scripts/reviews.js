// Customer reviews shown in the home page carousel (components/Reviews.svelte).
// Copied by hand from the Google Business Profile; there is no live feed. To add one, paste it
// below and update googleSummary to match Google. Keep the rating/count/link visible: showing a
// selection of reviews without the overall picture can be misleading under the DMCC Act 2024.

const PLACE_ID = 'ChIJC8BiotBezQcR0PiSLj0K7b4';

export const googleSummary = {
	// Must match the profile on Google, not just the reviews listed below
	rating: 5.0,
	count: 7,
	readUrl: `https://search.google.com/local/reviews?placeid=${PLACE_ID}`,
	writeUrl: `https://search.google.com/local/writereview?placeid=${PLACE_ID}`
};

/**
 * @typedef {object} CustomerReview
 * @property {string} name Display name: first name + last initial, e.g. 'Sarah T.'
 * @property {string} date Month posted on Google, 'YYYY-MM'
 * @property {number} rating Stars, 1-5
 * @property {string} text Review text, word for word (paragraphs separated by a blank line)
 */

/** @type {CustomerReview[]} Newest first */
export const reviews = [
	// PLACEHOLDERS: replace with the real Google reviews
	{
		name: 'PLACEHOLDER A.',
		date: '2026-10',
		rating: 5,
		text: 'Placeholder review text. Replace with the first real Google review, copied word for word.'
	},
	{
		name: 'PLACEHOLDER B.',
		date: '2026-09',
		rating: 5,
		text: 'A second, longer placeholder so the carousel can be checked with reviews of different lengths. Real reviews vary a lot in length, and the card is sized to fit the longest one so the page does not jump as they rotate.\n\nIt can also have a second paragraph.'
	},
	{
		name: 'PLACEHOLDER C.',
		date: '2026-07',
		rating: 5,
		text: 'Third placeholder review.'
	}
];
