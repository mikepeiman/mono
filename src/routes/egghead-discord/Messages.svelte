<script>
	export let serverIndex, channelIndex, servers, channels, messages;
	import { page } from '$app/stores';
	$: params = $page.params;
	$: channelId = params.channelId;
	let channel

	function matchChannelGroup() {
		server.channels.forEach((channelGroup) => {
            if (channelId.includes(channelGroup.id)) {
                channel = channelGroup.channels.filter(c => c.id === channelId)
            }
            
        })
    }



	$: server && channelId ? matchChannelGroup() : false;
	$: server = servers[serverIndex];
	$: console.log(`🚀 ~ file: Messages.svelte ~ line 9 ~ server`, server);
	$: channel ? (messages = channel[0].messages) : false;
</script>

<div class="p-3 h-12 shadow-md shadow-gray-900 z-10 bg-gray-800 flex font-fira">Messages</div>
<div class="p-3 bg-gray-750  flex-1 space-y-4 overflow-y-scroll h-full">
	{#if messages}
		{#each messages as message}
			<p class="w-full text-xl">{message}</p>
		{/each}
	{/if}
</div>
