<script context="module">
	export const load = async ({ page: { params } }) => {
		const { serverId, channelId } = params;

		return { props: { serverId, channelId } };
	};
</script>

<script>
	export let serverId, channelId;
	import { D } from '$stores/discord.js';
	import MainUi from '../../MainUI.svelte';
	import { page } from '$app/stores';
	$: path = $page.path;
	import { onMount, beforeUpdate, afterUpdate } from 'svelte';

	let discordData, messages, channel;
	beforeUpdate(() => {
		discordData = D.load();
		getThisChannelFromId()
	});
	
	onMount(() => {
		discordData = D.load();
		getThisChannelFromId()

	})

	// afterUpdate(() => {
	// 	discordData = D.load();
	// 	getThisChannelFromId();
	// });
	$: channel
		? console.log(`$$$$$$$$$$$$$$$$$$$   ${channel.name}   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$`)
		: {};

	function getThisChannelFromId() {
		let serverIndex = discordData.findIndex((s) => s.id === serverId);
		let server = discordData[serverIndex];
		server.channels.forEach((channelGroup) => {
			// console.log(`🚀 ~ file: index.svelte ~ line 37 ~ onMount ~ channelGroup`, channelGroup)
			// return channelGroup.channels.filter(c => c.id === channelId)
			channelGroup.channels.forEach(c => {
				// console.log(`🚀 ~ file: index.svelte ~ line 39 ~ onMount ~ channelId ${channelId} ::: `, channel.name)
				if (c.id === channelId) {
					channel = c;
					console.log(`@@@@@@@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@`, c);
					console.log(`@@@@@@@@@@@@@@@@   ${c.name}    @@@@@@@@@@@@@@@@@@@`);
					messages = c.messages;
					console.log(`?????????????????????? channel.messages ::::   `, c.messages);
					if (messages.length < 1) {
						messages = D.generateMessages(serverId, channelId);
						console.log(
							`************************************* after generateMessages,  messages ::::  `,
							messages
						);
					}
					// console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! MATCH !!!!!!!!!!!!!!!!!!!!!!!!!!!!')
					// messages = c.messages
					// return c.messages
				}
			});
		});
	}
</script>

<!-- {#await messages} -->
<MainUi {serverId} {channelId} {messages} />
<!-- {/await} -->
