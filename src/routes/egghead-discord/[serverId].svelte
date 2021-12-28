<script context="module">
	export const load = async ({ fetch, page: { params } }) => {
		const { serverId } = params;
		console.log(`🚀 ~ file: [serverId].svelte ~ line 4 ~ load ~ serverId`, serverId);
		console.log(`🚀 ~ file: [serverId].svelte ~ line 4 ~ load ~ params`, params);
		return { props: { serverId } };
	};
</script>

<script>
	export let serverId;
	// console.log(`🚀 ~ file: [serverId].svelte ~ line 13 ~ servers`, servers)
	import { page } from '$app/stores';
	$: path = $page.path;
	import random from 'canvas-sketch-util/random.js';
	import math from 'canvas-sketch-util/math.js';
	import Color from 'canvas-sketch-util/color.js';
	import { LoremIpsum } from 'lorem-ipsum';
	import SvgIcon from '$components/SvgIcon.svelte';
	import { onMount } from 'svelte';
	import { D } from '$stores/discord.js';

	// $:channels = servers.map(s => s.channels)
	// $: console.log(`🚀 ~ file: [serverId].svelte ~ line 25 ~ channels`, channels)
	let serversLS, channelsLS, messagesLS;
	let existingServerList = false;
	let mounted = false;
	$: if (serversLS) {
		existingServerList = true;
	}
	onMount(() => {
		// servers = D.readServers("discordDummyData")
		// console.log(`🚀 ~ file: [serverId].svelte ~ line 24 ~ onMount ~ servers`, servers)
		// if(!servers){
		// 	servers = D.generateServers(15)
		// }
	});

	import MainUi from './MainUI.svelte';
</script>

<MainUi {serverId} />
