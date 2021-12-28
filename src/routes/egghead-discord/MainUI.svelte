<script>
	export let serverId, servers, channels, messages, path;

	import random from 'canvas-sketch-util/random.js';
	import math from 'canvas-sketch-util/math.js';
	import Color from 'canvas-sketch-util/color.js';
	import { LoremIpsum } from 'lorem-ipsum';
	import SvgIcon from '$components/SvgIcon.svelte';
	import { onMount } from 'svelte';
	import { serversStore, channelsStore, messagesStore } from '$stores/discord.js';
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

	let serversLS, channelsLS, messagesLS;
	let existingServerList = false;
	let mounted = false;
	$: if (serversLS) {
		existingServerList = true;
	}
	onMount(() => {
		serversLS = localStorage.getItem('servers');
		channelsLS = localStorage.getItem('channels');
		messagesLS = localStorage.getItem('messages');
		if (serversLS) {
			existingServerList = true;
		}
		if (!existingServerList) {
			servers = [];
			channels = [];
			messages = [];
			[...Array(40)].map((_, i) => {
				let id = makeid(2);
				let channel = makeid(random.range(6, 18));
				let message = lorem.generateSentences(Math.floor(random.range(1, 8)));
				servers.push(id);
				channels.push(channel);
				messages.push(message);
			});
			serversStore.set(servers);
			channelsStore.set(channels);
			messagesStore.set(messages);
		} else {
			servers = JSON.parse(serversLS);
			channels = JSON.parse(channelsLS);
			messages = JSON.parse(messagesLS);
		}

		mounted = true;
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

	import Discord from '~icons/my-icons/discord';
	import Server from './Server.svelte';
</script>
{#if mounted}
<div class="flex flex-row text-white h-screen w-full">
	<div class="bg-gray-800 p-3 space-y-2 overflow-y-scroll">
		<a
			href="/egghead-discord"
			class="{path === '/egghead-discord'
				? 'bg-blue-500 text-white rounded-2xl'
				: 'text-gray-100 rounded-3xl bg-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-200 rounded-3xl hover:rounded-2xl'} w-12 h-12 flex items-center justify-center "
		>
			<Discord class="w-7 h-5 " />
		</a>

		{#each servers as serverId}
			<Server {serverId} {servers} {channels} {messages} {path} />
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
{/if}