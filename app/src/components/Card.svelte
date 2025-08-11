<script>
    export let cardImg;
    export let cardAlt;
    export let cardHeading = "Heading";
    export let cardDescription = "Description";
</script>

<div class="cardContainer">
    <div class="image">
        <img src={cardImg} alt={cardAlt}>
        <h3>{cardHeading}</h3>
    </div>
    <div class="content">
        <p class="description">{cardDescription}</p>
        <slot name="button"></slot>
    </div>
    
</div>

<style>
    .cardContainer {
        border: 1px solid var(--colour-light-grey);
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
        position: relative;
        background: var(--colour-white);
        &:hover {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
    }
    
    .image{
        position: relative;
        overflow: hidden;
        h3{
        color: var(--colour-primary);
        position: absolute;
        bottom: 0;
        padding: 0.5rem;
        margin-bottom: 0;
        background: var(--colour-white);
        max-width: 75%;
        width: fit-content;
        border-top-right-radius: 1.2rem;
    }
    }
    .content{
        padding: 1rem;
    }
</style>