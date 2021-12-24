<script>
	import random from 'canvas-sketch-util/random.js';
	import math from 'canvas-sketch-util/math.js';
	import Color from 'canvas-sketch-util/color.js';

	function makeid(length) {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	let alpha = 'abcdefghijklmnopqrstuvwxyz';
	let dummyArray1 = [];
	let dummyArray2 = [];
	[...Array(40)].map(() => {
		let item1 = makeid(2);
		let item2 = makeid(random.range(6,18));
		dummyArray1.push(item1);
		dummyArray2.push(item2);
	});
	$: dummyArray1, dummyArray2;
</script>

<!-- Beginning to work through https://egghead.io/lessons/tailwind-intro-to-styling-custom-uis-with-tailwind-utility-classes -->

<div class="flex flex-row text-white h-screen w-full">
	<div class="bg-gray-800 p-3 space-y-2  overflow-y-scroll">
		{#each dummyArray1 as serverId}
			<div class="bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center">
				{serverId}
			</div>
		{/each}
	</div>
	<div class="bg-winterblues-100 w-60 flex flex-col">
		<div class="sticky px-3 h-12 shadow-md flex items-center">Header</div>
		<div class="flex flex-col overflow-y-scroll">
			{#each dummyArray2 as item}
				 <!-- content here -->
				 <div class="bg-blue-900 p-3 flex-1">{item}</div>
			{/each}
		</div>
	</div>
	<div class="flex flex-1 flex-col">
		<div class="sticky p-3 shadow-md bg-electricindigo-800 ">Main</div>
		<div class="bg-electricindigo-700 p-3 flex-1">Messages</div>
	</div>
</div>

<style lang="scss">
</style>
