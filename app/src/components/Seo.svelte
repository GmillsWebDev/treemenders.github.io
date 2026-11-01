<script>
    import { page } from '$app/stores';
    import { business, absoluteUrl } from '$lib/site.js';
    import defaultShareImg from '$lib/images/images/banner_1.webp?w=1200&h=630&fit=cover&format=jpg';

    export let title;
    export let description;
    /** Image URL or path for social sharing previews */
    export let image = defaultShareImg;
    export let imageAlt = 'Treemenders Arboriculture – tree surgery in Chichester & West Sussex';
    export let type = 'website';
    export let noindex = false;
    /** @type {object[]} Extra JSON-LD objects for this page (the business itself is added in +layout.svelte) */
    export let jsonLd = [];

    $: url = absoluteUrl($page.url.pathname);

    // Escape "<" so content can't close the script tag early
    const ldScript = (/** @type {object} */ data) =>
        `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</` + 'script>';
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description}>
    {#if noindex}
        <meta name="robots" content="noindex">
    {:else}
        <link rel="canonical" href={url}>
    {/if}

    <meta property="og:type" content={type}>
    <meta property="og:site_name" content={business.legalName}>
    <meta property="og:locale" content="en_GB">
    <meta property="og:title" content={title}>
    <meta property="og:description" content={description}>
    <meta property="og:url" content={url}>
    <meta property="og:image" content={absoluteUrl(image)}>
    <meta property="og:image:alt" content={imageAlt}>

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content={title}>
    <meta name="twitter:description" content={description}>
    <meta name="twitter:image" content={absoluteUrl(image)}>

    {#each jsonLd as data}
        {@html ldScript(data)}
    {/each}
</svelte:head>
