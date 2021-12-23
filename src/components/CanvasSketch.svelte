<script context="module">
</script>

<script>
	import { canvasSketch } from 'canvas-sketch';
	import { onMount, onDestroy } from 'svelte';

	let canvas;
	let width, height;
	let canvasLoaded = false;

	export let settings = {
		dimensions: [250, 205]
	};

	export let data = {};
	let opt = {};
	export let sketch = () => {};

	// handle sketch loaded
	let loader, manager, parent, pw, ph, windowInnerW, style;
	let fullyLoaded = false;
	onMount(async () => {
		opt = await {
			...settings,
			canvas,
			parent: canvas.parentElement,
			data
		};
		console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 26 ~ onMount ~ canvas`, canvas);
		console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 27 ~ onMount ~ parent`, parent);
		console.log(
			`🚀 ~ file: CanvasSketch.svelte ~ line 29 ~ onMount ~ settings`,
			settings.dimensions
		);
		canvasLoaded = true;
		// console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 24 ~ onMount ~ opt`, opt)
		// console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 24 ~ onMount ~ opt.parent`, opt.parent)
		// console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 26 ~ onMount ~ parent`, parent)
		loader = await canvasSketch(sketch, opt);
		manager = await loader;
		let loadedCanvas = await manager._settings.canvas;
		parent = canvas.parentElement;
		pw = parent.offsetWidth;
		ph = parent.offsetHeight;
		console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 44 ~ onMount ~ parent`, parent);
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;
		fullyLoaded = true;
		console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 40 ~ onMount ~ loadedCanvas`, loadedCanvas);
	});

	$: fullyLoaded && windowInnerW ? resizeCanvas() : false;
	$: console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 53 ~ windowInnerW width`, windowInnerW);
	function resizeCanvas() {
		// settings.dimensions[0] = pw / 3
		// settings.dimensions[1] = ph / 3
        console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 57 ~ resizeCanvas ~ settings.dimensions`, settings.dimensions)
		parent = canvas.parentElement;
		pw = parent.offsetWidth;
        console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 58 ~ resizeCanvas ~ pw`, pw)
		ph = parent.offsetHeight;
        console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 63 ~ resizeCanvas ~ canvas.style.width: `, canvas.style.width)
		style = `width: ${pw}px; height: ${ph}px;`
		// canvas.style = style
		canvas.removeAttribute('style')
		canvas.setAttribute('style', `width: ${pw}; height: ${ph};`) 
        console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 63 ~ resizeCanvas ~ canvas.style.width: `, canvas.style.width)
		canvas.style.width = `${pw}px`;
		canvas.style.height = `${ph}px`;
        console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 63 ~ resizeCanvas ~ canvas.style.width: after reset `, canvas.style.width)
        console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 68 ~ resizeCanvas ~ canvas`, canvas)
	}

	$: console.log(
		`🚀 ~ file: CanvasSketch.svelte ~ line 46 ~ reactive settings`,
		settings.dimensions
	);
	$: width = settings.dimensions[0];
	$: height = settings.dimensions[1];

	// handle sketch destroy
	// onDestroy(() => {
	// 	loader.then(m => m.destroy());
	// 	loader = null;
	// 	manager = null;
	// });

	// update settings and data
	$: manager && manager.update(settings);
	console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 65 ~ manager`, manager);
	$: dataChanged(data);

	function dataChanged(data) {
		console.log(`🚀 ~ file: CanvasSketch.svelte ~ line 65 ~ dataChanged ~ data`, data);
		if (manager) {
			Object.assign(manager.props.data, data);
			manager.render();
		}
	}
</script>
<svelte:window bind:innerWidth={windowInnerW} />
<canvas bind:this={canvas} class="rounded-lg" />

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
