<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('../posts.json');
		if (res.ok) {
			const { posts } = await res.json();
			return { props: { posts } };
		}
	};
</script>

<script>
	import Sketch02 from './sketch02.svelte';
	import Sketch03 from './sketch03.svelte';
	import Sketch04 from './sketch04.svelte';
	import Sketch01 from './sketch01.svelte';
	import Sketch05 from './sketch05.svelte';
	import Sketch06 from './sketch06.svelte';
	import Sketch07 from './sketch07.svelte';
	import Sketch08 from './sketch08.svelte';
	import Sketch09 from './sketch09.svelte';
	export let posts;
	// console.log(`🚀 ~ file: index.svelte ~ line 14 ~ posts`, posts)
</script>

<svelte:head>
	<title>MetaBrain: Your Life OS</title>
</svelte:head>

<div class="title flex flex-col items-center  p-6">
	<h1>Creative coding</h1>
	<p>Sketches and animations</p>
</div>
<div class="main justify-items-center">
	<Sketch01 hidePanel="true" />
	<Sketch02 hidePanel="true" />
	<Sketch03 hidePanel="true" />
	<Sketch04 hidePanel="true" />
	<Sketch05 hidePanel="true" />
	<Sketch06 hidePanel="true" />
	<Sketch07 hidePanel="true" />
	<Sketch08 hidePanel="true" />
	<Sketch09 hidePanel="true" />
</div>

<style lang="scss">
	/* .title {
		grid-area: title;
	} */
	.main {
		grid-area: main;
		display: grid;
		grid-template-rows: 25rem;
		/* grid-template-columns: repeat(4, [sketch-col-start sketch-col-end] 1fr); */
		/* grid-template-columns: repeat(auto-fit, 25rem); */
		max-width: 100%;
		/* grid-template-rows: repeat(auto-fill, [title-start] 1fr [sketch-start sketch-end] 4fr); */
		/* grid-auto-flow: column; */
		grid-template-columns: repeat(4, minmax(200px, 250px));
		/* grid-template-areas:
			'sketch-title sketch-title sketch-title sketch-title'
			'sketch-canvas sketch-canvas sketch-canvas sketch-canvas'; */
		:nth-child(4n + 2),
		:nth-child(4n + 1) {
			grid-column: 1 / span 1;
			grid-row: 1 / span 1;
		}
	}
	.pad {
		grid-area: pad;
	}
	h1 {
		font-size: 3rem;
		font-weight: 800;
	}
</style>
