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
            <enhanced:img src={service.image} alt={service.alt} />
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
                {#each service.pageContent.why as item}
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
        .image{
            justify-content: top;
        }
        .content{
            justify-content: center;
            display: flex;
            flex-direction: column;
        }
    }

    .whatWhy {
        display: flex;
        justify-content: space-around;
        margin-top: 2rem;
        &>div{
            flex: 1;
            margin: 0 1rem;
            padding: 1rem 2rem;
        }

        .what{
            background: var(--colour-light-grey);
        }
        .why{
            border: 1px solid var(--colour-primary);
        }
    }

    @media screen and (max-width: 768px) {
        .introContainer {
            grid-template-columns: 1fr;
            .image{
                order: 1;
            }
            .content{
                order: 0;
            }
        }
        .whatWhy {
            flex-direction: column;
            &>div {
                margin: 1rem 0;
            }
        }
    }

    @media screen and (max-width: 450px) {
        .whatWhy {
            &>div {
                padding: 1rem;
            }
        }
    }
</style>
