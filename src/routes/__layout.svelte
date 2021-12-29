<script>
	import Footer from '$components/Footer.svelte';
	import SideNav from '$components/SideNav.svelte';
	import '../app.scss';
	import Nav from '../components/Nav.svelte';
	import { page } from '$app/stores';
	$: path = $page.path;
    $: console.log(`🚀 ~ file: index.svelte ~ line 24 ~ path`, path)
</script>

<div id="app-layout" class="grid w-auto min-h-screen max-h-full bg-black transition">
	{#if path !== '/' && !path.includes('egghead-discord')}
	<Nav>
		<slot />
	</Nav>
	<div class="layout-main flex flex-col items-center jutify-center">
		<slot />
	</div>
	{:else}
	<div class="layout-main flex flex-col items-center -mt-20 jutify-center">
		<slot />
	</div>
	{/if}


	<Footer />
</div>

<style lang="scss">
	:global(#app-layout) {
		// height: 100vh;
		// width: 100vw;
		grid-template-rows: 5rem auto 80px;
		grid-template-columns: auto;
		grid-template-areas:
			' header '
			' layout-main '
			' footer ';
	}
	.layout-main {
		grid-area: layout-main;
		// display: flex;
		// flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.header {
		grid-area: header;
	}

	.sidebar {
		grid-area: sidebar;
	}
</style>
