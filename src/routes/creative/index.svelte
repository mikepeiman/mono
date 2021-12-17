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
	<a href="/creative/sketch01">
		<Sketch01 hidePanel="true" />
	</a>
	<a href="/creative/sketch02">
		<Sketch02 hidePanel="true" />
	</a>
	<a href="/creative/sketch03">
		<Sketch03 hidePanel="true" />
	</a>
	<a href="/creative/sketch04">
		<Sketch04 hidePanel="true" />
	</a>
	<a href="/creative/sketch05">
		<Sketch05 hidePanel="true" />
	</a>
	<a href="/creative/sketch06">
		<Sketch06 hidePanel="true" />
	</a>
	<a href="/creative/sketch07">
		<Sketch07 hidePanel="true" />
	</a>
	<a href="/creative/sketch08">
		<Sketch08 hidePanel="true" />
	</a>
	<a href="/creative/sketch09">
		<Sketch09 hidePanel="true" />
	</a>
</div>

<style lang="scss">
	/* .title {
		grid-area: title;
	} */
	.main {
		grid-area: main;
		display: grid;
		max-width: 100%;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
		// :nth-child(4n + 2),
		// :nth-child(4n + 1) {
		// 	grid-column: 1 / span 1;
		// 	grid-row: 1 / span 1;
		// }
		a {
			align-self: flex-start;
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
