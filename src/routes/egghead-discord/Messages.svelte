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
	let thisChannel = { name: 'Messages', description: 'This is a cool channel' };

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
		chatHeroicons: 'heroicons-solid:chat-alt',
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
		peopleBaseline: 'ic:baseline-people-alt',
		peopleBi: 'bi:people-fill',
		inbox: 'bi:inbox-fill',
		questionCircle: 'bi:question-circle-fill',
		search: 'fe:search'
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

<div class="flex flex-col flex-1 shrink min-w-0">
	<div class="flex items-center min-w-0 h-12 shadow-md p-3  shadow-gray-900 z-10 bg-gray-800 font-fira">
		<div class="flex items-center min-w-0">
			<Icon icon={headerIcons.hashtag} class="h-5 w-5 shrink-0 text-sky-700 mr-1" />
			<span class="whitespace-nowrap ">{thisChannel.name.toLowerCase()}</span>
		</div>
		<div class="flex items-center justify-center w-4 bg-gray-800">
			<div class="w-px h-6 z-10 bg-sky-700" />
		</div>
		<div class="flex flex-1 items-center -mb-0.5 text-sm font-medium truncate">
			{thisChannel.description}
		</div>
		<div class="flex items-center ml-auto  bg-gray-800">
			<button class="text-gray-400 hover:text-sky-700">
				<div class="relative w-6 h-6 -mt-2 mx-2">
					<Icon icon={headerIcons.hashtag} class="absolute mt-0.5 w-7 h-7 font-thin " />
					<Icon
						class="absolute mt-0.5 font-thin h-3.5 w-3.5  z-10 left-3.5 -bottom-[5px] bg-gray-800 rounded-sm "
						icon={headerIcons.chatHeroicons}
					/>
				</div>
			</button>
			<button class="text-gray-400 hover:text-sky-700">
				<Icon icon={headerIcons.bell} class="w-6 h-6 mx-2" />
			</button>
			<button class="text-gray-400 hover:text-sky-700">
				<Icon icon={headerIcons.pin} class="w-6 h-6 mx-2" />
			</button>
			<button class="text-gray-400 hover:text-sky-700">
				<Icon icon={headerIcons.peopleBi} class="w-6 h-6 mx-2" />
			</button>
			<div class="relative mx-2 w-auto">
				<input
					type="text"
					class="bg-gray-900 border-none rounded-sm h-6 w-36 px-1.5"
					placeholder="Search"
				/>
				<div class="absolute right-0 flex items-center inset-y-0">
					<Icon icon={headerIcons.search} class="w-4 h-4 mr-1.5 text-gray-500" />
				</div>
			</div>
			<button class="text-gray-400 hover:text-sky-700">
				<Icon icon={headerIcons.inbox} class="w-6 h-6 mx-2" />
			</button>
			<button class="text-gray-400 hover:text-sky-700">
				<Icon icon={headerIcons.questionCircle} class="w-5 h-5 mx-2" />
			</button>
		</div>
	</div>
	<div class="p-3 bg-gray-750 flex-1 flex-shrink min-w-0 space-y-4 overflow-y-scroll h-full">
		{#if messages}
			{#each messages as message}
				<a href={message.id} class="flex shrink flex-shrink min-w-0">
					<div class="flex flex-shrink min-w-0">
						{#if message.avatar}
							<img src={message.avatar} class="w-10 h-10 rounded-[40px] ml-1 mr-4" />
						{/if}
						<div class="flex flex-col pl-18 pr-16 -ml-18">
							<div class="flex">
								<p class="text-amber-600 font-bold">{message.username}</p>
								<!-- Date: {new Date(message.datePosted).getTime()} -->
								{#if message.datePosted}
									<div class="pl-2 text-gray-500 text-sm font-medium self-center flex ">
										<Time timestamp={message.datePosted} />
									</div>
								{/if}
							</div>
							<p class="flex-shrink min-w-0 text-base font-light">{message.message}</p>
						</div>
					</div>
				</a>
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	.toolbar {
		flex: 0 0 auto;
	}
</style>
