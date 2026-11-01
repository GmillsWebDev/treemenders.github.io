<script>
	import defaultBanner from '$lib/images/images/banner_1.webp?enhanced&w=2560;1920;1280;800&withoutEnlargement';

	export let heading;
	/** enhanced-img Picture object; defaults to the site-wide banner */
	export let bannerBg = defaultBanner;
    export let content;
</script>

<div class="heroBanner">
	<!-- Decorative background, but a real <img> so it can be responsive and prioritised (LCP) -->
	<enhanced:img class="heroImg" src={bannerBg} alt="" sizes="100vw" fetchpriority="high" />
	<div class="heroContent">
		<h1>{heading}</h1>
        <p>{content}</p>
		<slot name="button"></slot>
	</div>
</div>

<style>
	.heroBanner {
		min-height: 400px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
		padding: 1rem;
		margin-bottom: 4rem;
	}

	.heroImg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.heroBanner::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
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
		z-index: 2;
		background: rgba(255, 255, 255, 0.23);
		border-radius: 16px;
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(2.3px);
		-webkit-backdrop-filter: blur(2.3px);
		border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 1rem 2rem;
		max-width: 37rem;
	}

    .heroContent p{
        font-size: 1.8rem;
		font-family: var(--font-heading);
		font-weight: 500;
    }
</style>
