<script>
	import '../styles/app.css';

	export let heading;
	export let bannerBg;
    export let content;
</script>

<div class="heroBanner" style="background-image: url('{bannerBg}');">
	<div class="heroContent">
		<h1>{heading}</h1>
        <p>{content}</p>
		<slot name="button"></slot>
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
		position: relative;
		padding: 1rem;
	}

	.heroBanner::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000000;
		background: linear-gradient(
			90deg,
			rgba(0, 0, 0, 0) 0%,
			rgba(255, 252, 252, 0.32) 40%,
			rgba(255, 255, 255, 0.32) 50%,
			rgba(0, 0, 0, 0) 80%
		);
	}

	.heroContent {
		text-align: center;
		color: var(--colour-black);
		position: relative;
		background: rgba(255, 255, 255, 0.23);
		border-radius: 16px;
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(2.3px);
		-webkit-backdrop-filter: blur(2.3px);
		border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 1rem 2rem;
	}

    .heroContent p{
        font-size: 1.8rem;
    }
</style>
