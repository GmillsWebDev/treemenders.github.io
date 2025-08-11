<script>
    import Hero from "../../components/Hero.svelte";
    import bannerImg from "$lib/images/images/banner_1.webp";
    
    //Contact form requirements
    let name = '';
	let email = '';
	let message = '';
	let status = '';

	async function handleSubmit() {
		const res = await fetch('/api/contact', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, email, message })
		});

		const result = await res.json();
		status = result.success ? 'Message sent!' : 'Failed to send message.';
	}

</script>

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
        <p>Or, please use our contact form.</p>
        <form on:submit|preventDefault={handleSubmit}>
            <input type="text" bind:value={name} placeholder="Your Name" required />
            <input type="email" bind:value={email} placeholder="example@email.com" required />
            <textarea bind:value={message} placeholder="Your Message" required></textarea>
            <button type="submit">Send</button>
        </form>

        <p>{status}</p>

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

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 50%;
        button{
            display: inline-block;
            padding: 0.5rem 1.5rem;
            border-radius: 4px;
            text-decoration: none;
            color: white;
            transition: background-color 0.3s ease, color 0.3s ease;
            background-color: var(--colour-primary);
            border: 1px solid var(--colour-primary);
            color: var(--colour-white);
            width: fit-content;

            &:hover {
                background-color: darken(var(--colour-primary), 10%);
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
        form {
            width: 75%;
        }
    }

    @media screen and (max-width: 450px) {
        form {
            width: 100%;
        }
    }
</style>