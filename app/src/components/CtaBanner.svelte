<script>
    import Button from "./Button.svelte";
</script>

<section class="ctaBanner">
    <div class="container">
        <h2>Ready to transform your outdoor space?</h2>
        <Button variant="primary" content="Get Started" linkUrl="/contact" />
    </div>
</section>

<style>
    .ctaBanner {
        background: var(--colour-primary);
        color: var(--colour-white);
        padding: 2rem 0;
        text-align: center;
    }

    .container {
        margin: 0 auto;
    }
</style>
