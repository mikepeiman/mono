<script>
	import { page } from '$app/stores';
	$: path = $page.path;
	export let serverId, channelId
	import random from 'canvas-sketch-util/random.js';
	import math from 'canvas-sketch-util/math.js';
	import Color from 'canvas-sketch-util/color.js';
	import { LoremIpsum } from 'lorem-ipsum';
	import SvgIcon from '$components/SvgIcon.svelte';
	import { onMount } from 'svelte';
	import { D, channelsStore, messagesStore } from '$stores/discord.js';
	let servers, channels, messages;
	let serversLS, channelsLS, messagesLS;
	let existingServerList = false;
	let mounted = false;
	$: if (serversLS) {
		existingServerList = true;
	}
	// let pathFragment;
	// $: pathFragment = path.split('/')[path.length - 1];
	// $: console.log(`🚀 ~ file: MainUI.svelte ~ line 20 ~ pathFragment`, pathFragment);
	// // $: path.split("/")
	// $: console.log(`🚀 ~ file: MainUI.svelte ~ line 19 ~ path.split("/")`, path.split('/')[2]);
	// $: console.log(`🚀 ~ file: MainUI.svelte ~ line 19 ~ path.length`, path.length);
	// $: console.log(`🚀 ~ file: MainUI.svelte ~ line 19 ~ path.split("/")`, path.split('/')[1]);
	$: console.log(
		`🚀 ~ file: MainUI.svelte ~ line 28 ~ serverId *********************************************`,
		serverId
	);
    let idx
    $: servers ? idx = servers.findIndex((s) => s.id === serverId) : false
	onMount(async () => {
		servers = await D.readServers('discordDummyData');
		console.log(`🚀 ~ file: MainUI.svelte ~ line 22 ~ onMount ~ servers`, servers);
		if (!servers) {
			servers = await D.generateServers(15);
		}
		// let serverIdInPath = path.split('/')[2];
		if (serverId !== "home") {
            console.log(`🚀 ~ file: MainUI.svelte ~ line 40 ~ onMount ~ serverId`, serverId)
			let idx = servers.findIndex((s) => s.id === serverId);
			console.log(`🚀 ~ file: MainUI.svelte ~ line 37 ~ onMount ~ idx @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ `, idx);
			channels = servers[idx].channels;
		} else {
			channels = servers[0].channels;
		}
		servers.forEach((serv) => {
			// console.log(`🚀 ~ file: MainUI.svelte ~ line 28 ~ onMount ~ serv`, serv)
			if (serv.channels.length < 1) {
				channels = D.generateChannels(serv.id);
			}
		});
		mounted = true;
	});

	$: servers, channels, messages;
	$: console.log(`🚀 ~ file: MainUI.svelte ~ line 32 ~ servers`, servers);
	import Discord from '~icons/my-icons/discord';
	import Server from './Server.svelte';
import Channel from './Channel.svelte';
</script>

{#if mounted}
	<div class="flex flex-row text-white h-screen w-full">
		<div class="bg-gray-800 p-3 space-y-2 overflow-y-scroll">
			<!-- <a
				href="/egghead-discord"
				class="{path === '/egghead-discord'
					? 'bg-blue-500 text-white rounded-2xl'
					: 'text-gray-100 rounded-3xl bg-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-200 rounded-3xl hover:rounded-2xl'} w-12 h-12 flex items-center justify-center "
			>
				<Discord class="w-7 h-5 " />
			</a> -->


			{#if servers}
				{#each servers as s}
					<Server serverId={s.id} />
				{/each}
			{/if}
		</div>
		<div class="bg-gray-800 w-60 flex flex-col">
			<div class="px-3 h-12 shadow-md flex flex-shrink-0 items-center font-fira">Channels</div>
			<div class="flex flex-col overflow-y-scroll ">
				<!-- {#if channels} -->
				{#each servers[idx].channels as channel}
					<!-- content here -->
                    <Channel {serverId} channelId={channel.id} />
					<!-- <div class="bg-blue-900 p-3 flex-1">{channel.id}</div> -->
				{/each}
				<!-- {/if} -->
			</div>
		</div>
		<div class="flex flex-1 flex-col">
			<div class="p-3 h-12 shadow-md bg-gray-800 flex font-fira">Messages</div>
			<div class="p-3 bg-gray-700 bg-opacity-80 flex-1 space-y-4 overflow-y-scroll h-full">
				{#if messages}
					{#each messages as message}
						<p class="w-full text-2xl">{message}</p>
					{/each}
				{/if}
			</div>
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
    @apply bg-gray-800
}

*::-webkit-scrollbar-thumb {
//   background-color: orange;
  border-radius: 2rem;
  @apply border-4 border-sky-800 bg-sky-600;
//   border: 5px solid teal;
}
</style>