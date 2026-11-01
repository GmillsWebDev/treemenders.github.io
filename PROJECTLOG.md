# Project log

Running record of work on the Treemenders site and what's still outstanding. Newest session first. Tick items off (`[x]`) as they're done and add a dated entry for each session.

---

## Outstanding

### Needs the client

- [ ] **Add the real Google reviews.** All 7 are 5★. Paste each one's name (shown as first name + last initial), month/year and text, word for word, into `app/src/lib/scripts/reviews.js`, replacing the 3 `PLACEHOLDER` entries. Keep `googleSummary` (rating 5.0, count 7) matching Google.
- [ ] **Replace the remaining stock photos** when client photos are available (follow the process in `CLAUDE.md`: rotate, strip metadata/GPS, resize, set `imageFocus`, write alt text, log in `IMAGE-CHANGES.md`):
  - [ ] Crown Reduction
  - [ ] Tree Pruning & Shaping
  - [ ] Tree Planting
  - [ ] Stump Grinding & Removal
  - [ ] Emergency Tree Work
  - [ ] Tree Surveys
  - [ ] Commercial Grounds Maintenance
  - [ ] Shrub & Topiary Care: currently a stand-in (sleeper wall + hedge), needs a proper topiary photo
  - [ ] Deadwood Removal: optional, current photo is low resolution (1152×2048)
  - [ ] Hero banner (`images/banner_1.webp`, shared by every page) and About section image (`images/chainsaw2.webp`); both still stock
- [ ] **Homeowner consent for job photos.** House fronts are recognisable in Fencing, Garden Clearance, Crown Thinning and Shrub & Topiary. The house number on Fencing is already blurred. The privacy policy now promises the client asks before publishing, so check that's happened for these.
- [ ] **Jake to read the privacy policy** (`/privacy-policy/`) and confirm it matches how he actually works: asking before publishing photos, deleting dead enquiries after 12 months, keeping records 6 years, replying to requests within a month.
- [ ] **ICO data protection fee:** not registered. Likely exempt, but if dashcams or CCTV are ever used he must register. Confirm with the ICO's 2-minute self-assessment.
- [ ] **Facts for structured data and SEO** (`app/src/lib/site.js`): opening hours, credentials (NPTC, Arboricultural Association, public liability cover amount). No public address, by choice (sole trader, home address stays private).
- [ ] **Substantiate claims:** "Fully Insured" and "Satisfaction Guaranteed" on the home page must be true. Ideally add specifics (cover amount, what the guarantee means).
- [ ] **FAQ section** (good for SEO/AI search): client to answer common questions on TPOs and conservation areas, rough pricing, waste removal, insurance and qualifications.
- [ ] **Copy pass** (body content was deliberately left untouched):
  - [ ] Add concrete facts: specific towns covered, qualifications, years of experience
  - [x] Align service areas: footer now matches About/contact ("Chichester and West Sussex, and into East Sussex and Hampshire")
  - [ ] Check claims in service copy: "24/7 emergency call-out" (Emergency Tree Work), "years of experience" (Tree Planting, contradicts "young company" in About), "our team" throughout (sole trader?)
  - [ ] Optional: shorten the Tree Planting and Fencing card descriptions to match the others (they are 2–3x longer, so those cards look uneven)
- [ ] **Professional email:** consider `@treemendersarb.co.uk` (Eco Web Hosting likely includes email) instead of Gmail. If changed, update `site.js` and both policy pages.

### Go-live / deployment checklist

- [ ] Merge `updates/NewImages` into `main`.
- [ ] `cd app && npm run build`, then upload **all** of `app/build/` to `public_html`, **including the hidden `.htaccess`** (turn on "show hidden files").
- [ ] Test straight after uploading:
  - [ ] `http://www.treemendersarb.co.uk/services/` redirects to `https://treemendersarb.co.uk/services/` (redirect rules couldn't be tested locally; if anything loops, delete the rewrite lines from the server's `.htaccess`)
  - [ ] `/services/fencing/` loads directly (used to 404)
  - [ ] A made-up URL shows the "hasn't been planted yet" 404 page
  - [ ] Cookie banner appears; Reject all → nothing loads; Accept all → GA, Contentsquare and the map load
