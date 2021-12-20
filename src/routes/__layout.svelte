<script>
	import Footer from '$components/Footer.svelte';
	import SideNav from '$components/SideNav.svelte';
	import '../app.scss';
	import Nav from '../components/Nav.svelte';
</script>

<div id="app-layout" class="grid w-auto min-h-screen max-h-full bg-black transition">
	<Nav>
		<slot />
	</Nav>
	<!-- <SideNav class="sidebar">
		<slot class="sidebar" />
	</SideNav> -->
	<div class="main flex flex-col items-center jutify-center">
		<slot />
	</div>
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
			' main '
			' footer ';
	}
	.main {
		grid-area: main;
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
