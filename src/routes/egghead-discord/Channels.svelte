<script>
	import Channel from './Channel.svelte';
	import IconBadgeCheck from '~icons/bx/bxs-badge-check';
	import IconChevronDown from '~icons/mdi/chevron-down';
	import IconPlaylistCheck from '~icons/gg/play-list-check'; //gg:play-list-check
	import IconBookBookmark from '~icons/bx/bx-book-bookmark';
	import IconBullhorn from '~icons/whh/bullhorn';
    import IconPersonPlus from '~icons/bi/person-plus-fill';
	export let servers, serverIndex;

	let server;
	$: servers ? (server = servers[serverIndex].id) : false;
	console.log(`🚀 ~ file: Channels.svelte ~ line 5 ~ servers`, servers);
</script>

<div class="bg-gray-800  shadow-sm z-10 shadow-gray-900 hover:bg-gray-700/[0.16]">
	<div class="px-3 h-12 flex flex-shrink-0 items-center font-fira ">
		<div class="icon-badge-check text-gray-600 relative flex items-center">
			<div class="bg-white absolute w-3 h-3 rounded-xl -z-10 left-[3px]" />
			<div class="mr-[2px]">
				<IconBadgeCheck />
			</div>
		</div>
		{server}
		<div class="ml-auto opacity-80">
			<IconChevronDown />
		</div>
	</div>
</div>
<div class="flex flex-col overflow-y-scroll h-full">
	<div class="header-icons mt-3">
		<div class="flex group relative text-gray-500 items-center py-[6px] px-2 ml-2  hover:bg-gray-500/[0.16] hover:rounded-l">
			<IconBookBookmark class="w-5 h-5" />
			<div class="pl-2 font-bold font-cairo">welcome</div>
            <div class="opacity-0 group-hover:opacity-50 flex align-center absolute top-0 right-0 mt-[10px] mr-2" >
                <IconPersonPlus
                class="text-blue-300 opacity-1 w-4 h-4"
                        />
            </div>
		</div>
		<div class="flex group relative text-gray-500 items-center py-[6px] px-2 ml-2  hover:bg-gray-500/[0.16] hover:rounded-l">
			<IconBullhorn class="w-5 h-5" />
			<div class="pl-2 font-bold font-cairo">announcements</div>
            <div class="opacity-0 group-hover:opacity-50 flex align-center absolute top-0 right-0 mt-[10px] mr-2" >
                <IconPersonPlus
                class="text-blue-300 opacity-1 w-4 h-4"
                        />
            </div>
		</div>

	</div>
	<!-- {#if channels} -->
	{#each servers[serverIndex].channels as channel}
		<!-- content here -->
		<Channel serverId={servers[serverIndex].id} channelId={channel.id} />
		<!-- <div class="bg-blue-900 p-3 flex-1">{channel.id}</div> -->
	{/each}
	<!-- {/if} -->
</div>

<style lang="scss">
	.icon-badge-check {
	}
	* {
		scrollbar-width: thin;
		scrollbar-color: blue orange;
	}

	/* Works on Chrome, Edge, and Safari */
	*::-webkit-scrollbar {
		width: 6px;
	}

	*::-webkit-scrollbar-track {
		@apply bg-gray-800;
	}

	*::-webkit-scrollbar-thumb {
		//   background-color: orange;
		border-radius: 2rem;
		@apply border-4 border-sky-800 bg-sky-600;
		//   border: 5px solid teal;
	}
</style>
