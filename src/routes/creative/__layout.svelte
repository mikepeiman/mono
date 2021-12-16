<script>
	import Footer from '$components/Footer.svelte';
	import SideNav from '$components/SideNav.svelte';
	import '../../app.scss';
	import Nav from '$components/Nav.svelte';
</script>

<div id="creative-layout" class="grid w-auto h-screen">
	<!-- <Nav class="header">
		<slot class="header" />
	</Nav> -->
	<SideNav class="sidebar">
		<slot class="sidebar" />
	</SideNav>
	<div class="main h-screen flex flex-col items-center jutify-center">
		<slot />
	</div>
	<!-- <Footer /> -->
</div>

<style lang="scss">
	:global(#creative-layout) {
		// height: 100vh;
		width: 100%;
		grid-template-rows: auto;
		grid-template-columns: 10rem 1fr;
		grid-template-areas:
			'sidebar main'
			'sidebar footer';
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
