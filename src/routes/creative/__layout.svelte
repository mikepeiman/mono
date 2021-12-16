<script>
	import Footer from '$components/Footer.svelte';
	import SideNav from '$components/SideNav.svelte';
	import '../../app.scss';
	import Nav from '$components/Nav.svelte';
</script>

<div id="creative-layout" class="grid w-auto h-full">
	<!-- <Nav class="header">
		<slot class="header" />
	</Nav> -->
	<SideNav class="sidebar">
		<slot class="sidebar" />
	</SideNav>
	<slot />
</div>

<style lang="scss">
	:global(#creative-layout) {
		width: 100%;
		grid-template-rows: auto 1fr;
		grid-template-columns: auto 1fr;
		grid-template-areas:
			'sidebar title'
			'sidebar main';
	}
	.main {
		justify-content: center;
		align-items: center;
		grid-area: main;
		display: grid;
		height: auto;
		grid-template-columns: 60vw;
		grid-template-rows: 10rem auto;
		grid-template-areas:
			'title'
			'body';
	}

	.header {
		grid-area: header;
	}

	.sidebar {
		grid-area: sidebar;
	}
</style>
