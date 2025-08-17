<script>
    import Hero from "../../components/Hero.svelte";
    import bannerImg from "$lib/images/images/banner_1.webp";
    import Card from "../../components/Card.svelte";
    import Button from "../../components/Button.svelte";
    import CtaBanner from "../../components/CtaBanner.svelte";
    import { trees, gardens, specialist } from "$lib/scripts/services.js";

    let selection = 'trees';

    // Combine all services for "All" tab
    const allServices = [...trees, ...gardens, ...specialist];
</script>

<svelte:head>
    <title>Our Services | Tree Care, Garden Maintenance & Fencing in West Sussex</title>
    <meta name="description" content="Explore Treemenders’ full range of services—from expert tree surgery to garden care and fencing. Serving Chichester and the wider West Sussex area.">
    <meta name="keywords" content="tree surgery, garden maintenance, fencing services, hedge trimming, stump grinding, Chichester, West Sussex, arborist services">
    <meta name="author" content="Treemenders">
    <meta name="robots" content="index, follow">

</svelte:head>

<Hero 
    heading={`Services`}
    content={`Explore our full range of tree and garden services`}
    bannerBg={bannerImg}
/>

<div class="container">
    <div class="tabsRow">
        {#each [
            { key: 'trees', icon: 'fa-solid fa-tree', label: 'Tree Care' },
            { key: 'gardens', icon: 'fa-brands fa-pagelines', label: 'Garden Care' },
            { key: 'specialist', icon: 'fa-solid fa-star', label: 'Specialist Services' },
            { key: 'all', icon: 'fa-solid fa-layer-group', label: 'All' }
            ] as tab}
            <button
                class:selected={selection === tab.key}
                type="button"
                on:click={() => {
                selection = tab.key;
                if (window.innerWidth <= 768) {
                    // Wait for DOM update, then scroll to first card
                    setTimeout(() => {
                    const firstCard = document.querySelector('.serviceContainer > *');
                    if (firstCard) {
                        firstCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    }, 0);
                }
                }}
            >
                <p><i class={tab.icon}></i> {tab.label}</p>
            </button>
        {/each}
    </div>
    <div>
        <div class="serviceContainer">
        {#each selection === 'all'
            ? allServices
            : selection === 'trees'
                ? trees
                : selection === 'gardens'
                    ? gardens
                    : specialist as service}
        <Card
            cardImg={service.image}
            cardAlt={service.alt}
            cardHeading={service.title}
            cardDescription={service.description}
        >
            <Button slot="button"
            content="Learn More"
            variant="secondary"
            linkUrl={`/services/${service.slug.toLowerCase().replace(/\s+/g, '-')}`}
            />
        </Card>
    {/each}
    </div>
    </div>
</div>
<CtaBanner />

<style>
    .serviceContainer{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
    }


    .tabsRow {
        display: flex;
        justify-content: center;
        margin-bottom: 2rem;

        button {
            padding: 1rem 1.5rem;
            border: 1px solid var(--colour-light-grey);
            border-radius: 4px;
            background-color: var(--colour-primary);
            color: var(--colour-off-white);
            cursor: pointer;
            transform: skew(-20deg);
            font-size: 1.5rem;

            &:hover {
                background-color: darken(var(--colour-primary), 10%);
                color: var(--colour-primary);
            }

            &.selected {
                background-color: var(--colour-off-white);
                color: var(--colour-primary);
                border-color: var(--colour-primary);
            }

            p{
                transform: skew(20deg);
                margin: 0;
            }
        }
    }

    @media screen and (max-width: 768px) {
        .tabsRow {
            flex-direction: column;
            button {
                width: 100%;
                margin-bottom: 0.2rem;
                transform: skew(0);
                p{
                    transform: skew(0);
                    font-size: 1.5rem;
                }
            }
        }
    }
</style>