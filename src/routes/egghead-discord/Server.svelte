<script>
	export let serverId, path;

</script>

<a
	href="/egghead-discord/{serverId}"
	class="{path === `/egghead-discord/${serverId}`
		? 'bg-blue-500 text-white rounded-2xl'
		: 'text-gray-100 rounded-3xl bg-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-200 rounded-3xl hover:rounded-2xl'} w-12 h-12 flex items-center justify-center "
>
	{serverId}
</a>
