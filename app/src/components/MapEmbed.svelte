<script>
    import { consent, allowMaps } from '$lib/consent.js';

    export let src;
    export let title = 'Map';
    /** Link to the same map on Google Maps, shown when the embed isn't loaded */
    export let viewUrl;
</script>

{#if $consent.maps}
    <iframe {title} {src} loading="lazy"></iframe>
{:else}
    <!-- Google Maps sets cookies, so the embed only loads once the visitor allows it -->
    <div class="placeholder">
        <i class="fa-solid fa-map-location-dot" aria-hidden="true"></i>
        <p>Our coverage map is provided by Google Maps, which sets its own cookies.</p>
        <button type="button" on:click={allowMaps}>Load the map</button>
        <a href={viewUrl} target="_blank" rel="noopener">Or view it on Google Maps</a>
    </div>
{/if}

<style>
    iframe,
    .placeholder {
        width: 100%;
        height: 400px;
        border: none;
        border-radius: 8px;
    }

    .placeholder {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        padding: 2rem;
        text-align: center;
        background: var(--colour-accent);
        color: var(--colour-black);

        i {
            font-size: 2.5rem;
            color: var(--colour-primary);
        }

        p {
            margin: 0;
            max-width: 26rem;
        }

        button {
            font: inherit;
            padding: 0.5rem 1.5rem;
            border-radius: 4px;
            border: 1px solid var(--colour-primary);
            background: var(--colour-primary);
            color: var(--colour-white);
            cursor: pointer;
            transition: background-color 0.3s ease;
            &:hover {
                background: var(--colour-secondary);
                border-color: var(--colour-secondary);
            }
        }

        a {
            color: var(--colour-primary);
        }
    }
</style>
