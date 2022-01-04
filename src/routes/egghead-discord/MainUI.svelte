<script>
	import { page } from '$app/stores';
	$: path = $page.path;
	export let serverId, channelId;
	import { onMount } from 'svelte';
	import { D } from '$stores/discord.js';
	let servers, channels, messages;
	let mounted = false;
	let serverIndex;
	$: servers ? (serverIndex = servers.findIndex((s) => s.id === serverId)) : false;
	let channelIndex;
	$: channels ? (channelIndex = channels.findIndex((c) => c.id === channelId)) : false;
	onMount(async () => {
		servers = await D.readServers('discordDummyData');
		if (!servers) {
			servers = await D.generateServers(30);
		}
		if (serverId !== 'home') {
			let serverIndex = servers.findIndex((s) => s.id === serverId);
			channels = servers[serverIndex].channels;
		} else {
			channels = servers[0].channels;
		}
		servers.forEach(async (serv) => {
			if (serv.channels.length < 1 && serv.id) {
				channels = await D.generateChannels(serv.id);
			}
		});

		mounted = true;
	});

	$: servers, channels, messages;
	import Server from './Server.svelte';
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
