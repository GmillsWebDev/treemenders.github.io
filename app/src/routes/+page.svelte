<script>
    import Hero from "../components/Hero.svelte";
    import bannerImg from "$lib/images/images/banner_1.webp";
    import Button from "../components/Button.svelte";
    import AboutIntro from "../components/AboutIntro.svelte";
</script>


<Hero 
    heading={`Professional tree care services`}
    content={`Always on hand to help with your tree care needs.`}
    bannerBg={bannerImg}
>
    <Button slot="button" variant="primary" content="Get In Touch" linkUrl="/about" />
</Hero>

<AboutIntro />

<style>

</style>