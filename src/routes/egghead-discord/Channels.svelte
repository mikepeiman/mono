<script>
	import Channel from './Channel.svelte';
	import IconBadgeCheck from '~icons/bx/bxs-badge-check';
	import IconChevronDown from '~icons/mdi/chevron-down';

	export let servers, serverIndex;

	let server;
	$: servers ? (server = servers[serverIndex].id) : false;
	console.log(`🚀 ~ file: Channels.svelte ~ line 5 ~ servers`, servers);
</script>

<div class="bg-gray-800  shadow-sm z-10 shadow-gray-900 hover:bg-gray-700/[0.16]">
	<div
		class="px-3 h-12 flex flex-shrink-0 items-center font-fira "
	>
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
