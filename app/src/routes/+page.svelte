<script>
    import Hero from "../components/Hero.svelte";
    import bannerImg from "$lib/images/images/banner_1.webp";
    import Button from "../components/Button.svelte";
    import AboutIntro from "../components/AboutIntro.svelte";
    import Card from "../components/Card.svelte";
    import CtaBanner from "../components/CtaBanner.svelte";
</script>


<Hero 
    heading={`Professional tree care services`}
    content={`Always on hand to help with your tree care needs.`}
    bannerBg={bannerImg}
>
    <Button slot="button" variant="primary" content="Get In Touch" linkUrl="/about" />
</Hero>

<AboutIntro />

<div class="containerfull divider">
    <div class="threePanels">
        <div>
            <i class="fa-solid fa-user-shield"></i>
            <p class="lead">
                Fully Insured
            </p>
        </div>
        <div>
            <i class="fa-solid fa-coins"></i>
            <p class="lead">
                Free Estimates
            </p>
        </div>
        <div>
            <i class="fa-solid fa-thumbs-up"></i>
            <p class="lead">
                Satisfaction Guaranteed
            </p>
        </div>

    </div>
</div>

<div class="container-full">
    <div class="container">
        <h2>Services</h2>
    </div>

    <div class="service-cards">
        <Card
            title="Tree Surgery"
            description="Expert tree surgery services to maintain the health and appearance of your trees."
            imageSrc="/src/lib/images/images/service_tree_surgery.webp"
            linkUrl="/services/tree-surgery"
        />
        <Card
            title="Stump Grinding"
            description="Efficient stump grinding services to remove unsightly tree stumps from your property."
            imageSrc="/src/lib/images/images/service_stump_grinding.webp"
            linkUrl="/services/stump-grinding"
        />
        <Card
            title="Hedge Trimming"
            description="Professional hedge trimming services to keep your hedges neat and tidy."
            imageSrc="/src/lib/images/images/service_hedge_trimming.webp"
            linkUrl="/services/hedge-trimming"
        />
    </div>
</div>

<CtaBanner />
<style>

    .divider {
        background: var(--colour-accent);
        &:has(.threePanels) {
            background: #42356C;
background: linear-gradient(90deg,rgba(66, 53, 108, 1) 0%, rgba(66, 53, 108, 1) 45%, rgba(118, 104, 134, 1) 55%, rgba(118, 104, 134, 1) 100%);
@media screen and (max-width: 650px) {
            background: var(--colour-accent);
    
}
        }
        
    }

    .threePanels {
        display: flex;
        justify-content: space-between;
        max-width: 1600px;
	    width: calc(100% - 4rem);
	    margin: 4rem auto;
        &>div{
            padding: 4rem 2rem;
            display: flex;
            flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;

        i{
            display: block;
            font-size: 2.5rem;
        }
        p{
            text-align: center;
        }
        }

        div:nth-child(1) {
            background: var(--colour-primary);
            color: var(--colour-white);
        }
        div:nth-child(2) {
            background: var(--colour-light-grey);
        }
        div:nth-child(3) {
            background: var(--colour-secondary);
            color: var(--colour-white);
        }
    }   

    @media screen and (max-width: 650px) {
        .threePanels {
            flex-direction: column;
            width: 100%;
            margin: 0 auto;
            justify-content: center;
            div {
                width: 100%;
                padding: 2rem 0;
            }
        }
    }

</style>