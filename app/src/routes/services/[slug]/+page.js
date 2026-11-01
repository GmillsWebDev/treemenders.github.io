import { error } from '@sveltejs/kit';
import { allServices } from '$lib/scripts/services.js';

// Tell the prerenderer about every service page, not just the ones it finds by crawling links
/** @type {import('./$types').EntryGenerator} */
export function entries() {
    return allServices.map(({ slug }) => ({ slug }));
}

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    const service = allServices.find(item => item.slug === params.slug);

    if (!service) {
        error(404, 'Service not found');
    }

    return {
        service
    };
}
