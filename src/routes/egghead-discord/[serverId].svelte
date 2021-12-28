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
	import { D } from '$stores/discord.js';


	let serversLS, channelsLS, messagesLS;
	let existingServerList = false;
	let mounted = false;
	$: if (serversLS) {
		existingServerList = true;
	}
	onMount(() => {
		servers = D.readServers()
		if(!servers){
			servers = D.generateServers()
		}
	});


	import MainUi from "./MainUI.svelte";

</script>

<MainUi {servers} {channels} {messages} {path} />