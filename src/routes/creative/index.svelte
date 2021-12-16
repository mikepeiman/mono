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
<div class="main grid justify-items-center">
<Sketch01 hidePanel="true" />
<Sketch02 hidePanel="true" />
<Sketch03 hidePanel="true" />
<Sketch04 hidePanel="true" />
</div>

<style>
	.title {
		grid-area: title;
	}
	.main {
		grid-area: main;
		display: grid;

		grid-template-columns: repeat(3, 1fr);
	}
	.pad {
		grid-area: pad;
	}
	h1 {
		font-size: 3rem;
		font-weight: 800;
	}
</style>
