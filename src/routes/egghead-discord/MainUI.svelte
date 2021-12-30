<script>
	import { page } from '$app/stores';
	$: path = $page.path;
	export let serverId, channelId;
	import random from 'canvas-sketch-util/random.js';
	import math from 'canvas-sketch-util/math.js';
	import Color from 'canvas-sketch-util/color.js';
	import { LoremIpsum } from 'lorem-ipsum';
	import SvgIcon from '$components/SvgIcon.svelte';
	import { onMount } from 'svelte';
	import { D } from '$stores/discord.js';
	let servers, channels, messages;

	let mounted = false;

	$: console.log(`🚀 ~ file: MainUI.svelte ~ line 5 ~ channelId`, channelId);
	$: console.log(
		`🚀 ~ file: MainUI.svelte ~ line 28 ~ serverId *********************************************`,
		serverId
	);
	let serverIndex;
	$: servers ? (serverIndex = servers.findIndex((s) => s.id === serverId)) : false;
	$: console.log(`🚀 ~ file: MainUI.svelte ~ line 23 ~ serverIndex`, serverIndex);
	let channelIndex;
	$: console.log(`🚀 ~ file: MainUI.svelte ~ line 34 ~ channelIndex`, channelIndex);
	$: channels ? (channelIndex = channels.findIndex((c) => c.id === channelId)) : false;
	$: console.log(`🚀 ~ file: MainUI.svelte ~ line 28 ~ messages`, messages);
	onMount(async () => {
		servers = await D.readServers('discordDummyData');
		console.log(`🚀 ~ file: MainUI.svelte ~ line 22 ~ onMount ~ servers`, servers);
		if (!servers) {
			servers = await D.generateServers(30);
		}
		// let serverIdInPath = path.split('/')[2];
		if (serverId !== 'home') {
			console.log(`🚀 ~ file: MainUI.svelte ~ line 40 ~ onMount ~ serverId`, serverId);
			let serverIndex = servers.findIndex((s) => s.id === serverId);
			console.log(
				`🚀 ~ file: MainUI.svelte ~ line 37 ~ onMount ~ serverIndex @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ `,
				serverIndex
			);
			channels = servers[serverIndex].channels;
		} else {
			channels = servers[0].channels;
		}
		servers.forEach(async (serv) => {
			// console.log(`🚀 ~ file: MainUI.svelte ~ line 28 ~ onMount ~ serv`, serv);
			// console.log(
			// 	`🚀 ~ file: MainUI.svelte ~ line 49 ~ servers.forEach ~ serverIndex`,
			// 	serverIndex
			// );
			// console.log(
			// 	`🚀 ~ file: MainUI.svelte ~ line 50 ~ servers.forEach ~ serverIndex !== "undefined"`,
			// 	serverIndex !== undefined
			// );
			if (serv.channels.length < 1 && serv.id) {
				channels = await D.generateChannels(serv.id);
				console.log(`🚀 ~ file: MainUI.svelte ~ line 50 ~ servers.forEach ~ channels`, channels);
			}
		});
		channels.forEach((chan) => {
            console.log(`🚀 ~ file: MainUI.svelte ~ line 66 ~ channels.forEach ~ chan`, chan)
			if (chan.messages.length < 1) {
				messages = D.generateMessages(serverId, chan.id);
			} 
		});
		mounted = true;
	});

	$: servers, channels, messages;
	$: console.log(`🚀 ~ file: MainUI.svelte ~ line 32 ~ servers`, servers);
	import Discord from '~icons/my-icons/discord';
	import Server from './Server.svelte';
	import Channel from './Channel.svelte';
	import Channels from './Channels.svelte';
	import Messages from './Messages.svelte';
</script>

{#if mounted}
	<div class="flex flex-row text-white h-screen w-full">
		<div class="bg-gray-800 p-3 space-y-2 overflow-y-scroll">
			{#if servers}
				{#each servers as s}
					<Server serverId={s.id} serverName={s.name} />
				{/each}
			{/if}
		</div>
		<div class="bg-gray-800 w-60 flex flex-col">
			<Channels {servers} {serverIndex}  />
		</div>
		<div class="flex flex-1 flex-col">

			<Messages {servers} {serverIndex} {channels} {channelIndex} />

			<!--  messages={channels[channelIndex].messages} -->
		</div>
	</div>
{/if}

<style lang="scss">
	* {
		scrollbar-width: thin;
		scrollbar-color: blue orange;
	}

	/* Works on Chrome, Edge, and Safari */
	*::-webkit-scrollbar {
		width: 6px;
	}

	*::-webkit-scrollbar-track {
		@apply bg-gray-800;
	}

	*::-webkit-scrollbar-thumb {
		//   background-color: orange;
		border-radius: 2rem;
		@apply border-4 border-sky-800 bg-sky-600;
		//   border: 5px solid teal;
	}
</style>
