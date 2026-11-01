<script>
    import Hero from "../../components/Hero.svelte";
    import Card from "../../components/Card.svelte";
    import Button from "../../components/Button.svelte";
    import CtaBanner from "../../components/CtaBanner.svelte";
    import Seo from "../../components/Seo.svelte";
    import { categories } from "$lib/scripts/services.js";

    let selection = 'trees';

    const tabs = [
        ...categories,
        { key: 'all', icon: 'fa-solid fa-layer-group', label: 'All' }
    ];
</script>

<Seo
    title="Our Services | Tree Care, Garden Maintenance & Fencing in West Sussex"
    description="Explore Treemenders’ full range of services—from expert tree surgery to garden care and fencing. Serving Chichester and the wider West Sussex area."
/>

<Hero
    heading={`Tree Surgery & Garden Services in West Sussex`}
    content={`Explore our full range of tree and garden services`}
/>

<div class="container">
    <div class="tabsRow">
        {#each tabs as tab}
            <button
                class:selected={selection === tab.key}
                aria-pressed={selection === tab.key}
                type="button"
                on:click={() => {
                selection = tab.key;
                if (window.innerWidth <= 768) {
                    // Wait for DOM update, then scroll to first visible category
                    setTimeout(() => {
                    const firstCategory = document.querySelector('.category:not(.hidden)');
                    if (firstCategory) {
                        firstCategory.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    }, 0);
                }
                }}
            >
                <p><i class={tab.icon}></i> {tab.label}</p>
            </button>
        {/each}
    </div>
    <!-- Every category is always in the HTML (so search engines see all service links); tabs just hide/show them -->
    {#each categories as category}
        <section class="category" class:hidden={selection !== 'all' && selection !== category.key}>
            <h2>{category.label}</h2>
            <div class="serviceContainer">
            {#each category.services as service}
            <Card
                cardImg={service.image}
                cardAlt={service.alt}
                cardFocus={service.imageFocus}
                cardHeading={service.title}
                cardDescription={service.description}
            >
                <Button slot="button"
                content="Learn More"
                variant="secondary"
                linkUrl={`/services/${service.slug}/`}
                />
            </Card>
            {/each}
            </div>
        </section>
    {/each}
</div>
<CtaBanner />

<style>
    .category {
        margin-bottom: 3rem;
        h2 {
            color: var(--colour-primary);
        }
        &.hidden {
            display: none;
        }
    }

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
                background-color: var(--colour-secondary);
                color: var(--colour-black);
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