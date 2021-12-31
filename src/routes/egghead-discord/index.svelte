<script>
	import { onMount } from 'svelte';

	let serverId = "home"

	// onMount(() => {
	// 	mounted = true;
	// });

	import { page } from '$app/stores';
	import MainUi from './MainUI.svelte';
	$: path = $page.path;
	$: console.log(`🚀 ~ file: __layout.svelte ~ line 46 ~ path`, path);
</script>

	<MainUi  {serverId} />

