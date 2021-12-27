<script>
	export let serverId, servers, channels, messages, path;
	console.log(`🚀 ~ file: Server.svelte ~ line 3 ~ serverId`, serverId);
</script>

<a href="/egghead-discord/{serverId}" class="relative space-y-2 block group">
	<div class="absolute -left-3 h-full flex items-center">
		<div class="bg-white w-1 h-5 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200
		{path === `/egghead-discord/${serverId}` 
		? '' 
		: ''} 
		" ></div>
	</div>
	<div
		class=" w-12 h-12 flex items-center justify-center 
		{path === `/egghead-discord/${serverId}`
			? 'bg-blue-500 text-white rounded-2xl'
			: 'text-gray-100 rounded-3xl bg-gray-600 group-hover:bg-blue-500 group-hover:text-white transition-all duration-200 rounded-3xl group-hover:rounded-2xl'}
			">
		{serverId}
	</div>
</a>
