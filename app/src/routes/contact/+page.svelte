<script>
    import Hero from "../../components/Hero.svelte";
    import bannerImg from "$lib/images/images/banner_1.webp";
</script>
<svelte:head>
    <title>Contact Treemenders | Get a Quote or Ask a Question</title>
    <meta name="description" content="Reach out to Treemenders for expert advice, quotes, or service bookings. We’re here to help with tree care, garden services, and fencing across West Sussex.">
    <meta name="keywords" content="contact Treemenders, tree surgery quote, garden services enquiry, fencing quote, Chichester, West Sussex">
</svelte:head>
<Hero
    heading="Get in Touch"
    content="We're here to help you with all your tree care needs."
    bannerBg={bannerImg}
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
        <iframe title="Google Map" src="https://www.google.com/maps/d/u/0/embed?mid=1USiN1sM5KvBTTz41xFlYNUCutiRk34A&ehbc=2E312F&noprof=1&z=9"></iframe>
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

    iframe {
        width: 100%;
        height: 400px;
        border: none;
        border-radius: 8px;
    }

    @media screen and (max-width: 768px) {
        .container.contact {
            grid-template-columns: 1fr;
        }
    }
</style>
