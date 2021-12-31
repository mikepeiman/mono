<script>
	import random from 'canvas-sketch-util/random.js';
	import math from 'canvas-sketch-util/math.js';
	import Color from 'canvas-sketch-util/color.js';
	import { LoremIpsum } from 'lorem-ipsum';
	import SvgIcon from '$components/SvgIcon.svelte';
	import { onMount } from 'svelte';
	// import { serversStore, channelsStore, messagesStore } from '$stores/discord.js';
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
	let serverId = "home"
	let serversLS, channelsLS, messagesLS;
	let existingServerList = false;
	let mounted = false;
	$: if (serversLS) {
		existingServerList = true;
	}
	onMount(() => {
		mounted = true;
	});

	import { page } from '$app/stores';
	import Server from './Server.svelte';
	import ServerData from './ServerData.svelte';
	import MainUi from './MainUI.svelte';
	$: path = $page.path;
	$: console.log(`🚀 ~ file: __layout.svelte ~ line 46 ~ path`, path);
</script>

{#if mounted}
	<MainUi  {serverId} />
{/if}
