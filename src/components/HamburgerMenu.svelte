<script>
    import { fly, scale } from 'svelte/transition';
    import { quadOut } from 'svelte/easing';
    export let open;
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

<div class="header sticky top-0 z-50 w-auto bg-black  border-b-2 border-sky-900 flex items-center">
	<nav class="w-auto h-full flex flex-col justify-center items-center">
		{#each links as link, i}
			<a
				rel="prefetch"
				transition:fly={{ y: -15, delay: 50 + i}}
				sveltekit:prefetch
				href={link.url}
				class="nav-link tracking-widest w-full px-6 py-4 hover:text-cyan-500 hover:bg-gray-900"
				class:active={link.url === path}
				>{link.title}</a
			>
		{/each}
	</nav>
	<hr transition:scale={{ duration: 750, easing: quadOut, opacity: 1 }} />
</div>

<style lang="scss">
	// :global(.header) {
	// 	grid-area: header;
	// }
	nav {
		width: 100vw;
		text-align: center;
		// padding-left: 10rem;
		// font-family: 'Montserrat', sans-serif;
		a {
			@apply mx-6 text-xl transition-all duration-150;
			:hover {
				@apply text-sky-600 underline decoration-sky-100 underline-offset-2;
			}
			&:active {
				@apply text-fuchsia-400;
			}
			.active {
				@apply text-orange-400 decoration-current underline-offset-2 decoration-orange-600;
			}
		}
	}
	// :global(nav a.active) {
	// 	@apply text-cyan-500 decoration-current underline underline-offset-4 decoration-cyan-500 transition-all;
	// }


</style>
