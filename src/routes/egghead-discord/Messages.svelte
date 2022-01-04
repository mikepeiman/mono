<script>
	export let serverId, channelId;
	// console.log(`🚀 ~ file: Messages.svelte ~ line 4 ~ messages`, messages)
	import { page } from '$app/stores';
	import faker from 'faker';
	import random from 'canvas-sketch-util/random.js';
	import Time from 'svelte-time';
	import { D } from '$stores/discord.js';
	import { onMount, beforeUpdate, afterUpdate } from 'svelte';
	$: params = $page.params;
	$: channelId = params.channelId;
	$: serverId = params.serverId;
	let messages;
	$: console.log(`🚀 ~ file: Messages.svelte ~ line 12 ~ params`, params);
	// $: mounted ? messages = getMessages() : false
	$: console.log(`🚀 ~ file: Messages.svelte ~ line 17 ~ channel`, channel);
	let discordData, channel;
	// beforeUpdate(() => {
	// 	discordData = D.load();
	// 	// messages = D.generateMessages(serverId, channelId);
	// 	getThisChannelFromId()
	// 	getMessagesFromChannel()
	// });
	$: channel ? (messages = channel.messages) : [];
	let mounted = false;
	let dataNeedsReload = false;
	$: console.log(`🚀 ~ file: Messages.svelte ~ line 25 ~ dataNeedsReload`, dataNeedsReload);
	$: console.log(`🚀 ~ file: Messages.svelte ~ line 28 ~ channel`, channel);

	onMount(() => {
		console.log('%c⧭', 'color: #00a3cc', onMount);
		discordData = D.load();
		getThisChannelFromId();
		dataNeedsReload ? (discordData = D.load()) : false;
		// channel ? getMessagesFromChannel() : false
		mounted = true;
	});

	afterUpdate(() => {
		console.log('%c⧭', 'color: #aa00ff', afterUpdate);
		discordData = D.load();
		getThisChannelFromId();
	});

	async function getThisChannelFromId() {
		let serverIndex = discordData.findIndex((s) => s.id === serverId);
		let server = discordData[serverIndex];
		server.channels.forEach(async (channelGroup) => {
			// console.log(`🚀 ~ file: index.svelte ~ line 37 ~ onMount ~ channelGroup`, channelGroup)
			// return channelGroup.channels.filter(c => channel.id === channelId)
			channelGroup.channels.forEach(async (channel) => {
				// console.log(`🚀 ~ file: index.svelte ~ line 39 ~ onMount ~ channelId ${channelId} ::: `, channel.name)
				if (channel.id === channelId) {
					console.log(
						`%c@@@@@@@@@@@@@@@@ CHANNEL ${channel.name} @@@@@@@@@@@@@@@@@@@`,
						'color:#0033ff; font-size: 1rem;',
						channel
					);
					messages = channel.messages;
					console.log(`?????????????????????? channel.messages ::::   `, channel.messages);
					// if (messages.length < 1) {
					// 	messages = await D.generateMessages(serverId, channelId);
					// 	console.log(
					// 		`************************************* after generateMessages,  messages ::::  `,
					// 		messages
					// 	);
					// }
					// // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! MATCH !!!!!!!!!!!!!!!!!!!!!!!!!!!!')
					// messages = channel.messages;
					// console.log(
					// 	`************************************* after reassignment,  messages ::::  `,
					// 	messages
					// );
					// return channel.messages
				}
			});
		});
	}

	function getMessagesFromChannel() {
		if (channel.messages.length < 1) {
			discordData = D.load();
			getThisChannelFromId();
			console.log(
				`🚀 ~ file: Messages.svelte ~ line 16 ~ getMessages ~ NO MESSAGES!!! `,
				channel.messages
			);
			return;
			// D.generateMessages(server.id, channelGroup.id);
		} else {
			console.log(
				`🚀 ~ file: Messages.svelte ~ line 16 ~ getMessages ~ YES MESSAGES!!! `,
				channel.messages
			);
			messages = channel.messages;
			// channel[0].messages = messages = D.loadMessages()
			// messages.sort(
			// 	(a, b) => new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime()
			// );
		}
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
