<!-- Code copied gratefully from Matt DesLaurier's excellent Svelte REPL at
https://svelte.dev/repl/5ab538b7182941f789908a660e9bd25c?version=3.12.1

Leaving his example as the first sketch here in honor of his work and amazing contributions -->
<script>
	export let hidePanel = false;
	import CanvasSketchEditor from '$components/CanvasSketchEditor.svelte';
	import Slider from '$components/Slider.svelte';
	import OptionSelect from '$components/OptionSelect.svelte';
	import ColorInput from '$components/ColorInput.svelte';
	import Checkbox from '$components/Checkbox.svelte';
	import random from 'canvas-sketch-util/random.js';
	import math from 'canvas-sketch-util/math.js';
	import Color from 'canvas-sketch-util/color.js';
	import CanvasSketch from '$components/CanvasSketch.svelte';

	let width = 2048;
	let height = 2048;

	// =============================================================================
	// basic animation example below; canvas-sketch 'animate' setting calls this on main return function
	// =============================================================================
	const animate = () => {
		console.log(`Mike animate`);
		requestAnimationFrame(animate);
	};
	// animate()
	// =============================================================================

	let agents = [];
	let hexes = [];

	const data = {
		TITLE: 'Sketch03',
		numNodes: 200,
		range: 200,
		lineCap: 'butt',
		lineCaps: [
			{ value: 'butt', label: 'butt' },
			{ value: 'round', label: 'round' }
		],
		showNodes: false,
		showLines: true,
		nodeType: 'hex',
		nodeTypes: [
			{ value: 'hex', label: 'hex' },
			{ value: 'circle', label: 'circle' }
		],
		lineWidthMax: 5,
		radiusMin: 10,
		radiusMax: 30,
		animate: true
	};
	$: data;
	const settings = {
		dimensions: [width, height],
		animate: data.animate
	};

	// const createTweakpane = () => {
	//   const pane = new Tweakpane.Pane()
	//   let folder
	//   folder = pane.addFolder({ title: "data" })
	//   folder.addInput(data, 'range', {
	//     min: 10,
	//     max: 500,
	//     step: 10
	//   })
	//   folder.addInput(data, 'numNodes', {
	//     min: 10,
	//     max: 500,
	//     step: 10
	//   })    .on('change', (e) => {
	//     constructNodes(width, height)
	//   }),
	//   folder.addInput(data, 'lineWidthMax', {
	//     min: 5,
	//     max: 100,
	//     step: 1
	//   })
	//   folder.addInput(data, 'radiusMin', {
	//     min: 1,
	//     max: 200,
	//     step: 1
	//   })
	//     .on('change', (e) => {
	//       constructNodes(width, height)
	//     }),
	//   folder.addInput(data, 'radiusMax', {
	//     min: 10,
	//     max: 500,
	//     step: 10
	//   })
	//     .on('change', (e) => {
	//       constructNodes(width, height)
	//     }),
	//   folder.addInput(data, 'lineCap', {
	//     options: {
	//       butt: 'butt',
	//       round: 'round',
	//       square: 'square'
	//     }
	//   })
	//   folder.addInput(data, 'nodeType', {
	//     options: {
	//       hex: 'hex',
	//       circle: 'circle',
	//     }
	//   })
	//   folder.addInput(data, 'animate', {
	//   })
	//   folder.addInput(data, 'showNode', {
	//   })
	//   folder.addInput(data, 'showLines', {
	//   })
	// }

	const constructNodes = (width, height) => {
		if (data.numNodes > hexes.length) {
			for (let i = 0; i < data.numNodes - hexes.length; i++) {
				let x = random.range(0, width);
				let y = random.range(0, height);
				let hex = new Hex(x, y);
				hexes = [...hexes, hex];
			}
		} else {
			for (let i = 0; i < hexes.length - data.numNodes; i++) {
				hexes.pop();
			}
		}
	};
	const sketch = ({ context, width, height }) => {
		let pen = context;
		constructNodes(width, height);
		for (let i = 0; i < hexes.length; i++) {
			const hex = hexes[i];
			for (let j = i + 1; j < hexes.length; j++) {
				const other = hexes[j];
				const dist = hex.pos.getDistance(other.pos);
				if (dist > data.range) continue;
				pen.lineWidth = math.mapRange(dist, 0, data.range, data.lineWidthMax, 1);
				pen.beginPath();
				pen.moveTo(hex.pos.x, hex.pos.y);
				data.showLines ? pen.lineTo(other.pos.x, other.pos.y) : 0;
				let a = rangeAlpha(data.range, dist);
				// Color.parse(hex.color).hsla[3] = c
				let h = Color.parse(hex.color).hsla[0];
				let s = Color.parse(hex.color).hsla[1];
				let l = Color.parse(hex.color).hsla[2];
				// let a =         Color.parse(hex.color).hsla[3]
				pen.strokeStyle = hsla(h, s, l, a);
				pen.lineCap = data.lineCap;
				pen.stroke();
			}
		}
		return ({ context, width, height }) => {
			let pen = context;
			pen.fillStyle = 'black';
			pen.fillRect(0, 0, width, height);
			if (data.numNodes != hexes.length) {
			}

			hexes.forEach((hex) => {
				hex.update();
				if (data.showNodes) {
					data.nodeType == 'hex' ? hex.drawHex(pen) : hex.drawCircle(pen);
				}
				hex.wrap(width, height);
			});
		};
	};

	class Vector {
		constructor(x, y) {
			this.x = x;
			this.y = y;
		}

		getDistance(v) {
			const dx = this.x - v.x;
			const dy = this.y - v.y;
			return Math.sqrt(dx * dx + dy * dy);
		}
	}

	class Agent {
		constructor(x, y) {
			this.pos = new Vector(x, y);
			this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
			this.radius = random.range(data.radiusMin, data.radiusMax);
		}
		update() {
			this.pos.x += this.vel.x;
			this.pos.y += this.vel.y;
		}

		bounce(width, height) {
			if (this.pos.x <= 0 || this.pos.x >= width) {
				this.vel.x *= -1;
			}
			if (this.pos.y <= 0 || this.pos.y >= height) {
				this.vel.y *= -1;
			}
		}

		// wrap(width, height) {
		//   if (this.pos.x > width) this.pos.x = 0
		//   if (this.pos.x < 0) this.pos.x = width
		//   if (this.pos.y > height) this.pos.y = 0
		//   if (this.pos.y < 0) this.pos.y = height
		// }
		// more succinct example taken from student celeph @ https://www.domestika.org/en/courses/2729-creative-coding-making-visuals-with-javascript/community/forum/topics/188605-wrap#topic_188605_new_post
		// ===========================================================================
		wrap(width, height) {
			this.pos.x = (this.pos.x + width) % width;
			this.pos.y = (this.pos.y + height) % height;
		}
		// ===========================================================================

		drawCircle(pen) {
			pen.save();
			pen.translate(this.pos.x, this.pos.y);
			pen.beginPath();
			pen.arc(0, 0, this.radius, 0, Math.PI * 2);
			pen.fill();
			pen.lineWidth = 4;
			pen.strokeStyle = this.color;
			pen.stroke();
			pen.restore();
		}
	}

	class Hex extends Agent {
		constructor(x, y, numOfSides = 6, positiveVelSum = 0, color = 'hsla(180,50%,50%,1)') {
			super(x, y);
			this.numOfSides = numOfSides;
			this.positiveVelSum = parseFloat(
				makePositive(this.vel.x).toFixed(3) + makePositive(this.vel.y).toFixed(3)
			);
			this.color = hsla((this.positiveVelSum * 360) % 360, 50, 50, 1);
		}

		drawHex(pen) {
			pen.save();
			pen.beginPath();
			pen.moveTo(this.pos.x + this.radius * Math.cos(0), this.pos.y + this.radius * Math.sin(0));

			for (let i = 0; i < this.numOfSides; i++) {
				let xCoord = this.pos.x + this.radius * Math.cos((i * 2 * Math.PI) / this.numOfSides);
				let yCoord = this.pos.y + this.radius * Math.sin((i * 2 * Math.PI) / this.numOfSides);
				pen.lineTo(xCoord, yCoord);
				pen.fillStyle = this.color;
			}
			pen.fill();
			pen.restore();
		}
	}

	const makePositive = (value) => {
		if (value < 0) return value * -1;
		return value;
	};

	const hsla = (h, s, l, a) => {
		let color = `hsla(${h},${s}%,${l}%,${a})`;
		return color;
	};

	const rangeAlpha = (range, dist) => {
		// let c = Color.parse(color).hsla[3]
		// let r = math.mapRange(dist, 0, range, 0, 1, true)
		return math.mapRange(dist, 0, range, 1, 0, true);
	};
</script>

<CanvasSketchEditor {sketch} {settings} {data} {hidePanel}>
	<Slider label="Range" bind:value={data.range} min="10" max="500" step="10" />
	<Slider
		label="Number of nodes"
		bind:value={data.numNodes}
		on:change={constructNodes(width, height)}
		min="10"
		max="1000"
		step="10"
	/>
	<OptionSelect items={data.lineCaps} bind:selected={data.lineCap} />
	<OptionSelect items={data.nodeTypes} bind:selected={data.nodeType} />
	<Checkbox label="Show nodes" bind:checked={data.showNodes} />
	<Checkbox label="Show lines" bind:checked={data.showLines} />
	<!-- lineCap: 'butt',
	showNode: false,
	showLines: true,
	nodeType: 'hex',
	lineWidthMax: 5,
	radiusMin: 10,
	radiusMax: 30,
	animate: true -->
</CanvasSketchEditor>
