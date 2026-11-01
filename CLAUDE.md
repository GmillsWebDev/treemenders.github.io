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
- `@sveltejs/enhanced-img` is installed but only used in `AboutIntro.svelte`; everything else uses plain `<img>` with Vite-imported URLs
- Font Awesome (kit script) for icons, Google Fonts (Cinzel / Reddit Sans / Tinos)
- Analytics: Google Analytics (`G-9HS1XD1SHH`) and Contentsquare/Hotjar, both inline in `src/app.html`

## Code style

- Components are written in **Svelte 4 syntax** (`export let`, `<slot>`, `on:click`) even though Svelte 5 is installed. Match this when editing existing components; don't half-migrate a file to runes.
- Styles are component-scoped `<style>` blocks using native CSS nesting. Global styles: `src/styles/app.css`; design tokens (colours, fonts) in `src/styles/base.css` as `--colour-*` / `--font-*` custom properties. British spelling (`colour`) in variable names.
- Breakpoints used throughout: 450px, 650px, 768px, 900px, 1028/1024px, 1280px.
- Components live in `src/components/` (not `$lib`), imported by relative path.

## Layout

```
app/src/
  app.html                 # <head>: default SEO meta, favicons, fonts, FA kit, GA + Contentsquare
  routes/
    +layout.js / .svelte   # prerender + trailingSlash; Nav / <main> / Footer
    +page.svelte           # Home: Hero, AboutIntro, 3 USP panels, 4 featured service cards, Review, CtaBanner
    services/+page.svelte  # Tabbed grid (Tree Care / Garden Care / Specialist / All)
    services/[slug]/       # Service detail page, data looked up by slug
    contact/+page.svelte   # Phone/email + embedded Google My Map (no contact form, by design)
  components/              # Hero, Card, Button, Nav, Footer, AboutIntro, Review, CtaBanner (Header.svelte is empty/unused)
  lib/scripts/services.js  # ALL service content: arrays `trees`, `gardens`, `specialist`
  lib/scripts/servicesImages.js  # image imports -> `servicesImages` and `homeImages` maps
  lib/images/              # branding/, icons/, images/ (banners, about), services/
app/static/                # robots.txt, sitemap.xml (hand-maintained), favicons
```

## Service content model

Each entry in `services.js`:

```js
{
  title, slug, description, image, alt,
  pageContent: { bannerTitle, bannerTag, longDesc /* HTML string */, what: [{id, content}], why: [{id, content}] }
}
```

`longDesc` and `what`/`why` content are rendered with `{@html}`. Adding a service = add an object to the right array + an image in `servicesImages.js`. The detail page (via `entries()` in `services/[slug]/+page.js`), sitemap and page `<title>`/description are all generated from that data.

## Images — gotchas

- Service images: drop the file in `src/lib/images/services/`, import it in `servicesImages.js`, reference via `servicesImages.<key>` in `services.js`. Home page cards use `homeImages`.
- **Filename casing:** import paths must match the filename exactly. Windows is case-insensitive so a mismatch builds locally but breaks on Linux.
- Prefer `.webp`, sized for purpose (cards render at ~max 13.5rem tall). Always give meaningful `alt` text.
- All page heroes currently share `images/banner_1.webp`.

## Conventions & gotchas

- **Prerendering:** any dynamic route must export `entries()`. The prerender crawler only follows links in the initial HTML, and the `/services` tabs only render Tree Care initially. After building, `app/build/services/` should contain one folder per service.
- **Internal links end in `/`** (`/contact/`, `/services/fencing/`). `trailingSlash = 'always'`, and the live host 301-redirects slashless URLs.
- **`<title>` / description are set per page** in `<svelte:head>`. `app.html` deliberately has none, to avoid duplicate tags.
- `sitemap.xml` is a prerendered endpoint (`src/routes/sitemap.xml/+server.js`) built from `services.js`; there is no file in `static/`.
- There is intentionally no contact form (client decision); contact is phone/email only. There is no backend, so a form would need a third-party service.
- **404 page:** `src/routes/+error.svelte`. The adapter's `fallback: '404.html'` emits a client-rendered shell that shows it for any unknown URL; `static/.htaccess` (`ErrorDocument 404 /404.html`) tells the LiteSpeed host (Eco Web Hosting, cPanel) to serve it. That file overwrites the server's `.htaccess` on deploy, so all server rules must live there.

## Deployment

`npm run build` → upload contents of `app/build/` to the static host. There is no CI in the repo.
