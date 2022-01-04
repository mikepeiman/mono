<script>
	export let serverIndex, channelIndex, servers, channels, messages;
	// console.log(`🚀 ~ file: Messages.svelte ~ line 4 ~ messages`, messages)
	import { page } from '$app/stores';
	import faker from 'faker';
	import random from 'canvas-sketch-util/random.js';
	import Time from 'svelte-time';
	import { D } from '$stores/discord.js';

	$: params = $page.params;
	$: channelId = params.channelId;
	$: console.log(`🚀 ~ file: Messages.svelte ~ line 12 ~ params`, params);
	let channel;
	function getMessages() {
		if (channel[0].messages.length < 1) {
            console.log(`🚀 ~ file: Messages.svelte ~ line 16 ~ getMessages ~ channel[0].messages`, channel[0].messages)
			return
			// D.generateMessages(server.id, channelGroup.id);
		} else {
			
			// channel[0].messages = messages = D.loadMessages()
            console.log(`🚀 ~ file: Messages.svelte ~ line 22 ~ getMessages ~ channel[0]`, channel[0])
			// messages.sort(
			// 	(a, b) => new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime()
			// );
		}
		// channels.forEach(async (chan) => {
		// 	chan['channels'].forEach(async (subChannel) => {
		// 		// console.log(`🚀 ~ file: MainUI.svelte ~ line 31 ~ chan['channels'].forEach ~ subChannel`, subChannel)
		// 		if (subChannel.messages.length < 1) {
		// 			messages = await D.generateMessages(server.id, chan.id);
		// 		}
		// 	});
		// });
	}

	function matchChannelGroup() {
		// console.log(`🚀 ~ file: Messages.svelte ~ line 48 ~ channelId`, channelId)
		server.channels.forEach((channelGroup) => {
			// console.log(`🚀 ~ file: Messages.svelte ~ line 26 ~ server.channels.forEach ~ channelGroup`, channelGroup)
			// console.log(`🚀 ~ file: Messages.svelte ~ line 37 ~ channelGroup.channels.forEach ~ channelGroup.channels`, channelGroup.channels)
			if (channelId.includes(channelGroup.id)) {
				channel = channelGroup.channels.filter((c) => c.id === channelId);
			}
			// console.log(`🚀 ~ file: Messages.svelte ~ line 26 ~ server.channels.forEach ~ channelGroup`, channelGroup)
			// console.log(`🚀 ~ file: Messages.svelte ~ line 37 ~ channelGroup.channels.forEach ~ channelGroup.channels`, channelGroup.channels)
			channelGroup.channels.forEach(async (channel) => {
				// console.log(`🚀 ~ file: MainUI.svelte ~ line 31 ~ chan['channels'].forEach ~ channel`, channel)
				if (channel.messages.length < 1) {
					console.log(
						`🚀 ~ file: Messages.svelte ~ line 37 ~ channelGroup.channels.forEach ~ channel.messages.length < 1`,
						channel.messages.length < 1
					);
					D.generateMessages(server.id, channelGroup.id);
					// messages = D.loadMessages(server.id, channelGroup.id, channelId)
				}
			});
		});
		// generateMessages();
	}
	// let messages;
	// $: server = servers[serverIndex];
	// $: server && channelId ? matchChannelGroup() : false;
	// $: serverId = server.id
	// $: console.log(`🚀 ~ file: Messages.svelte ~ line 9 ~ server`, server);
	// channel;
	// $: console.log(`🚀 ~ file: Messages.svelte ~ line 25 ~ channel ${new Date().getSeconds()}`, channel);
	// $: channel ? (messages = getMessages()) : false;
	// $: messages ? (messages = messages) : false;
	// $: console.log(`🚀 ~ file: Messages.svelte ~ line 56 ~ messages`, messages);
</script>

<div class="p-3 h-12 shadow-md shadow-gray-900 z-10 bg-gray-800 flex font-fira">Messages</div>
<div class="p-3 bg-gray-750  flex-1 space-y-4 overflow-y-scroll h-full">
	{#if messages}
		{#each messages as message}
			<a href={message.id}>
				<div class="flex mb-[17px]">
					{#if message.avatar}
						<img src={message.avatar} class="w-10 h-10 rounded-[40px] ml-1 mr-4" />
					{/if}
					<div class="flex flex-col pl-18 -ml-18">
						<div class="flex">
							<p class="text-amber-600 font-bold">{message.username}</p>
							<!-- Date: {new Date(message.datePosted).getTime()} -->
							{#if message.datePosted}
								<div class="pl-2 text-gray-500 text-sm font-medium self-center flex ">
									<Time timestamp={message.datePosted} />
								</div>
							{/if}
						</div>
						<p class="w-full text-base font-light">{message.message}</p>
					</div>
				</div>
			</a>
		{/each}
	{/if}
</div>
