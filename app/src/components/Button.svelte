<script>
    export let content;
    export let linkUrl;
    export let variant = 'primary'; // Default variant can be 'primary', 'secondary', etc.
    /** Extra link text for screen readers & search engines only, e.g. ' about Fencing' after 'Learn More' */
    export let hiddenText = '';
</script>

<a href="{linkUrl}" class="btn {variant}">{content}{#if hiddenText}<span class="visuallyHidden">{hiddenText}</span>{/if}</a>

<style>
    /* Hidden visually but still read by screen readers and search engines */
    .visuallyHidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    .btn {
        display: inline-block;
        padding: 0.5rem 1.5rem;
        border-radius: 4px;
        text-decoration: none;
        color: white;
        transition: background-color 0.3s ease, color 0.3s ease;
        width: fit-content;
    }

    .btn.primary {
        background-color: var(--colour-primary);
        border: 1px solid var(--colour-primary);
        color: var(--colour-white);
    }

    .btn.primary:hover {
        background-color: var(--colour-secondary);
        color: var(--colour-black);
    }

    .btn.secondary {
        background-color: var(--colour-accent);
        color: var(--colour-black);
        border: 1px solid var(--colour-accent);
    }

    .btn.secondary:hover {
        background-color: var(--colour-secondary);
        color: var(--colour-black);
        border: 1px solid var(--colour-secondary);
    }

    @media screen and (max-width: 450px) {
        .btn {
            width: 100%;
            text-align: center;
            padding: 1rem 0;
        }
    }
</style>