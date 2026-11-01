<script>
    import '@fontsource-variable/cinzel';
    import '@fontsource-variable/reddit-sans';
    import '../styles/app.css';
    import Nav from "../components/Nav.svelte";
    import Footer from "../components/Footer.svelte";
    import CookieConsent from "../components/CookieConsent.svelte";
    import { SITE_URL, business, absoluteUrl } from '$lib/site.js';
    import logo from '$lib/images/branding/logo_med.webp';
    import shareImg from '$lib/images/images/banner_1.webp?w=1200&h=630&fit=cover&format=jpg';

    // Business details for search engines & AI assistants. Pages reference this via its @id.
    const localBusiness = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#business`,
        name: business.legalName,
        alternateName: business.name,
        description: business.description,
        url: `${SITE_URL}/`,
        telephone: business.telephone,
        email: business.email,
        logo: absoluteUrl(logo),
        image: absoluteUrl(shareImg),
        address: {
            '@type': 'PostalAddress',
            addressLocality: business.locality,
            addressRegion: business.region,
            addressCountry: business.country
        },
        areaServed: business.areaServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
        sameAs: business.sameAs
    };

    const ldScript = `<script type="application/ld+json">${JSON.stringify(localBusiness).replace(/</g, '\\u003c')}</` + 'script>';
</script>

<svelte:head>
    {@html ldScript}
</svelte:head>

<!-- Nav -->
<Nav />

<!-- Body -->
 <main>
    <slot/>
 </main>

<!-- footer -->
 <Footer />

<CookieConsent />