<script>
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
	let servers, channels, messages;
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
			servers = JSON.parse(serversLS)
			channels = JSON.parse(channelsLS)
			messages = JSON.parse(messagesLS)
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
	let discord_src = 'svg/discord.svg';
	let alpha = 'abcdefghijklmnopqrstuvwxyz';
	let discordData = {};

	// discordData.servers = servers;
	// servers.forEach((id) => {
	// 	discordData[id] = { id, channels: channels };
	// 	channels.forEach((channel) => {
	// 		discordData[id].channels[channel] = messages;
	// 	});
	// });

	// console.log(`🚀 ~ file: __layout.svelte ~ line 45 ~ servers.forEach ~ discordData`, discordData);

	// $: servers, channels, messages;

	import { page } from '$app/stores';
	import Server from './Server.svelte';
	import ServerData from './ServerData.svelte';
	import MainUi from './MainUI.svelte';
	$: path = $page.path;
	$: console.log(`🚀 ~ file: __layout.svelte ~ line 46 ~ path`, path);
</script>

{#if mounted}
	<MainUi  {path} />
{/if}
