<script>
  /** enhanced-img Picture object (see servicesImages.js) */
  export let cardImg;
  export let cardAlt;
  export let cardHeading = 'Heading';
  export let cardDescription = 'Description';
</script>

<div class="cardContainer">
  <div class="image">
    <enhanced:img
      class="cardImg"
      src={cardImg}
      alt={cardAlt}
      loading="lazy"
      sizes="(max-width: 700px) calc(100vw - 4rem), (max-width: 1100px) 45vw, 400px"
    />
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
    
    /* Fixed 3:2 frame so every card lines up regardless of the source photo's proportions */
    .image{
        position: relative;
        overflow: hidden;
        aspect-ratio: 3 / 2;
    }

    .cardImg {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
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