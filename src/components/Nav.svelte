<script context="module">
	// export async function load({ page }) {
	// 	console.log(`🚀 ~ file: nav.svelte ~ line 3 ~ load ~ navigating`, navigating);
	// 	console.log(`🚀 ~ file: nav.svelte ~ line 3 ~ load ~ params`, params);
	// 	console.log(`🚀 ~ file: nav.svelte ~ line 3 ~ load ~ page`, page);
	// 	// const pageObj = await page;
	// 	console.log(`🚀 ~ file: nav.svelte ~ line 6 ~ load ~ pageObj`, pageObj);
	// 	const paramsObj = await params;
	// 	let path = await page.path
	//     console.log(`🚀 ~ file: nav.svelte ~ line 10 ~ load ~ path`, path)
	// 	// console.log(`🚀 ~ file: nav.svelte ~ line 8 ~ load ~ paramsObj`, paramsObj);
	// 	// return { props: { page, path } };
	// }
</script>

<script>
    import Hamburger from 'svelte-hamburgers';
	import HamburgerMenu from './HamburgerMenu.svelte'
	
    let open;
	import { page } from '$app/stores';
	$: path = $page.path;

	let links = [
		{ title: 'Home', url: '/' },
		{ title: 'About', url: '/about' },
		{ title: 'Blog', url: '/posts' },
		{ title: 'Posts endpoint', url: '/posts.json' },
		{ title: 'Todos', url: '/todos' },
		{ title: 'Quotes', url: '/quotes' },
		{ title: 'Creative', url: '/creative' },
		{ title: 'Mike', url: '/mikepeiman' },
	];

</script>


	<div class="md:hidden z-50 absolute top--0 left-0">
		<Hamburger bind:open --color="white" />
	</div>
	<!-- bg-gradient-to-r from-transparent via-cyan-700  -->
	<!--  bg-gradient-to-r from-gray-700 to-indigo-500  -->
	{#if open}
	<div class="header relative md:sticky top-0 z-40 w-auto bg-black border-b-8 border-sky-500  flex items-center">
	<HamburgerMenu bind:open />
</div>
	{:else}
	<nav class="w-auto hidden md:flex h-full flex-row justify-center items-center">
		{#each links as link}
			<a
				rel="prefetch"
				sveltekit:prefetch
				href={link.url}
				class="nav-link"
				class:active={link.url === path}
				>{link.title}</a
			>
		{/each}
	</nav>
	{/if}


<style lang="scss">
	@import 'svelte-hamburgers/scss/types/spin';
	:global(.header) {
		grid-area: header;
	}
	nav {
		// width: 100vw;
		// padding-left: 10rem;
		// font-family: 'Montserrat', sans-serif;
		a {
			@apply mx-6 text-xl transition-all duration-150;
			:hover {
				@apply text-sky-600 underline decoration-sky-100 underline-offset-2;
			}
			:active {
				@apply text-fuchsia-400;
			}
			.active {
				@apply text-orange-400 decoration-current underline underline-offset-2 decoration-orange-600;
			}
		}
	}
	:global(nav a.active) {
		@apply text-cyan-500 decoration-current  underline-offset-4 decoration-cyan-500 transition-all;
	}


</style>
