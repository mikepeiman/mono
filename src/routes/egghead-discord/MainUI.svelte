<script>
	export let path;

	import random from 'canvas-sketch-util/random.js';
	import math from 'canvas-sketch-util/math.js';
	import Color from 'canvas-sketch-util/color.js';
	import { LoremIpsum } from 'lorem-ipsum';
	import SvgIcon from '$components/SvgIcon.svelte';
	import { onMount } from 'svelte';
	import { D, channelsStore, messagesStore } from '$stores/discord.js';
    let servers, channels, messages
	let serversLS, channelsLS, messagesLS;
	let existingServerList = false;
	let mounted = false;
	$: if (serversLS) {
		existingServerList = true;
	}
	let ddd;
	onMount(async () => {
		servers = D.readServers();
		console.log(`🚀 ~ file: MainUI.svelte ~ line 22 ~ onMount ~ servers`, servers);
		if (!servers) {
			servers = await D.generateServers(15);
		}
        servers.forEach(serv => {
            
            console.log(`🚀 ~ file: MainUI.svelte ~ line 28 ~ onMount ~ serv`, serv)
        });
        mounted = true
	});

	$: servers;
	$: console.log(`🚀 ~ file: MainUI.svelte ~ line 32 ~ servers`, servers);
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
			<!-- {#each Object.values(ddd) as i}
            <p>{i.id}</p>
        {/each} -->
			{#if servers}
				{#each servers as s}
					<Server serverId={s.id} {path} />
				{/each}
			{/if}
		</div>
		<div class="bg-winterblues-100 w-60 flex flex-col">
			<div class="px-3 h-12 shadow-md flex flex-shrink-0 items-center font-fira">Header</div>
			<div class="flex flex-col overflow-y-scroll">
				{#if channels}
					{#each channels as item}
						<!-- content here -->
						<div class="bg-blue-900 p-3 flex-1">{item}</div>
					{/each}
				{/if}
			</div>
		</div>
		<div class="flex flex-1 flex-col">
			<div class="p-3 h-12 shadow-md bg-electricindigo-800 flex font-fira">Main</div>
			<div class="p-3 bg-electricindigo-700  flex-1 space-y-4 overflow-y-scroll">
				{#if messages}
					{#each messages as message}
						<p class="w-full text-2xl">{message}</p>
					{/each}
				{/if}
			</div>
		</div>
	</div>
{/if}
