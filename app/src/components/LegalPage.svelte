<script>
    import Hero from './Hero.svelte';
    import Seo from './Seo.svelte';

    export let title;
    export let description;
    export let heroText;
    /** e.g. '1 November 2026' */
    export let updated;
</script>

<Seo title="{title} | Treemenders" {description} />

<Hero heading={title} content={heroText} />

<article class="container legal">
    <p class="updated">Last updated: {updated}</p>
    <slot />
</article>

<style>
    .legal {
        max-width: 50rem;
        line-height: 1.6;

        /* Content comes from the page's slot, so these need :global */
        :global(h2) {
            color: var(--colour-primary);
            font-size: 1.5rem;
            margin-top: 2.5rem;
        }
        :global(h3) {
            font-size: 1.2rem;
            margin-top: 1.5rem;
        }
        :global(a) {
            color: var(--colour-primary);
        }
        :global(table) {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
            font-size: 0.95rem;
        }
        :global(th),
        :global(td) {
            text-align: left;
            vertical-align: top;
            padding: 0.6rem 0.75rem;
            border: 1px solid var(--colour-light-grey);
        }
        :global(th) {
            background: var(--colour-accent);
        }
        :global(code) {
            font-size: 0.9em;
            word-break: break-all;
        }
    }

    .updated {
        color: var(--colour-brand-grey);
        font-size: 0.9rem;
    }

    /* Tables stack into labelled rows on small screens rather than scrolling sideways */
    @media screen and (max-width: 650px) {
        .legal :global(table),
        .legal :global(tbody),
        .legal :global(tr),
        .legal :global(td) {
            display: block;
        }
        .legal :global(thead) {
            display: none;
        }
        .legal :global(tr) {
            border: 1px solid var(--colour-light-grey);
            margin-bottom: 1rem;
        }
        .legal :global(td) {
            border: 0;
            border-bottom: 1px solid var(--colour-light-grey);
        }
        .legal :global(td[data-label])::before {
            content: attr(data-label);
            display: block;
            font-weight: 700;
            font-size: 0.85rem;
            color: var(--colour-brand-grey);
        }
    }
</style>
