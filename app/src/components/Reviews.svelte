<script>
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import { reviews, googleSummary } from '$lib/scripts/reviews.js';
    import googleImg from '$lib/images/images/googleReview.jpg';
    import quotes from '$lib/images/icons/left-quote.png';

    const INTERVAL_MS = 7000;

    let current = 0;
    let playing = true; // user's play/pause choice
    let hovered = false; // pointer over / focus inside the carousel
    let reducedMotion = false;
    /** @type {ReturnType<typeof setInterval> | undefined} */
    let timer;
    /** @type {number | null} */
    let touchStartX = null;

    $: autoplay = playing && !hovered && !reducedMotion && reviews.length > 1;
    $: {
        clearInterval(timer);
        if (browser && autoplay) timer = setInterval(next, INTERVAL_MS);
    }

    function next() {
        current = (current + 1) % reviews.length;
    }
    function prev() {
        current = (current - 1 + reviews.length) % reviews.length;
    }
    /** @param {number} i */
    function goTo(i) {
        current = i;
    }

    /** @param {TouchEvent} e */
    function onTouchStart(e) {
        touchStartX = e.touches[0].clientX;
    }
    /** @param {TouchEvent} e */
    function onTouchEnd(e) {
        if (touchStartX === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
        touchStartX = null;
    }

    /** @param {FocusEvent} e */
    function onFocusOut(e) {
        // Only resume when focus leaves the carousel entirely
        const el = /** @type {HTMLElement} */ (e.currentTarget);
        if (!el.contains(/** @type {Node | null} */ (e.relatedTarget))) hovered = false;
    }

    /** @param {string} yyyymm */
    const formatDate = (yyyymm) =>
        new Date(`${yyyymm}-01T12:00:00Z`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

    onMount(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        reducedMotion = query.matches;
        query.addEventListener('change', (e) => (reducedMotion = e.matches));
    });
    onDestroy(() => clearInterval(timer));
</script>

<div class="reviewWrapper">
    <div class="image">
        <a href={googleSummary.writeUrl} target="_blank" rel="noopener">
            <img src={googleImg} alt="Leave us a Google review" />
        </a>
    </div>

    <div class="reviewsPanel">
        <!-- Honest context for a selection of reviews: overall rating, count and a link to them all -->
        <p class="summary">
            <span class="stars" aria-hidden="true">★★★★★</span>
            <strong>{googleSummary.rating.toFixed(1)}</strong> from {googleSummary.count} Google reviews
            · <a href={googleSummary.readUrl} target="_blank" rel="noopener">Read all reviews</a>
        </p>

        <section
            class="carousel"
            aria-roledescription="carousel"
            aria-label="Customer reviews"
            on:mouseenter={() => (hovered = true)}
            on:mouseleave={() => (hovered = false)}
            on:focusin={() => (hovered = true)}
            on:focusout={onFocusOut}
            on:touchstart|passive={onTouchStart}
            on:touchend={onTouchEnd}
        >
            <!-- Announce changes only when not auto-rotating, so screen readers aren't interrupted -->
            <div class="slides" aria-live={autoplay ? 'off' : 'polite'}>
                {#each reviews as review, i (`${review.name}-${review.date}`)}
                    <figure
                        class="slide"
                        class:active={i === current}
                        role="group"
                        aria-roledescription="slide"
                        aria-label="{i + 1} of {reviews.length}"
                        aria-hidden={i !== current}
                    >
                        <img class="quote" src={quotes} alt="" />
                        <blockquote>
                            {#each review.text.split(/\n\s*\n/) as paragraph, p (p)}
                                <p>{@html paragraph}</p>
                            {/each}
                        </blockquote>
                        <figcaption>
                            <span class="stars" role="img" aria-label="{review.rating} out of 5 stars">
                                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                            </span>
                            <span class="name">{review.name}</span>
                            <span class="date">{formatDate(review.date)} · Google</span>
                        </figcaption>
                    </figure>
                {/each}
            </div>

            {#if reviews.length > 1}
                <div class="controls">
                    <button type="button" class="arrow" on:click={prev} aria-label="Previous review">
                        <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
                    </button>
                    <div class="dots">
                        {#each reviews as review, i (`${review.name}-${review.date}`)}
                            <button
                                type="button"
                                class="dot"
                                class:active={i === current}
                                aria-label="Show review {i + 1}"
                                aria-current={i === current}
                                on:click={() => goTo(i)}
                            ></button>
                        {/each}
                    </div>
                    <button type="button" class="arrow" on:click={next} aria-label="Next review">
                        <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
                    </button>
                    {#if !reducedMotion}
                        <button
                            type="button"
                            class="arrow"
                            on:click={() => (playing = !playing)}
                            aria-label={playing ? 'Pause automatic scrolling' : 'Play automatic scrolling'}
                        >
                            <i class="fa-solid {playing ? 'fa-pause' : 'fa-play'}" aria-hidden="true"></i>
                        </button>
                    {/if}
                </div>
            {/if}
        </section>
    </div>
</div>

<style>
    .reviewWrapper {
        display: flex;
        gap: 2rem;
        justify-content: space-between;
        align-items: center;
    }

    .image {
        padding-right: 2rem;
        img {
            width: 10rem;
        }
    }

    .reviewsPanel {
        flex: 1;
        min-width: 0;
    }

    .summary {
        margin: 0 0 1rem;
        a {
            color: var(--colour-primary);
        }
    }

    .stars {
        color: #f4b400; /* Google's review star yellow */
        letter-spacing: 0.1em;
    }

    .carousel {
        background-color: var(--colour-light-grey);
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 2rem;
    }

    /* All slides share one grid cell, so the card is always as tall as the longest review */
    .slides {
        display: grid;
    }

    .slide {
        grid-area: 1 / 1;
        margin: 0;
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.5s ease, visibility 0.5s;

        &.active {
            visibility: visible;
            opacity: 1;
        }
    }

    .quote {
        width: 3rem;
    }

    blockquote {
        margin: 0.5rem 0 1rem;
        p {
            margin: 0 0 0.75rem;
        }
    }

    figcaption {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: 0.25rem 1rem;
        .name {
            font-weight: 700;
            color: var(--colour-primary);
        }
        .date {
            color: var(--colour-brand-grey);
            font-size: 0.9rem;
        }
    }

    .controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        margin-top: 1.5rem;
    }

    .arrow {
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 50%;
        border: 1px solid var(--colour-primary);
        background: var(--colour-white);
        color: var(--colour-primary);
        cursor: pointer;
        transition: background-color 0.3s ease, color 0.3s ease;
        &:hover {
            background: var(--colour-primary);
            color: var(--colour-white);
        }
    }

    .dots {
        display: flex;
        gap: 0.5rem;
    }

    .dot {
        width: 0.75rem;
        height: 0.75rem;
        padding: 0;
        border-radius: 50%;
        border: 1px solid var(--colour-primary);
        background: transparent;
        cursor: pointer;
        &.active {
            background: var(--colour-primary);
        }
    }

    .arrow:focus-visible,
    .dot:focus-visible {
        outline: 3px solid var(--colour-secondary);
        outline-offset: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
        .slide {
            transition: none;
        }
    }

    @media screen and (max-width: 768px) {
        .reviewWrapper {
            flex-direction: column;
        }
        .reviewsPanel {
            width: 100%;
        }
        .carousel {
            padding: 1.25rem;
        }
        .image {
            order: 2;
            padding-right: 0;
            img {
                width: 8rem;
            }
        }
    }
</style>
