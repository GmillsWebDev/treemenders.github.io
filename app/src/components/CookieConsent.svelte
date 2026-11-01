<script>
    import { onMount } from 'svelte';
    import {
        consent,
        bannerOpen,
        initConsent,
        saveConsent,
        acceptAll,
        rejectAll
    } from '$lib/consent.js';

    // Local copy for the checkboxes, refreshed from the saved choice each time the banner opens
    let choices = { ...$consent };
    $: if ($bannerOpen) choices = { ...$consent };

    onMount(initConsent);
</script>

{#if $bannerOpen}
    <!-- Non-blocking banner (not a modal): a labelled <section> is a region landmark, not a dialog -->
    <section class="cookieBanner" aria-label="Cookie preferences">
        <div class="inner">
            <p class="intro">
                We'd like to use optional cookies to understand how people use this site and to show
                our coverage map. Nothing optional is set unless you allow it. You can change your mind
                at any time using <strong>Cookie settings</strong> in the footer.
                See our <a href="/cookie-policy/">cookie policy</a> and <a href="/privacy-policy/">privacy policy</a>.
            </p>

            <fieldset class="options">
                <legend class="visuallyHidden">Optional cookies</legend>
                <label>
                    <input type="checkbox" bind:checked={choices.analytics} />
                    <span><strong>Analytics</strong>: Google Analytics visit statistics</span>
                </label>
                <label>
                    <input type="checkbox" bind:checked={choices.recording} />
                    <span><strong>Site improvement</strong>: Contentsquare session insights</span>
                </label>
                <label>
                    <input type="checkbox" bind:checked={choices.maps} />
                    <span><strong>Maps</strong>: embedded Google Map on the contact page</span>
                </label>
            </fieldset>

            <!-- Accept and Reject are deliberately styled the same (ICO guidance) -->
            <div class="actions">
                <button type="button" class="btn primary" on:click={acceptAll}>Accept all</button>
                <button type="button" class="btn primary" on:click={rejectAll}>Reject all</button>
                <button type="button" class="btn secondary" on:click={() => saveConsent(choices)}>Save my choices</button>
            </div>
        </div>
    </section>
{/if}

<style>
    .cookieBanner {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        background: var(--colour-white);
        color: var(--colour-black);
        border-top: 4px solid var(--colour-primary);
        box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.15);
        max-height: 85vh;
        overflow-y: auto;
    }

    .inner {
        max-width: 1100px;
        margin: 0 auto;
        padding: 1.25rem 2rem;
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 0.75rem 2rem;
        align-items: center;
    }

    .intro {
        margin: 0;
        line-height: 1.5;
        a {
            color: var(--colour-primary);
        }
    }

    .options {
        grid-column: 1;
        border: 0;
        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem 1.5rem;
        label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            font-size: 0.95rem;
        }
        input {
            width: 1.1rem;
            height: 1.1rem;
            accent-color: var(--colour-primary);
        }
    }

    .actions {
        grid-column: 2;
        grid-row: 1 / span 2;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .btn {
        font: inherit;
        padding: 0.6rem 1.5rem;
        border-radius: 4px;
        cursor: pointer;
        white-space: nowrap;
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    .btn.primary {
        background: var(--colour-primary);
        border: 1px solid var(--colour-primary);
        color: var(--colour-white);
        &:hover {
            background: var(--colour-secondary);
            border-color: var(--colour-secondary);
        }
    }

    .btn.secondary {
        background: var(--colour-white);
        border: 1px solid var(--colour-primary);
        color: var(--colour-primary);
        &:hover {
            background: var(--colour-accent);
        }
    }

    .btn:focus-visible,
    input:focus-visible {
        outline: 3px solid var(--colour-secondary);
        outline-offset: 2px;
    }

    .visuallyHidden {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
    }

    @media screen and (max-width: 768px) {
        .inner {
            grid-template-columns: 1fr;
            padding: 1rem;
        }
        .options,
        .actions {
            grid-column: 1;
            grid-row: auto;
        }
        .options {
            flex-direction: column;
        }
        .actions {
            flex-direction: row;
            flex-wrap: wrap;
            .btn {
                flex: 1 1 auto;
            }
        }
    }
</style>
