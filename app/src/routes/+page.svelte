<script>
    import Hero from "../components/Hero.svelte";
    import bannerImg from "$lib/images/images/banner_1.webp";
    import Button from "../components/Button.svelte";
    import AboutIntro from "../components/AboutIntro.svelte";
    import Card from "../components/Card.svelte";
    import Review from "../components/Review.svelte";
    import CtaBanner from "../components/CtaBanner.svelte";

    import {homeImages} from "$lib/scripts/servicesImages.js";

    import defaultImg from "$lib/images/images/chainsaw2.webp";
</script>


<Hero 
    heading={`Professional tree care services`}
    content={`Always on hand to help with your tree care needs.`}
    bannerBg={bannerImg}
>
    <Button slot="button" variant="primary" content="Get In Touch" linkUrl="/contact" />
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


    <div class="container services">
        <h2>Services</h2>
        <div class="service-cards">
        <Card
            cardImg={homeImages.treeFelling}
            cardAlt="Tree Felling"
            cardHeading="Tree Felling"
            cardDescription="Safe and efficient removal of trees, including those in confined spaces."
        >
            <Button slot="button" variant="primary" content="Learn More" linkUrl="/services/tree-felling" />
        </Card>
        <Card
            cardImg={homeImages.gardenWaste}
            cardAlt="Site Clearance"
            cardHeading="Site Clearance"
            cardDescription="Preparing land for construction or landscaping."
        >
            <Button slot="button" variant="primary" content="Learn More" linkUrl="/services/site-clearance" /></Card>
        <Card
            cardImg={homeImages.hedgeTrimming}
            cardAlt="Hedge Trimming"
            cardHeading="Hedge trimming and shaping"
            cardDescription="Regular maintenance and decorative shaping."
        ><Button slot="button" variant="primary" content="Learn More" linkUrl="/services/hedge-trimming-shaping" /></Card>
        <Card
            cardImg={homeImages.treeSurvey}
            cardAlt="Tree Surveys"
            cardHeading="Tree Surveys"
            cardDescription="Arboricultural assessments for planning applications or safety checks."
        >
            <Button slot="button" variant="primary" content="Learn More" linkUrl="/services/tree-surveys" /></Card>
    </div>


    <div class="btnContainer"><Button variant="primary" content="View all Services" linkUrl="/services" /></div>

    </div>
    


<div class="container-full">
    <div class="container">
        <h2>A service you can trust</h2>
        <Review
            reviewText={`<p>I had a large tree in my back garden that had started leaning a bit too close to the house, and I wasn’t sure what to do. I found Treemenders online and gave them a call—Jake came out to take a look and was really friendly and professional. He explained everything clearly and didn’t push me into anything, which I appreciated.
</p>
        <p>The team came a few days later and did a brilliant job removing the tree safely and tidying up afterwards. You wouldn’t even know they’d been, except the garden looks so much better now!
</p>`}
        />
    </div>
</div>
<CtaBanner />
<style>

    .btnContainer{
        font-size: 1.5rem;
    }

    h2{
        color: var(--colour-primary);
    }

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

    .services{
        margin-bottom: 4rem;
        display: flex;
        flex-direction: column;
        
        .service-cards {
            /* display:flex;
            justify-content: space-around; */
            display:grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            flex-direction: row;
            gap: 2rem;
            margin-bottom: 2rem;
    }  
        .btnContainer {
                display: flex;
                justify-content: center;
                margin-top: 2rem;
            }    
        
    }

    /* @media screen and (max-width:1200px){
        .services
    } */


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