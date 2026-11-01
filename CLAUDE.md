# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Marketing site for **Treemenders** (tree surgery & garden services, Chichester / West Sussex), live at https://treemendersarb.co.uk/.
Fully static SvelteKit site — no backend, no CMS, no database. All content lives in source files.

The SvelteKit project is in `app/`. The repo root only holds docs. **Run all npm commands from `app/`.**

## Commands (from `app/`)

```bash
npm install
npm run dev        # local dev server (http://localhost:5173)
npm run build      # prerender static site to app/build/
npm run preview    # serve the production build locally
npm run check      # svelte-check (type/a11y diagnostics)
npm run format     # prettier --write
npm run lint       # prettier --check + eslint
```

There are no tests. Verify changes with `npm run build` (must succeed, `strict: true` fails on unprerenderable routes) and by checking the page in `npm run dev`/`preview`.

## Stack

- SvelteKit 2 + Svelte 5, plain JavaScript (JSDoc via `jsconfig.json`, no TypeScript source)
- `@sveltejs/adapter-static`, everything prerendered (`prerender = true`, `trailingSlash = 'always'` in `src/routes/+layout.js`)
- `@sveltejs/enhanced-img` for all photos (AVIF/WebP/fallback at several widths). Small UI images (logo, icons) are plain `<img>`
- Font Awesome (kit script) for icons. Fonts are self-hosted via `@fontsource-variable/cinzel` and `@fontsource-variable/reddit-sans` (imported in `+layout.svelte`); no Google Fonts
- Analytics: Google Analytics (`G-9HS1XD1SHH`) and Contentsquare (`6513386`), loaded **only after cookie consent** by `src/lib/consent.js`

## Code style

- Components are written in **Svelte 4 syntax** (`export let`, `<slot>`, `on:click`) even though Svelte 5 is installed. Match this when editing existing components; don't half-migrate a file to runes.
- Styles are component-scoped `<style>` blocks using native CSS nesting. Global styles: `src/styles/app.css`; design tokens (colours, fonts) in `src/styles/base.css` as `--colour-*` / `--font-*` custom properties. British spelling (`colour`) in variable names.
- Breakpoints used throughout: 450px, 650px, 768px, 900px, 1028/1024px, 1280px.
- Components live in `src/components/` (not `$lib`), imported by relative path.

## Layout

```
app/src/
  app.html                 # <head>: favicons, FA kit. No title/description, fonts or analytics here
  routes/
    +layout.js / .svelte   # prerender + trailingSlash; LocalBusiness JSON-LD; Nav / <main> / Footer
    +page.svelte           # Home: Hero, AboutIntro, 3 USP panels, featured service cards (by slug), Review, CtaBanner
    services/+page.svelte  # All categories rendered as <h2> sections; tabs only show/hide them
    services/[slug]/       # Service detail: Service + BreadcrumbList JSON-LD, related services
    sitemap.xml/+server.js # Sitemap generated at build time
    +error.svelte          # Custom 404 / error page
    privacy-policy/, cookie-policy/  # Legal pages (LegalPage.svelte wrapper)
    contact/+page.svelte   # Phone/email + embedded Google My Map (no contact form, by design)
  components/              # Seo, Hero, Card, Button, Nav, Footer, AboutIntro, Reviews (carousel), CtaBanner,
                           # CookieConsent (banner), MapEmbed (click-to-load map), LegalPage
  lib/site.js              # SITE_URL + business details (name, owner, phone, email, areas, socials)
  lib/consent.js           # Cookie consent store + loading/removing GA & Contentsquare
  lib/scripts/reviews.js   # Google reviews, copied by hand (no API: Places API ToS forbids storing them), + rating/count summary
  lib/scripts/services.js  # ALL service content: `trees`, `gardens`, `specialist`, plus `categories`, `allServices`, `getRelated()`
  lib/scripts/servicesImages.js  # enhanced-img imports -> `servicesImages` map
  lib/images/              # branding/, icons/, images/ (banners, about), services/
app/static/                # .htaccess (404 + HTTPS/non-www redirects), robots.txt, favicons
```

## Service content model

Each entry in `services.js`:

```js
{
  title, slug, description, image, alt,
  imageFocus,  // optional CSS object-position for cropped frames, e.g. 'center 30%'
  pageContent: { bannerTitle, bannerTag, longDesc /* HTML string */, what: [{id, content}], why: [{id, content}] }
}
```