- [ ] Accept all on the live site, then check DevTools → Application → Cookies against the table on `/cookie-policy/` (Contentsquare cookie names couldn't be verified locally).
- [ ] Google Analytics: check Admin → Data retention matches the privacy policy ("up to 14 months"; GA4 defaults to 2 months).
- [ ] Expect GA visitor numbers to drop after launch: people who reject or ignore the banner aren't counted.
- [ ] Google Search Console: resubmit `https://treemendersarb.co.uk/sitemap.xml` (6 service pages were previously missing).
- [ ] Google Business Profile: check name ("Treemenders Arboriculture"), phone and website match `site.js` exactly.
- [ ] Phone check: 404 page and cookie banner below 450px width (couldn't be screenshotted narrower than 500px).

### Clean-up (once the new photos are signed off)

- [ ] Delete `IMAGE-CHANGES.md` and `app/src/lib/images/services/replaced/`.

### Technical: when time allows

- [ ] **Track phone and email clicks in GA:** the site's main conversions, currently untracked. Small change in `consent.js` + the contact links.
- [ ] **Update build dependencies.** `npm audit` shows 0 vulnerabilities in what ships to visitors; all advisories are in build tools (Vite, sharp, Rollup…). Do it as its own session and compare before/after builds, since sharp now does all image processing.
- [ ] **Fix lint:** existing before today. Prettier flags 28 files, ESLint 18 errors. Run `npm run format` as its own commit so it doesn't bury real changes, then fix the remaining ESLint errors.
- [ ] Optional: SVG favicon (needs an SVG of the leaf logo; the old `favicon.svg` was the Svelte logo and was removed).
- [ ] Optional: per-page hero banners using client photos (`Hero.svelte` already accepts a `bannerBg` prop).
- [ ] Optional: share images for WebP-sourced photos fall back to PNG (some over 1 MB). Resolves itself as stock WebPs are replaced by client JPGs.

### On hold (decided)

- Location pages (e.g. "Tree Surgeon in Bognor Regis"): risk of doorway-page penalties; revisit once the core site is solid.
- `llms.txt`: unproven benefit; left out for now.

---

## 1 November 2026 (later): body-content SEO pass

Light-touch, wording left as it was apart from the fixes below.

- Hand-written meta descriptions (`metaDescription` in `services.js`) for all 17 service pages: location-led, 140–160 chars. Previously the short card text + "Serving Chichester and West Sussex." (some under 100 chars, Tree Planting/Fencing over 200).
- Contextual internal links in existing copy: About section (services page + 6 services), footer (4 services), Stump Grinding → Tree Felling, Site Clearance → Stump Grinding, Commercial → Hedge Trimming and Tree Surveys.
- Alt text rewritten where it was wrong or empty of meaning: Tree Surveys ("Tree Survey"), Commercial Grounds Maintenance ("Tree Removal"), Tree Planting, Stump Grinding, About image.
- Footer service area aligned with About/contact/structured data.
- Spelling: "leveling" → "levelling", "curb appeal" → "kerb appeal"; missing full stop in About.

---

## 1 November 2026: docs, SEO overhaul, client photos, cookies & reviews

Branch `updates/NewImages`. Commits `31b1e0d` → `567f850`.

### Docs
- Added `CLAUDE.md` (architecture, conventions, gotchas) and rewrote `README.md` (was a one-line UTF-16 file). Replaced the `sv` boilerplate in `app/README.md`.
- Added `IMAGE-CHANGES.md` (temporary revert notes for the photo swap) and this log.

### Bugs fixed
- **6 of 17 service pages were 404ing on the live site** (Garden/Specialist services were never prerendered). Fixed with `entries()` in `services/[slug]/+page.js`; all 17 now build.
- Duplicate `<title>`/description tags on `/services/` and `/contact/`.
- Every internal link 301-redirected (missing trailing slash).
- Nav active highlight only ever matched Home.
- Services tab labels vanished on hover (invalid `darken()` CSS).
- Image import paths didn't match filename case (would break on a Linux build server).
- Unknown service URLs didn't return a real 404.
- Horizontal scrollbar on every page on desktop Windows (nav `width: 100vw`).
- Dev server crashed (`EBUSY`) when rebuilding while `npm run dev` was running; `build/` is now excluded from the watcher.
- Favicon manifest had an empty name and broken icon paths; Pollarding tagline/title were copied from Tree Felling.

### New features
- Custom 404 page ("Looks like this hasn't been planted yet") + `.htaccess` `ErrorDocument` for the LiteSpeed host.
- Sitemap now generated at build time from `services.js`.
- `/services/` shows all categories as `<h2>` sections (all 17 links visible to search engines); tabs show/hide them.
- Related Services cards on every service page.
- Cookie consent banner (Analytics / Site improvement / Maps; Accept and Reject equal; withdrawing deletes tracker cookies; consent versioning; trackers only on the live domain). GA and Contentsquare moved out of `app.html`.
- Click-to-load Google Map on the contact page.
- `/privacy-policy/` and `/cookie-policy/` pages + footer links (incl. "Cookie settings").
- Google reviews carousel (curated `reviews.js`, honest rating/count/"Read all reviews" line, pause/arrows/dots/swipe, reduced-motion aware). Old unattributed review removed. Placeholders until real reviews are added.

### SEO / GEO
- Redirects to a single canonical host (`https://treemendersarb.co.uk`, no www) + canonical tags.
- Per-page titles and descriptions via `Seo.svelte`, including all service pages.
- Structured data: `LocalBusiness` (every page), `Service` + `BreadcrumbList` (service pages). Business details centralised in `lib/site.js`.
- Open Graph / Twitter share tags with images.
- Headings with location keywords ("… in Chichester & West Sussex"), category `<h2>`s, fixed heading levels.
- `lang="en-GB"`, Font Awesome deferred, keywords meta removed.
- Hidden descriptive text on all "Learn More" links ("Learn More about Fencing").
- Consistent business name: "Treemenders Arboriculture" (full) / "Treemenders" (short).

### Performance
- All photos through `@sveltejs/enhanced-img` (AVIF/WebP at 480–1600px). Example: Fencing image 7.7 MB → 34 KB; `/services/` all-cards view ~18 MB → ~1.6 MB.
- Hero is now a prioritised responsive image instead of a CSS background.
- Fonts self-hosted (Cinzel, Reddit Sans); unused Tinos dropped; no Google Fonts requests.

### Images
- 10 services switched to the client's own photos: Tree Felling, Pollarding, Crown Lifting, Crown Thinning, Deadwood Removal, Hedge Trimming & Shaping, Shrub & Topiary Care (stand-in), Garden Clearance, Fencing, Site Clearance. All rotated upright, stripped of metadata (3 had GPS), resized to 2400px.
- Cards crop to 3:2 and service pages to 4:3, with a per-service `imageFocus` for portrait photos.
- Fencing house number blurred; full-resolution privacy check of all new photos (no other plates, numbers, signage or people).
- Home page featured cards: Tree Surveys swapped for Crown Thinning (all 4 now client photos).
- Replaced stock images kept in `images/services/replaced/`; alt text rewritten for every new photo.

### Clean-up
- Removed unused images (5 + Svelte-logo `favicon.svg`), empty `Header.svelte`, the commented-out contact form (client decision: no form), and unused packages (`@neoconfetti/svelte`, `@fontsource/fira-mono`, `@contentsquare/tag-sdk`).

### Decisions made
- Contact: phone/email only, no form.
- Privacy policy: Jake Williams, sole trader, as data controller; **no postal address** (digital-only contact via Gmail); not ICO registered.
- Keep Contentsquare (useful for development insight), behind consent.
- Reviews: curated file rather than the Google Places API (API returns max 5 reviews and its terms forbid storing them).
- Bottom-bar cookie banner style.
