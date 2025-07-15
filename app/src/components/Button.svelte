<script>
    export let content;
    export let linkUrl;
    export let variant = 'primary'; // Default variant can be 'primary', 'secondary', etc.
</script>

<a href="{linkUrl}" class="btn {variant}">{content}</a>

<style>
    .btn {
        display: inline-block;
        padding: 0.5rem 1.5rem;
        border-radius: 4px;
        text-decoration: none;
        color: white;
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
</style>