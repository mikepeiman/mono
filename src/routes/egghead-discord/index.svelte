<script>
	import random from 'canvas-sketch-util/random.js';
	import math from 'canvas-sketch-util/math.js';
	import Color from 'canvas-sketch-util/color.js';
	import { LoremIpsum } from 'lorem-ipsum';
	const lorem = new LoremIpsum({
		sentencesPerParagraph: {
			min: 1,
			max: 8,
		},
		wordsPerSentence: {
			min: 4,
			max: 16,
		}
	});


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
	let servers = [];
	let channels = [];
	let messages = [];
	[...Array(40)].map((_, i) => {
		let server = makeid(2);
		let channel = makeid(random.range(6, 18));
		let message = lorem.generateSentences(Math.floor(random.range(1,8)))
		servers.push(server);
		channels.push(channel);
		messages.push(message);
	});
	$: servers, channels;
</script>

<!-- Beginning to work through https://egghead.io/lessons/tailwind-intro-to-styling-custom-uis-with-tailwind-utility-classes -->

<div class="flex flex-row text-white h-screen w-full">
	<div class="bg-gray-800 p-3 space-y-2  overflow-y-scroll">
		{#each servers as serverId}
			<div class="bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center">
				{serverId}
			</div>
		{/each}
	</div>
	<div class="bg-winterblues-100 w-60 flex flex-col">
		<div class="px-3 h-12 shadow-md flex flex-shrink-0 items-center">Header</div>
		<div class="flex flex-col overflow-y-scroll">
			{#each channels as item}
				<!-- content here -->
				<div class="bg-blue-900 p-3 flex-1">{item}</div>
			{/each}
		</div>
	</div>
	<div class="flex flex-1 flex-col">
		<div class="p-3 h-12shadow-md bg-electricindigo-800 flex">Main</div>
		<div class="p-3 bg-electricindigo-700 flex-1 space-y-4 overflow-y-scroll">
			{#each messages as message}
			<p class="w-full font-family text-2xl">{message}</p>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.font-family {
		font-weight: 500;
		font-family: 'Montserrat';
		font-family: 'Josefin';
		font-family: 'Merriweather';
		font-family: 'Cairo';
		font-family: 'Vollkorn';
		font-family: 'Open Sans';

	}
</style>
