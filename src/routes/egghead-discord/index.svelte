<script>
	import random from 'canvas-sketch-util/random.js';
	import math from 'canvas-sketch-util/math.js';
	import Color from 'canvas-sketch-util/color.js';
	import { LoremIpsum } from 'lorem-ipsum';
	import SvgIcon from '$components/SvgIcon.svelte';
	import Discord from '~icons/my-icons/discord';
	const lorem = new LoremIpsum({
		sentencesPerParagraph: {
			min: 1,
			max: 8
		},
		wordsPerSentence: {
			min: 4,
			max: 16
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
	let discord_src = 'svg/discord.svg';
	let alpha = 'abcdefghijklmnopqrstuvwxyz';
	let servers = [];
	let channels = [];
	let messages = [];
	[...Array(40)].map((_, i) => {
		let server = makeid(2);
		let channel = makeid(random.range(6, 18));
		let message = lorem.generateSentences(Math.floor(random.range(1, 8)));
		servers.push(server);
		channels.push(channel);
		messages.push(message);
	});
	$: servers, channels;
</script>

<!-- Beginning to work through https://egghead.io/lessons/tailwind-intro-to-styling-custom-uis-with-tailwind-utility-classes -->

<div class="flex flex-row text-white h-screen w-full">
	<div class="bg-gray-800 p-3 space-y-2 overflow-y-scroll">
		<div class="bg-gray-600 text-gray-100 w-12 h-12 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-200 rounded-3xl hover:rounded-2xl hover:transition-all">
			<Discord class="w-7 h-5 " />
		</div>

		{#each servers as serverId}
		<a href="/egghead-discord/servers/{serverId}" class="bg-gray-600 text-gray-100 w-12 h-12 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-200 rounded-3xl hover:rounded-2xl hover:transition-all">
			{serverId}
		</a>
		{/each}
	</div>
	<div class="bg-winterblues-100 w-60 flex flex-col">
		<div class="px-3 h-12 shadow-md flex flex-shrink-0 items-center font-fira">Header</div>
		<div class="flex flex-col overflow-y-scroll">
			{#each channels as item}
				<!-- content here -->
				<div class="bg-blue-900 p-3 flex-1">{item}</div>
			{/each}
		</div>
	</div>
	<div class="flex flex-1 flex-col">
		<div class="p-3 h-12 shadow-md bg-electricindigo-800 flex font-fira">Main</div>
		<div class="p-3 bg-electricindigo-700  flex-1 space-y-4 overflow-y-scroll">
			{#each messages as message}
				<p class="w-full text-2xl">{message}</p>
			{/each}
		</div>
	</div>
</div>

<style lang="scss" width="48px" class="text-sky-300 bg-sky-50">
</style>
