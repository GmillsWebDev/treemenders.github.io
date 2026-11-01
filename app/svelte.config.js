import adapter from '@sveltejs/adapter-static';

export default {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html', // served by the host for unknown URLs; renders src/routes/+error.svelte
			precompress: false,
			strict: true
		})
	}
};
