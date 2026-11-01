<script>
    import Hero from "../../components/Hero.svelte";
    import Seo from "../../components/Seo.svelte";
    import MapEmbed from "../../components/MapEmbed.svelte";
</script>
<Seo
    title="Contact Treemenders | Get a Quote or Ask a Question"
    description="Reach out to Treemenders for expert advice, quotes, or service bookings. We’re here to help with tree care, garden services, and fencing across West Sussex."
/>
<Hero
    heading="Get a Free Tree Surgery Quote"
    content="We're here to help you with all your tree care needs."
/>
<div class="container contact">
    <div class="contact">
        <h2>Ways to reach us</h2>
        <p>If you have any questions or would like to schedule a service, please reach out to us.</p>
        <p>We cover all of West Sussex and most of East Sussex and Hampshire, however we are not limited to these locations so please get in touch and let us know how we can help.</p>

        <ul>
            <li><i class="fa-solid fa-mobile-screen-button"></i> <strong>Phone:</strong> <a href="tel:+447496340967">+44 7496 340967</a></li>
            <li><i class="fa-solid fa-envelope"></i> <strong>Email:</strong> <a href="mailto:Treemendersarb@gmail.com">Treemendersarb@gmail.com</a></li>
        </ul>
    </div>
    <div class="map">
        <MapEmbed
            title="Map of the areas Treemenders covers"
            src="https://www.google.com/maps/d/u/0/embed?mid=1USiN1sM5KvBTTz41xFlYNUCutiRk34A&ehbc=2E312F&noprof=1&z=9"
            viewUrl="https://www.google.com/maps/d/u/0/viewer?mid=1USiN1sM5KvBTTz41xFlYNUCutiRk34A"
        />
    </div>
</div>

<style>
    .container.contact{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
    }
    ul{
        list-style: none;
        padding: 0;
        li{
            color: var(--colour-primary);
            margin-bottom: 1rem;
            font-size: 1.2rem;
            a{
                color: var(--colour-primary);
                text-decoration: none;
                transition: color 0.3s ease;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }

    @media screen and (max-width: 768px) {
        .container.contact {
            grid-template-columns: 1fr;
        }
    }
</style>
