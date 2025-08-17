<script>
    export let reviewText;
    import image from "$lib/images/images/googleReview.jpg";
    import quotes from "$lib/images/icons/left-quote.png";
</script>

<div class="reviewWrapper">
    <div class="image">
        <a href="https://search.google.com/local/writereview?placeid=ChIJC8BiotBezQcR0PiSLj0K7b4" target="_blank">
            <img src={image} alt="Google Review" />
        </a>
    </div>
    <div class="content">
        <img src={quotes} alt="Quotes" />
        {@html reviewText}
    <img class="closing" src={quotes} alt="Quotes" /></div>
        
        
</div>

<style>
    .reviewWrapper {
        display: flex;
        flex-direction: row;
        gap:2rem;
        justify-content: space-between;
        align-items: center;
        .content{
            padding: 2rem;
            background-color: var(--colour-light-grey);
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            position: relative;

        img{
            width: 3rem;
        }

        .closing {
            transform: rotate(180deg);
            width: 3rem;
            position: relative;
            left: calc(100% - 4rem);
        }
    }
    .image{
        padding-right:2rem;
        
        img{
            width: 10rem;
        }
    }
}

@media screen and (max-width: 768px) {
    .reviewWrapper {
        flex-direction: column;
        align-items: center;
        text-align: center;
        .content {
            order:1;
            width: 100%;
            padding: 1rem;
            text-align: left;
        }
        .image {
            order: 2;
            padding-right: 0;
            img {
                width: 8rem;
            }
        }
    }
}
</style>