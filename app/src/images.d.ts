// Image imports with extra query directives (see servicesImages.js / Hero.svelte / Seo.svelte)
declare module '*&withoutEnlargement' {
	const value: import('vite-imagetools').Picture;
	export default value;
}
declare module '*&format=jpg' {
	const value: string;
	export default value;
}