`longDesc` and `what`/`why` content are rendered with `{@html}`. Adding a service = add an object to the right array + an image in `servicesImages.js`. The detail page (via `entries()` in `services/[slug]/+page.js`), sitemap and page `<title>`/description are all generated from that data.

## Images — gotchas

- Service images: drop the file in `src/lib/images/services/`, import it in `servicesImages.js` **with the same query as the others** (`?enhanced&w=1600;1200;800;480&withoutEnlargement`), reference via `servicesImages.<key>` in `services.js`.
- These imports are `Picture` objects, not URLs: render with `<enhanced:img src={...} sizes="...">` (see `Card.svelte`). For a plain URL (e.g. og:image) use `picture.img.src`. Without an explicit `w` list, enhanced-img only emits full + half size, so huge originals would ship huge.
- Type declarations for these query imports are in `src/images.d.ts`.
- Source files can be large/high-res; the build resizes and compresses. Prefer JPG/WebP sources over PNG for photos (the non-AVIF fallback keeps the source format; WebP sources fall back to PNG).
- **Filename casing:** import paths must match the filename exactly. Windows is case-insensitive so a mismatch builds locally but breaks on Linux.
- Cards (`Card.svelte`) crop to a fixed **3:2** frame and the service detail page to **4:3**, both `object-fit: cover`. For portrait photos set `imageFocus` on the service (e.g. `'center 30%'` keeps more of the top) and check the crop.
- Client photos: rotate upright, strip metadata (phone photos carry GPS), and resize to ~2400px before committing. `sharp(src).rotate().resize(2400, 2400, { fit: 'inside' }).jpeg({ quality: 85, mozjpeg: true })` does all three.
- `images/services/replaced/` holds stock images swapped out in Nov 2026 (see `IMAGE-CHANGES.md`); nothing imports them. Delete both once the new images are signed off.
- Always give meaningful `alt` text.
- Heroes default to `images/banner_1.webp` (`Hero.svelte`); pass `bannerBg` (an enhanced Picture) to override.

## Conventions & gotchas

- **Prerendering:** any dynamic route must export `entries()`. The prerender crawler only follows links in the initial HTML. After building, `app/build/services/` should contain one folder per service.
- **Internal links end in `/`** (`/contact/`, `/services/fencing/`). `trailingSlash = 'always'`, and the live host 301-redirects slashless URLs. The canonical host is `https://treemendersarb.co.uk` (no www), enforced in `static/.htaccess`.
- **SEO tags:** every page uses `<Seo title description [image] [jsonLd]>` (`components/Seo.svelte`) for title, description, canonical, Open Graph and Twitter tags. `app.html` deliberately has none, to avoid duplicates. Business details come from `lib/site.js`. Don't add review/rating schema for on-site testimonials (Google treats it as self-serving).
- `sitemap.xml` is a prerendered endpoint (`src/routes/sitemap.xml/+server.js`) built from `services.js`; there is no file in `static/`.
- There is intentionally no contact form (client decision); contact is phone/email only. There is no backend, so a form would need a third-party service.
- **404 page:** `src/routes/+error.svelte`. The adapter's `fallback: '404.html'` emits a client-rendered shell that shows it for any unknown URL; `static/.htaccess` (`ErrorDocument 404 /404.html`) tells the LiteSpeed host (Eco Web Hosting, cPanel) to serve it. That file overwrites the server's `.htaccess` on deploy, so all server rules must live there.
- **Cookie consent** (`lib/consent.js`): nothing optional loads until the visitor opts in. Categories: `analytics` (GA), `recording` (Contentsquare), `maps` (Google Maps embed via `MapEmbed`). Choice is stored in `localStorage` (`cookieConsent`) for 6 months with a `CONSENT_VERSION`; **bump the version whenever cookies/third parties change** and update `/cookie-policy/` and `/privacy-policy/`. Withdrawing consent deletes the tracker cookies and reloads. Trackers only load on the production hostname, never localhost.
- Never add third-party scripts or embeds directly to `app.html` or a page; route them through `consent.js` and list them in the cookie policy.
- `vite.config.js` stops the dev server watching `build/` (rebuilding while `npm run dev` runs otherwise crashes it on Windows with EBUSY).

## Deployment

`npm run build` → upload contents of `app/build/` to the static host. There is no CI in the repo.
