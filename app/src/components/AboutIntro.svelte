<script>
    import '../styles/app.css'
    import introImg from '$lib/images/images/chainsaw2.webp';
</script>

<div class="container">
    <div class="img">
        <img src={introImg} alt="Chainsaw cutting a tree" />
    </div>
    <div class="content">
        <h2>About</h2>
        <p>Welcome to Treemenders, your trusted experts in tree surgery and arboricultural services across Chichester, East Sussex, West Sussex, and Hampshire. We provide professional tree care solutions for both residential and commercial clients, combining technical expertise with a customer-first approach
</p>
<p>Whether you're a homeowner seeking to enhance your garden or a business in need of reliable grounds maintenance, our team is equipped to handle every aspect of tree and landscape care. From tree felling, pollarding, and hedge trimming to stump grinding, site clearance, and emergency works, we offer a comprehensive range of services tailored to both residential and commercial clients.
</p>
<p>Though we're a young company, our modern approach and commitment to excellence have quickly earned us a reputation for reliability and professionalism. At Treemenders, we don’t just maintain landscapes—we help them thrive.</p>
    </div>
</div>



<style>
    .container {
        width: 75rem;
        height: 100%;
        margin: auto;
        margin-bottom: 6rem;
        display: flex;
        align-items: start;
        padding: 2rem;
        position: relative;
    }

    .img{
        display: flex;
        justify-content: flex-start;
        position: relative;
        width: 60%;
        top: 0;
        left: 2rem;
    }
    .img img {
        width: 100%;
        height: auto;
        border-radius: 4px;
    }

    .content {
        position: relative;
        top: 6rem;
        right: 4rem;
        flex: 1;
        padding: 1rem;
        padding: 1.5rem;
        background: var(--colour-primary);
        color: var(--colour-white);
        border-radius: 4px;
    }

    @media screen and (max-width: 1280px){
        .container{
            width: calc(100% - 2rem);
        }
        .content {
            width: 100%;
        }

    }

    @media screen and (max-width: 1028px){
        .container{
            width: calc(100% - 2rem);
        }
        .img{
            width: 60%;
        }
        .content {
            right: 2rem;
        }

    }
    /* 
     @media screen and (max-width: 768px){
        .content p{
            color: green;
        }

    } */
</style>