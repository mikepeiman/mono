<script>
	import Channel from './Channel.svelte';

	export let servers, serverIndex;
    console.log(`🚀 ~ file: Channels.svelte ~ line 5 ~ servers`, servers)
</script>

<div class="px-3 h-12 shadow-sm z-10 shadow-gray-900 flex flex-shrink-0 items-center font-fira">
	Channels
</div>
<div class="flex flex-col overflow-y-scroll ">
	<!-- {#if channels} -->
	{#each servers[serverIndex].channels as channel}
		<!-- content here -->

		<Channel serverId={servers[serverIndex].id} channelId={channel.id} />
		<!-- <div class="bg-blue-900 p-3 flex-1">{channel.id}</div> -->
	{/each}
	<!-- {/if} -->
</div>
