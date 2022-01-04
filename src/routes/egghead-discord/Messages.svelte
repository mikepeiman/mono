<script>
	export let serverId, channelId;
	// console.log(`🚀 ~ file: Messages.svelte ~ line 4 ~ messages`, messages)
	import { page } from '$app/stores';
	import faker from 'faker';
	import random from 'canvas-sketch-util/random.js';
	import Icon from '@iconify/svelte';
	import Discord from '~icons/my-icons/discord';
	import Time from 'svelte-time';
	import { D } from '$stores/discord.js';
	import { onMount, beforeUpdate, afterUpdate } from 'svelte';
	$: params = $page.params;
	$: channelId = params.channelId;
	$: serverId = params.serverId;
	let messages;
	$: console.log(`🚀 ~ file: Messages.svelte ~ line 12 ~ params`, params);
	// $: mounted ? messages = getMessages() : false
	let discordData;
	let thisChannel = { name: 'Messages' };

	// beforeUpdate(() => {
	// 	discordData = D.load();
	// 	// messages = D.generateMessages(serverId, channelId);
	// 	getThisChannelFromId()
	// 	getMessagesFromChannel()
	// });
	$: thisChannel ? (messages = thisChannel.messages) : [];
	let mounted = false;
	$: console.log(`🚀 ~ file: Messages.svelte ~ line 28 ~ thisChannel`, thisChannel);

	// onMount(() => {
	// 	console.log('%c⧭', 'color: #00a3cc', onMount);
	// 	discordData = D.load();
	// 	getThisChannelFromId();
	// 	dataNeedsReload ? (discordData = D.load()) : false;
	// 	// channel ? getMessagesFromChannel() : false
	// 	mounted = true;
	// });

	const headerIcons = {
		hashtag: 'line-md:hash-small',
		hashtagSpeechBubble: 'hashtagSpeechBubble',
		bell: 'bx:bxs-bell',
		bellOff: 'bx:bxs-bell-off',
		pin: 'bi:pin-angle-fill',
		chatDotsPh: 'ph:chat-dots-fill',
		chatAlertMdi: 'mdi:chat-alert',
		chatBaseline: 'ic:baseline-chat',
		chatHeroiconsSquares: 'heroicons-solid:chat',
		lockBx: 'bx:bxs-lock-alt',
		lockBxOpen: 'bx:bxs-lock-open-alt',
		lockFaOpen: 'fa-solid:lock-open',
		lockFa: 'fa-solid:lock',
		heartCardiogramFluent: 'fluent:heart-pulse-24-filled',
		heartCardiogram: 'healthicons:heart-cardiogram',
		documentPulse: 'fluent:document-heart-pulse-20-filled',
		heartCircle: 'bx:bxs-heart-circle',
		heartFilledAnt: 'ant-design:heart-filled',
		heartFilledFluent: 'fluent:heart-24-filled',
		homeHeart: 'bx:bx-home-heart',
		plugPhUnplugged: 'ph:plugs-bold',
		plugPhPlugged: 'ph:plugs-connected-bold',
		plugDisconnected: 'fluent:plug-disconnected-24-filled',
		plugConnected: 'fluent:plug-connected-20-filled',
		broadcast: 'ri:broadcast-fill',
		tooltipQuote: 'fluent:tooltip-quote-24-regular',
		toolsEntypo: 'entypo:tools',
		toolsFa: 'fa-solid:tools',
		people: 'fluent:people-community-16-filled',
		peopleAdd: 'fluent:people-community-add-20-filled',
		inbox: 'bi:inbox-fill',
		questionCircle: 'bi:question-circle-fill'
	};

	afterUpdate(() => {
		console.log('%c⧭', 'color: #aa00ff', 'afterUpdate()');
		discordData = D.load();
		if (channelId) {
			getThisChannelFromId();
		}
	});

	async function getThisChannelFromId() {
		let serverIndex = discordData.findIndex((s) => s.id === serverId);
		let server = discordData[serverIndex];
		server.channels.forEach(async (channelGroup) => {
			channelGroup.channels.forEach(async (channel) => {
				if (channel.id === channelId) {
					// console.log(
					// 	`🚀 ~ file: Messages.svelte ~ line 56 ~ channelGroup.channels.forEach ~ channel.id === channelId`,
					// 	channel.id,
					// 	channelId
					// );
					// console.log(
					// 	`%c@@@@@@@@@@@@@@@@ CHANNEL ${channel.name} @@@@@@@@@@@@@@@@@@@`,
					// 	'color:#0033ff; font-size: 1rem;',
					// 	channel
					// );
					thisChannel = channel;
					messages = channel.messages;
					messages.sort(
						(a, b) => new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime()
					);
					// console.log(`?????????????????????? channel.messages ::::   `, channel.messages);
				}
			});
		});
		D.saveUpdated(discordData);
	}
</script>

<div class="p-3 h-12 shadow-md shadow-gray-900 z-10 bg-gray-800 flex font-fira">
	<Icon icon={headerIcons.hashtag} class="mt-0.5 h-5 w-5 text-gray-500 mr-1"	/>
	{thisChannel.name.toLowerCase()}
</div>
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
