<script context="module">
	export const load = async ({ page: { params } }) => {
		const { serverId, channelId } = params;
		return { props: { serverId, channelId } };
	};
</script>

<script>
	export let serverId, channelId;
	import MainUi from '../../MainUI.svelte';
	import { page } from '$app/stores';
	$: path = $page.path;
	import { onMount } from 'svelte';
	// import { D } from '$stores/discord.js';

	let serversLS, channelsLS, messagesLS;
	let existingServerList = false;
	let mounted = false;
	$: if (serversLS) {
		existingServerList = true;
	}
	onMount(() => {
	});
</script>

<MainUi {serverId} {channelId} />
