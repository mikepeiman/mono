<script>
	import random from 'canvas-sketch-util/random.js';
	import math from 'canvas-sketch-util/math.js';
	import Color from 'canvas-sketch-util/color.js';
	import { LoremIpsum } from 'lorem-ipsum';
import SvgIcon from '$components/SvgIcon.svelte';
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

	let discord = `<svg class="homeIcon-AaowEC" aria-hidden="false" width="28" height="20" viewBox="0 0 28 20"><path fill="currentColor" d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0.00546311C8.48074 0.324393 6.67795 0.885118 4.96746 1.68231C1.56727 6.77853 0.649666 11.7538 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22338 19.2743 8.69519 18.4993 9.09812 17.691C8.32996 17.3997 7.58522 17.0424 6.87684 16.6135C7.06531 16.4762 7.24726 16.3387 7.42403 16.1847C11.5911 18.1749 16.408 18.1749 20.5763 16.1847C20.7531 16.3332 20.9351 16.4762 21.1171 16.6135C20.41 17.0369 19.6639 17.3997 18.897 17.691C19.3052 18.4993 19.7718 19.2689 20.3021 19.9945C22.6677 19.2689 24.8929 18.1364 26.8828 16.6466H26.8893C27.43 10.9731 25.9665 6.04728 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0187 10.994C12.0187 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9765 12.4453 15.9765 10.994C15.9765 9.54272 17.0124 8.34973 18.3161 8.34973C19.6184 8.34973 20.6751 9.54272 20.6543 10.994C20.6543 12.4453 19.6184 13.6383 18.3161 13.6383Z"></path></svg>`


	function makeid(length) {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
	let discord_src = 'svg/discord.svg'
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
		<SvgIcon name="discord" class="text-sky-400 w-12 h-12"  />
		{@html discord}
		<img src={discord_src} />
		{#each servers as serverId}
			<div class="bg-gray-700 text-white w-12 h-12 rounded-full flex items-center justify-center">
				{serverId}
			</div>
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

<style lang="scss" width="48px" class="text-sky-300 bg-sky-50" >

</style>
