<script>
	export let serverIndex, channelIndex, servers, channels, messages;
	import { page } from '$app/stores';
	$: path = $page.path;
	$: params = $page.params;
	$: channelId = params.channelId;
	$: console.log(`🚀 ~ file: Messages.svelte ~ line 7 ~ channelId`, channelId);
	let channel
	// $: server = servers[params.serverId]
	$: console.log(`🚀 ~ file: Messages.svelte ~ line 7 ~ server`, server);
	// $: params = $page.params;
	// $:console.log(`🚀 ~ file: Messages.svelte ~ line 6 ~ path`, path);
	// $: console.log(`🚀 ~ file: Messages.svelte ~ line 7 ~  $page`,  $page)
	$: console.log(`🚀 ~ file: Messages.svelte ~ line 8 ~ params`, params);

    let thisGroup
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
	$: channelGroups = server.channels;
	// $: thisGroup = channelGroups.map((c) => c['id'].includes(params.channelId));
	$: console.log(`🚀 ~ file: Messages.svelte ~ line 29 ~ thisGroup`, thisGroup);
	$: console.log(`🚀 ~ file: Messages.svelte ~ line 27 ~ channelGroups`, channelGroups);
	// $: channel = thisGroup.channels.filter(c => c.id === channelId)
	$: console.log(`🚀 ~ file: Messages.svelte ~ line 11 ~ channel`, channel);
	$: channel ? (messages = channel[0].messages) : false;
	$: console.log(`🚀 ~ file: Messages.svelte ~ line 6 ~ messages`, messages);
</script>

<div class="p-3 h-12 shadow-md shadow-gray-900 z-10 bg-gray-800 flex font-fira">Messages</div>
<div class="p-3 bg-gray-750  flex-1 space-y-4 overflow-y-scroll h-full">
	{#if messages}
		{#each messages as message}
			<p class="w-full text-2xl">{message}</p>
		{/each}
	{/if}
</div>
