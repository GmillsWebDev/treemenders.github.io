<script>
    import "../styles/app.css";

    export let heading;
    export let bannerImg = "$lib/images/images/banner_1.webp";

    // $: bgimg = `background-image: url("${bannerImg}");`;
</script>

<div class="heroBanner" style="background-image: url('{bannerImg}');">
    <div class="heroContent">
        <h1>{heading}</h1>
    </div>
</div>

<style>
    .heroBanner {
        background-size: cover;
        background-position: center;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .heroContent {
        text-align: center;
        color: white;
    }
</style>

