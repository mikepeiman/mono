<script>
	export let serverIndex, channelIndex, servers, channels;
	// console.log(`🚀 ~ file: Messages.svelte ~ line 4 ~ messages`, messages)
	import { page } from '$app/stores';
	import faker from 'faker';
	import random from 'canvas-sketch-util/random.js';
	import Time from 'svelte-time';

	$: params = $page.params;
	$: channelId = params.channelId;
	let channel;

	function matchChannelGroup() {
		server.channels.forEach((channelGroup) => {
			if (channelId.includes(channelGroup.id)) {
				channel = channelGroup.channels.filter((c) => c.id === channelId);
			}
		});
	}
	let messages, date
	$: date = new Date()
    $: console.log(`🚀 ~ file: Messages.svelte ~ line 22 ~ date`, date)
	$: console.log(faker.date.recent(parseInt(random.range(0, 30)).toString(), date));
	$: console.log(`"${parseInt(random.range(0, 30)).toString()}"`);
	$: console.log(`Date.now()  ---  `,Date.now());
	$: console.log(faker.date.recent());
	$: server && channelId ? matchChannelGroup() : false;
	$: server = servers[serverIndex];
	$: console.log(`🚀 ~ file: Messages.svelte ~ line 9 ~ server`, server);
	$: channel ? (messages = channel[0].messages.sort((a,b )=> new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime() )) : false;
</script>

<div class="p-3 h-12 shadow-md shadow-gray-900 z-10 bg-gray-800 flex font-fira">Messages</div>
<div class="p-3 bg-gray-750  flex-1 space-y-4 overflow-y-scroll h-full">
	{#if messages}
		{#each messages as message}
			<div class="flex">
				{#if message.avatar}
					<img src={message.avatar} class="w-10 h-10 rounded-[40px]" />
				{/if}
				<p>{message.username}</p>
				<!-- Date: {new Date(message.datePosted).getTime()} -->
				{#if message.datePosted}
				<Time timestamp={message.datePosted} />
				{/if}
			</div>
			<p class="w-full text-xl">{message.message}</p>
		{/each}
	{/if}
</div>
