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

	let discordData, messages;
	// beforeUpdate(() => {
	// 	discordData = D.load();
	// 	// messages = D.generateMessages(serverId, channelId);
	// 	getThisChannelFromId();
	// });

	// onMount(() => {
	// 	discordData = D.load();
	// 	getThisChannelFromId()

	// })

	afterUpdate(() => {
		discordData = D.load();
		getThisChannelFromId();
	});
	// $: channel
	// 	? console.log(`$$$$$$$$$$$$$$$$$$$   ${channel.name}   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$`)
	// 	: {};

	async function getThisChannelFromId() {
		let serverIndex = discordData.findIndex((s) => s.id === serverId);
		let server = discordData[serverIndex];
		server.channels.forEach(async (channelGroup) => {
			// console.log(`🚀 ~ file: index.svelte ~ line 37 ~ onMount ~ channelGroup`, channelGroup)
			// return channelGroup.channels.filter(c => channel.id === channelId)
			channelGroup.channels.forEach(async (channel) => {
				// console.log(`🚀 ~ file: index.svelte ~ line 39 ~ onMount ~ channelId ${channelId} ::: `, channel.name)
				if (channel.id === channelId) {
					// console.log(`@@@@@@@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@`, channel);
					console.log(
						`%c@@@@@@@@@@@@@@@@ CHANNEL ${channel.name} @@@@@@@@@@@@@@@@@@@`,
						'color:#aa33cc; font-size: 1rem;',
						channel
					);
					messages = channel.messages;
					console.log(`?????????????????????? channel.messages ::::   `, channel.messages);
					if (messages.length < 1) {
						messages = await D.generateMessages(serverId, channelId);
					}
				}
			});
		});
	}
</script>

<!-- {#await messages} -->
<MainUi {serverId} {channelId} />
<!-- {/await} -->
