<script context="module">
</script>

<script>
	import { canvasSketch } from 'canvas-sketch';
	import { onMount, onDestroy } from 'svelte';

	let canvas;
	let width, height
	let canvasLoaded = false;

	export let settings = {
		dimensions: [250, 205]
	};

	export let data = {};
	let opt = {};
	export let sketch = () => {};

	// handle sketch loaded
	let loader, manager;
	onMount(async () => {
		opt = await {
			...settings,
			canvas,
			parent: canvas.parentElement,
			data
		};
		console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 26 ~ onMount ~ canvas`, canvas)
		console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 27 ~ onMount ~ parent`, parent)
		console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 29 ~ onMount ~ settings`, settings.dimensions);
		canvasLoaded = true;
		// console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 24 ~ onMount ~ opt`, opt)
		// console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 24 ~ onMount ~ opt.parent`, opt.parent)
		// console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 26 ~ onMount ~ parent`, parent)
		loader = await canvasSketch(sketch, opt);
		manager = await loader;
	});

	$: {
		if (opt.parent?.offsetWidth > 0) {
			width = opt.parent?.offsetWidth;
			height = opt.parent?.offsetHeight;
			console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 39 ~ width, height`, width, height);
			canvas.removeAttribute('style')
            console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 46 ~ canvas`, canvas)
			canvas.setAttribute('style', `width: ${width}px; height: ${height}px;`)
		}
	}

	$: console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 46 ~ reactive settings`, settings.dimensions);
	$: width = settings.dimensions[0]
	$: height = settings.dimensions[1]
	// $: console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 46 ~ settings`, settings.animate);
	// $: (settings) => delete settings.animate;
	// handle sketch destroy
	// onDestroy(() => {
	// 	loader.then(m => m.destroy());
	// 	loader = null;
	// 	manager = null;
	// });

	// update settings and data
	$: manager && manager.update(settings);
    console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 65 ~ manager`, manager)
	// $: loader && loader.update(settings)
	$: dataChanged(data);
	// $: console.log(this)
	// $: console.log(canvas)

	function dataChanged(data) {
        console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 65 ~ dataChanged ~ data`, data)
		if (manager) {
			Object.assign(manager.props.data, data);
			manager.render();
		}
	}
</script>

<canvas bind:this={canvas} />

<style>
	/* Optionally style the canvas here */
	canvas {
		margin: 0;
		display: block;
		box-shadow: 0px 2px 12px -2px rgba(0, 0, 0, 0.15);
		width: 100%;
		/* width: inherit; */
		/* min-width: inherit; */
		height: auto;
	}
</style>
