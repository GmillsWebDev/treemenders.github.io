# Treemenders

Website for **Treemenders Arboriculture**, tree surgery, garden care and fencing across Chichester, West Sussex, East Sussex and Hampshire.

Live: https://treemendersarb.co.uk/

A fully static site built with [SvelteKit](https://svelte.dev/docs/kit) and prerendered with `adapter-static`. There's no backend or CMS; all page content, including every service page, lives in the source.

## Getting started

Requires Node.js 20+.

```bash
cd app
npm install
npm run dev
```

Then open http://localhost:5173.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Prerender the full site to `app/build/` |
| `npm run preview` | Serve the production build locally |
| `npm run check` | Run `svelte-check` diagnostics |
| `npm run format` | Format with Prettier |
| `npm run lint` | Prettier check + ESLint |

## Project structure

```
app/
  src/
    app.html              Global <head>: SEO defaults, favicons, fonts, Font Awesome, analytics
    routes/               Pages: home, /services, /services/[slug], /contact
    components/           Hero, Card, Button, Nav, Footer, AboutIntro, Review, CtaBanner
    lib/scripts/
      services.js         All service content (trees / gardens / specialist)
      servicesImages.js   Service image imports
    lib/images/           branding, icons, banner & service photos
    styles/               base.css (design tokens) + app.css (global styles)
  static/                 robots.txt, favicons (sitemap.xml is generated: src/routes/sitemap.xml)
```

## Editing content

### Services

Every service is an object in `app/src/lib/scripts/services.js`, grouped into three arrays that match the tabs on `/services`:

- `trees`: Tree Care
- `gardens`: Garden Care
- `specialist`: Specialist Services

Each service has a `title`, a URL `slug`, a short card `description`, an `image` and `alt` text, plus `pageContent` (hero tagline, long description HTML, and "What we do" / "Why we do it" lists) for its detail page at `/services/<slug>/`.

To **add a service**:
1. Add the object to the right array in `services.js`.
2. Add its image (see below).
3. Run `npm run build` and confirm `app/build/services/<slug>/index.html` exists.

The service's page, its `<title>`/meta description, and its `sitemap.xml` entry are all generated automatically.

### Images

1. Put the file in `app/src/lib/images/services/`. A good-quality JPG or WebP at least 1600px wide is ideal. Don't worry about file size: the build automatically generates compressed AVIF/WebP versions at several sizes.
2. Import it in `app/src/lib/scripts/servicesImages.js`, copying the `?enhanced&w=...` query from the other lines exactly, and add it to the `servicesImages` object.
3. Point the service's `image` at `servicesImages.<name>` and write descriptive `alt` text.

Service cards crop images to a 3:2 frame, and service pages to 4:3. For portrait photos, or where the subject isn't central, add `imageFocus: 'center 30%'` (or similar) to the service in `services.js` to choose which part stays in shot. Photos straight from a phone should be rotated upright, stripped of location data and resized first (see `CLAUDE.md`).

The home page's featured cards are picked by slug in `app/src/routes/+page.svelte`.

> **Match filename case exactly in imports.** Windows doesn't care about case but Linux build servers do, so `treeFelling.jpg` won't find `TreeFelling.jpg`.

Other images: hero banner `lib/images/images/banner_1.webp`, About section `lib/images/images/chainsaw2.webp`, logo `lib/images/branding/logo_med.webp`.

### Business details & SEO

Business name, phone, email, areas served and social links used in search-engine structured data live in `app/src/lib/site.js`. Keep them matching the Google Business Profile.

### Contact details, reviews, socials

- Phone / email / map: `app/src/routes/contact/+page.svelte`
- Home page review text: `app/src/routes/+page.svelte`
- Social links and footer blurb: `app/src/components/Footer.svelte`
- Default SEO title/description: `app/src/app.html`; per-page overrides are in each page's `<svelte:head>`

### Styling

Brand colours and fonts are CSS custom properties in `app/src/styles/base.css`:

| Token | Value |
| --- | --- |
| `--colour-primary` | `#42356C` |
| `--colour-secondary` | `#766886` |
| `--colour-accent` | `#E4DEDC` |
| `--font-heading` | Cinzel |
| `--font-body` | Reddit Sans |

## Deployment

```bash
cd app
npm run build
```

Upload the contents of `app/build/` to the web host's `public_html`. Every route is prerendered to its own `index.html` (trailing-slash URLs).

The build includes a hidden `.htaccess` file (from `app/static/.htaccess`) that tells the server to show the custom 404 page (`404.html`). Make sure your upload method includes dotfiles. Any server rules (redirects etc.) belong in `app/static/.htaccess`, because the uploaded copy replaces whatever is on the server.

## Analytics, cookies & privacy

Google Analytics 4, Contentsquare and the Google Map on the contact page only load after the visitor accepts them in the cookie banner (`app/src/components/CookieConsent.svelte`, logic in `app/src/lib/consent.js`). Visitors can change their choice via **Cookie settings** in the footer. Analytics never runs on localhost.

If you add or remove any tracking or third-party service, update `/cookie-policy/` and `/privacy-policy/` (`app/src/routes/`) and bump `CONSENT_VERSION` in `consent.js` so everyone is asked again.
