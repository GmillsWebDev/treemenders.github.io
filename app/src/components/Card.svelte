<script>
  export let cardImg;
  export let cardAlt;
  export let cardHeading = 'Heading';
  export let cardDescription = 'Description';
</script>

<div class="cardContainer">
  <div class="image">
    <img loading="lazy" src={cardImg} alt={cardAlt} />
  </div>
  <div class="content">
    <div class="heading">
        <h3>{cardHeading}</h3>
    </div>
<div class="description">
        <p>{cardDescription}</p>
        <slot name="button"></slot>
    </div>
        
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
        max-height: 13.5rem;
        
    }

    .content{
        padding: 1rem;
        display: flex;
        flex-direction: column;
        position: relative;
    }


    h3{
        color: var(--colour-primary);
        /* padding: 0.5rem 0.7rem; */
        margin: 0;
        background: var(--colour-white);
        max-width: 75%;
        width: fit-content;
        /* border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        border-bottom: 1px solid var(--colour-primary);
        border-right: 1px solid var(--colour-primary); */
    }
</style>