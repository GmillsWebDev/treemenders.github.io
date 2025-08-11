import { trees, gardens, specialist } from '$lib/scripts/services.js';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    const { slug } = params;
    const allServices = [...trees, ...gardens, ...specialist];
    const service = allServices.find(item => item.slug === slug);

    if (!service) {
        return {
            status: 404,
            error: new Error('Service not found')
        };
    }

    return {
        service
    };
}