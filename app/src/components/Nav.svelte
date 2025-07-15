<script>
	import '../styles/app.css';
	import { onMount } from 'svelte';
    import logo from '$lib/images/branding/logo_sml.webp';
	let menuOpen = false;
	let currentPath = '/';

	// Optional: Use SvelteKit's $page.url.pathname if available
	onMount(() => {
		currentPath = window.location.pathname;
	});

	const links = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Services', href: '/services' },
		{ name: 'Contact', href: '/contact' }
	];

	function toggleMenu() {
		menuOpen = !menuOpen;
	}
</script>

<nav class="navbar">
	<div class="navbarContainer bodyContainer">
		<div class="navbar__logo"><img src="{logo}" alt="Treemenders logo"></div>
		<div class="navbar__links {menuOpen ? 'active' : ''}">
			{#each links as link}
				<a
					class="navbar__link {currentPath === link.href ? 'active' : ''}"
					href={link.href}
					on:click={() => {
						menuOpen = false;
						currentPath = link.href;
					}}
				>
					{link.name}
				</a>
			{/each}
		</div>
		<div
			class="hamburger"
			on:click={toggleMenu}
			on:keydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					toggleMenu();
				}
			}}
			aria-label="Toggle navigation"
			tabindex="0"
			role="button"
		>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
</nav>

<style>
	.navbar {
		padding: 1rem 0;
		background-color: var(--colour-white);
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		width: 100vw;
		position: relative;
		z-index: 10;
	}

	.navbarContainer {
		display: flex;
		margin: auto;
		justify-content: space-between;
		align-items: center;
	}

	.navbar__logo {
		font-size: 1.5rem;
		font-weight: bold;
		color: var(--colour-primary);
	}

	.navbar__links {
		display: flex;
		gap: 1.5rem;
	}

	.navbar__link {
		text-decoration: none;
		color: var(--colour-black);
		position: relative;
		padding: 0.25rem 0;
		transition: color 0.2s;
	}

	.navbar__link.active::after {
		content: '';
		display: block;
		width: 100%;
		height: 3px;
		background-color: var(--colour-secondary);
		position: absolute;
		bottom: -5px;
		left: 0;
	}

	.hamburger {
		display: none;
		flex-direction: column;
		cursor: pointer;
		margin-left: 1rem;
	}

	.hamburger div {
		width: 25px;
		height: 3px;
		background-color: var(--colour-black);
		margin: 4px 0;
		border-radius: 2px;
	}

	@media (max-width: 768px) {
		.navbar__links {
			display: none;
		}

		.hamburger {
			display: flex;
		}

		.navbar__links.active {
			display: flex;
			flex-direction: column;
			position: absolute;
			top: 110px;
			left: 0;
			background-color: var(--colour-white);
			box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
			width: 100vw;
			padding: 1rem 0;
			z-index: 9;
		}

		.navbar__link {
			padding: 1rem;
		}
	}
</style>
