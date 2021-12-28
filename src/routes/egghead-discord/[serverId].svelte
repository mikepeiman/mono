<script context="module">
	export async function load({page, fetch, session, context}) {
	    return {
	        props: {
	            serverId: page.params.serverId
	        }
	    }
	}
</script>

<script>
	export let serverId, servers, channels, messages, path
	import {page} from '$app/stores'
	$: path = $page.path
    $: console.log(`🚀 ~ file: [serverId].svelte ~ line 16 ~ path`, path)
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
			servers = JSON.parse(serversLS)
			channels = JSON.parse(channelsLS)
			messages = JSON.parse(messagesLS)
		}
		mounted = true;
		console.log(`🚀 ~ file: [serverId].svelte ~ line 64 ~ onMount ~ servers`, servers)
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
	import MainUi from "./MainUI.svelte";

</script>

<MainUi {servers} {channels} {messages} {path} />