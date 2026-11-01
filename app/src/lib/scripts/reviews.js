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
		name: 'Janine Aylmore',
		date: '2026-07',
		rating: 5,
		text: "Jake was extremely punctual and really friendly. He quoted a really good price for taking down a 30 foot fir tree. It was a boiling hot day about 31 degrees and he worked tirelessly, not stopping. What a nice fella, he cleaned up and got rid of everything to such a high standard you wouldn't even know he'd been here. Id highly recommend his work ."
	},
	{
		name: 'Charlie Sheppard',
		date: '2026-07',
		rating: 5,
		text: "Jake was thorough with his work and took pride in what he was trying to achieve, communicated great throughout. Will use again when needed."
	},
	{
		name: 'John Hare',
		date: '2026-05',
		rating: 5,
		text: "Did a great job taking out a large tree from the garden and clearing up afterwards. Would thoroughly recommend , nothing was too much trouble"
	},
	{
		name: 'Alexina Berwick',
		date: '2025-11',
		rating: 5,
		text: "Jake was brilliant! His communication was excellent throughout and he left the garden clear and tidy after removing a large tree. Highly recommended."
	}
];
