import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [enhancedImages(), sveltekit()],
	server: {
		watch: {
			// Don't watch the static build output. Rebuilding while `npm run dev` runs
			// deletes watched files, which crashes the watcher on Windows (EBUSY).
			ignored: ['**/build/**']
		}
	}
});
