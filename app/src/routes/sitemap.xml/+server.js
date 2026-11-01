import { trees, gardens, specialist } from '$lib/scripts/services.js';

// Generated at build time so new services are always included
export const prerender = true;
export const trailingSlash = 'never';

const site = 'https://treemendersarb.co.uk';

export function GET() {
	const pages = [
		{ path: '/', priority: '1.00' },
		{ path: '/services/', priority: '0.80' },
		{ path: '/contact/', priority: '0.80' },
		...[...trees, ...gardens, ...specialist].map(({ slug }) => ({
			path: `/services/${slug}/`,
			priority: '0.80'
		}))
	];

	const lastmod = new Date().toISOString();

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		({ path, priority }) => `<url>
  <loc>${site}${path}</loc>
  <lastmod>${lastmod}</lastmod>
  <priority>${priority}</priority>
</url>`
	)
	.join('\n')}
</urlset>
`;

	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
