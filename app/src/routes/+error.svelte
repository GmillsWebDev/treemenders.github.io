<script>
    import { page } from '$app/stores';
    import Button from '../components/Button.svelte';

    $: notFound = $page.status === 404;
</script>

<svelte:head>
    <title>{notFound ? 'Page not found' : 'Something went wrong'} | Treemenders</title>
    <meta name="robots" content="noindex">
</svelte:head>

<section class="container errorPage">
    <div class="sapling" aria-hidden="true">
        <span class="code">{$page.status}</span>
        <div class="icon"><i class="fa-solid fa-seedling"></i></div>
    </div>

    {#if notFound}
        <h1>Looks like this hasn't been planted yet</h1>
        <p class="lead">The page you're after doesn't exist. It may have moved, or perhaps it never took root.</p>
    {:else}
        <h1>Something's snapped</h1>
        <p class="lead">Something went wrong on our end. Please try again in a moment.</p>
    {/if}

    <div class="actions">
        <Button variant="primary" content="Back to home" linkUrl="/" />
        <Button variant="secondary" content="Our services" linkUrl="/services/" />
    </div>

    <p class="help">
        Rather speak to someone? Call us on <a href="tel:+447496340967">+44 7496 340967</a>
    </p>
</section>

<style>
    .errorPage {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 2rem 0 4rem;
    }

    .sapling {
        position: relative;
        display: grid;
        place-items: center;
        margin-bottom: 1rem;

        .code {
            font-family: var(--font-heading);
            font-size: 10rem;
            font-weight: 700;
            line-height: 1;
            color: var(--colour-accent);
            user-select: none;
        }

        .icon {
            position: absolute;
            display: grid;
            place-items: center;
            width: 7rem;
            height: 7rem;
            border-radius: 50%;
            background: var(--colour-primary);
            color: var(--colour-white);
            font-size: 3rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
    }

    h1 {
        color: var(--colour-primary);
        max-width: 40rem;
    }

    .lead {
        max-width: 34rem;
    }

    .actions {
        display: flex;
        gap: 1rem;
        margin: 1rem 0 2rem;
    }

    .help {
        color: var(--colour-brand-grey);
        a {
            color: var(--colour-primary);
        }
    }

    @media screen and (max-width: 450px) {
        .sapling .code {
            font-size: 7rem;
        }
        .sapling .icon {
            width: 5rem;
            height: 5rem;
            font-size: 2.2rem;
        }
        h1 {
            font-size: 1.8rem;
        }
        .actions {
            flex-direction: column;
            width: 100%;
        }
    }
</style>
