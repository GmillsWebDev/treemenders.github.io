<script>
    export let data;
    const { service } = data;

    import Hero from '../../../components/Hero.svelte';
    import Button from '../../../components/Button.svelte';
    import CtaBanner from '../../../components/CtaBanner.svelte';
    import bannerImg from '$lib/images/images/banner_1.webp';
</script>



{#if service}
<Hero 
    heading={service.title}
    content={service.pageContent.bannerTag}
    bannerBg={bannerImg}
    />
    <div class="container">
    <div class="introContainer">
        <div class="image">
            <img src={service.image} alt={service.alt} />
        </div>
        <div class="content">
            {@html service.pageContent.longDesc}
            <Button 
                variant="primary" 
                content="Get In Touch" 
                linkUrl="/contact"/>
        </div>
    </div>
    </div>
    <div class="container">
    <div class="whatWhy">
        <div class="what">
            <h3>What We Do</h3>
            <ul>
                {#each service.pageContent.what as item}
                    <li>{@html item.content}</li>
                {/each}
            </ul>
        </div>
        <div class="why">
            <h3>Why We Do It</h3>
            <ul>
                {#each service.why as item}
                    <li>{@html item.content}</li>
                {/each}
            </ul>
        </div>
    </div>
    </div>
    <CtaBanner />
{:else}
    <p>Service not found.</p>
{/if}


<style>
    .introContainer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        align-items: center;
    }

    .whatWhy {
        display: flex;
        justify-content: space-around;
        margin-top: 2rem;

        .what{
            padding: 1rem;
            background: var(--colour-light-grey);
        }
        .why{
            padding: 1rem;
            border: 1px solid var(--colour-primary);
        }
    }
</style>
