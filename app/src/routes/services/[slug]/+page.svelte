<script>
    export let data;
    $: ({ service } = data);

    import Hero from '../../../components/Hero.svelte';
    import Button from '../../../components/Button.svelte';
    import Card from '../../../components/Card.svelte';
    import CtaBanner from '../../../components/CtaBanner.svelte';
    import Seo from '../../../components/Seo.svelte';
    import { getRelated } from '$lib/scripts/services.js';
    import { SITE_URL, business, absoluteUrl } from '$lib/site.js';

    $: related = getRelated(service.slug);
    $: url = absoluteUrl(`/services/${service.slug}/`);

    $: jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.title,
            serviceType: service.title,
            description: service.description,
            url,
            image: absoluteUrl(service.image.img.src),
            provider: { '@id': `${SITE_URL}/#business` },
            areaServed: business.areaServed.map((name) => ({ '@type': 'AdministrativeArea', name }))
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
                { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services/` },
                { '@type': 'ListItem', position: 3, name: service.title, item: url }
            ]
        }
    ];
</script>

<Seo
    title="{service.title} | Treemenders – Chichester & West Sussex"
    description="{service.description} Serving Chichester and West Sussex."
    image={service.image.img.src}
    imageAlt={service.alt}
    {jsonLd}
/>

<Hero
    heading={`${service.title} in Chichester & West Sussex`}
    content={service.pageContent.bannerTag}
    />
    <div class="container">
    <div class="introContainer">
        <div class="image">
            <enhanced:img
                class="serviceImg"
                style="object-position: {service.imageFocus ?? 'center'}"
                src={service.image}
                alt={service.alt}
                sizes="(max-width: 768px) 100vw, 50vw"
            />
        </div>
        <div class="content">
            {@html service.pageContent.longDesc}
            <Button
                variant="primary"
                content="Get In Touch"
                linkUrl="/contact/"/>
        </div>
    </div>
    </div>
    <div class="container">
    <div class="whatWhy">
        <div class="what">
            <h2>What We Do</h2>
            <ul>
                {#each service.pageContent.what as item}
                    <li>{@html item.content}</li>
                {/each}
            </ul>
        </div>
        <div class="why">
            <h2>Why We Do It</h2>
            <ul>
                {#each service.pageContent.why as item}
                    <li>{@html item.content}</li>
                {/each}
            </ul>
        </div>
    </div>
    </div>
    {#if related.length}
    <div class="container related">
        <h2>Related Services</h2>
        <div class="relatedCards">
            {#each related as item (item.slug)}
            <Card
                cardImg={item.image}
                cardAlt={item.alt}
                cardFocus={item.imageFocus}
                cardHeading={item.title}
                cardDescription={item.description}
            >
                <Button slot="button" variant="secondary" content="Learn More" hiddenText={` about ${item.title}`} linkUrl={`/services/${item.slug}/`} />
            </Card>
            {/each}
        </div>
        <div class="allServices">
            <Button variant="primary" content="View all Services" linkUrl="/services/" />
        </div>
    </div>
    {/if}
    <CtaBanner />


<style>
    .introContainer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        /* 4:3 frame so portrait and landscape photos sit consistently beside the text */
        .image{
            aspect-ratio: 4 / 3;
            overflow: hidden;
            border-radius: 4px;
        }
        .serviceImg{
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
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

        /* h2 for document structure, sized like the h3s these used to be */
        h2 {
            font-size: 1.5rem;
        }

        .what{
            background: var(--colour-light-grey);
        }
        .why{
            border: 1px solid var(--colour-primary);
        }
    }

    .related {
        h2 {
            color: var(--colour-primary);
        }
        .relatedCards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }
        .allServices {
            display: flex;
            justify-content: center;
            margin-top: 2rem;
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
