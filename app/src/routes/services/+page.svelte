<script>
    import Hero from "../../components/Hero.svelte";
    import bannerImg from "$lib/images/images/banner_1.webp";
    import Card from "../../components/Card.svelte";
    import { trees, gardens, specialist } from "$lib/scripts/services.js";

    let selection = 'trees';
    
</script>


<Hero 
    heading={`Services`}
    content={`Explore our full range of tree and garden services`}
    bannerBg={bannerImg}
/>

<div class="container">
    <div class="tabsRow">
        <button on:click={() => selection = 'trees'}>Tree Care</button>
        <button on:click={() => selection = 'gardens'}>Garden Care</button>
        <button on:click={() => selection = 'specialist'}>Specialist Services</button>
    </div>
    <div>
        <div class="serviceContainer">
        {#each selection === 'trees' ? trees : selection === 'gardens' ? gardens : specialist as service}
        <Card
            cardImg={service.image}
            cardAlt={service.alt}
            cardHeading={service.title}
            cardDescription={service.description}
        />
    {/each}
    </div>
    </div>
</div>

<style>
    .serviceContainer{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
    }
</style>