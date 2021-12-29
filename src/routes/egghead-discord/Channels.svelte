<script>
	import Channel from './Channel.svelte';

	export let servers, serverIndex;
    console.log(`🚀 ~ file: Channels.svelte ~ line 5 ~ servers`, servers)
</script>

<div class="px-3 h-12 shadow-sm z-10 shadow-gray-900 flex flex-shrink-0 items-center font-fira">
	Channels
</div>
<div class="flex flex-col overflow-y-scroll h-full">
	<!-- {#if channels} -->
	{#each servers[serverIndex].channels as channel}
		<!-- content here -->

		<Channel serverId={servers[serverIndex].id} channelId={channel.id} />
		<!-- <div class="bg-blue-900 p-3 flex-1">{channel.id}</div> -->
	{/each}
	<!-- {/if} -->
</div>


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
