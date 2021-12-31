<script>
	export let servers, serverIndex;
	import Channel from './Channel.svelte';
	import IconBadgeCheck from '~icons/bx/bxs-badge-check';
	import IconChevronDown from '~icons/mdi/chevron-down';
	import IconChevronDownBx from '~icons/bx/bx-chevron-down';
	import IconChevronDownBxs from '~icons/bx/bxs-chevron-down';
	import IconChevronRightBxs from '~icons/bx/bxs-chevron-right';
	import IconChevronDownAkar from '~icons/akar-icons/chevron-down';
	import IconChevronRight from '~icons/mdi/chevron-right';
	import IconPlaylistCheck from '~icons/gg/play-list-check'; //gg:play-list-check
	import IconBookBookmark from '~icons/bx/bx-book-bookmark';
	import IconCalendarEvent from '~icons/bx/bxs-calendar-event';
	import IconBullhorn from '~icons/whh/bullhorn';
	import IconPersonPlus from '~icons/bi/person-plus-fill';
	import tooltip from '$utils/tooltip.js';
	import { onMount } from 'svelte';
	// console.log(`🚀 ~ file: Channels.svelte ~ line 11 ~ tooltip`, tooltip);
	// import tippy from 'tippy.js';
	// import 'tippy.js/dist/tippy.css';
	let server;
	$: servers ? (server = servers[serverIndex].name) : false;
	console.log(`🚀 ~ file: Channels.svelte ~ line 5 ~ servers`, servers);

	import tippy, { animateFill } from 'tippy.js';
	import 'tippy.js/dist/backdrop.css';
	import 'tippy.js/animations/shift-away.css';
	let targets;
	onMount(() => {
		targets = document.getElementsByClassName('tooltip');
		// tippy(document.querySelectorAll('.tooltip'), {
		// 	animateFill: true,
		// 	plugins: [animateFill]
		// });
	});
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
		<div
			class="flex group relative text-gray-500 items-center py-[6px] px-2 ml-2  hover:bg-gray-500/[0.16] hover:rounded-l"
		>
			<IconCalendarEvent class="w-5 h-5" />
			<div class="pl-2 font-bold font-cairo">events</div>
			<div
				class="opacity-0 group-hover:opacity-50 flex align-center absolute top-0 right-0 mt-[10px] mr-2"
			>
				<IconPersonPlus class="text-sky-300 opacity-1 w-4 h-4" />
			</div>
		</div>
		<div
			class="flex group relative text-gray-500 items-center py-[6px] px-2 ml-2  hover:bg-gray-500/[0.16] hover:rounded-l"
		>
			<IconBookBookmark class="w-5 h-5" />
			<div class="pl-2 font-bold font-cairo">welcome</div>
			<div
				class="opacity-0 group-hover:opacity-50 flex align-center absolute top-0 right-0 mt-[10px] mr-2"
			>
				<IconPersonPlus class="text-sky-300 opacity-1 w-4 h-4" />
			</div>
		</div>
		<div
			class="flex group relative text-gray-500 items-center py-[6px] px-2 ml-2  hover:bg-gray-500/[0.16] hover:rounded-l"
		>
			<IconBullhorn class="w-5 h-5" />
			<div class="pl-2 font-bold font-cairo">announcements</div>
			<div
				class="tooltip fill-gray-300 opacity-0 group-hover:opacity-50 flex align-center absolute top-0 right-0 mt-[10px] mr-2"
				use:tooltip
				theme="tomato"
				title="Tooltip here"
			>
				<IconPersonPlus class="text-sky-300 hover:text-sky-400 hover:opacity-100 w-4 h-4" />
			</div>
		</div>
	</div>
	{#each servers[serverIndex].channels as channelGroup}
	<div class="mt-[21px] mb-1">
		<button class="flex items-center px-0 5 text-xs uppercase  font-bold text-gray-500">
			<IconChevronDownBxs class="w-3 h-3 ml-[2px] mr-0.5" />
			<div class="font-body tracking-wide">{channelGroup.name}</div>
		</button>
	</div>
	{#each channelGroup.channels as channel}
		 <!-- content here -->
		 <Channel serverId={servers[serverIndex].id} channelId={channel.id} channelName={channel.name} />
	{/each}
		<!-- <div class="bg-sky-900 p-3 flex-1">{channel.id}</div> -->
	{/each}
	<!-- {/if} -->
</div>

<style lang="scss">
	:global(.tippy-box) {
		background-color: black;
	}
	:global(.tooltip.tooltip-open:after) {
		display: none;
		opacity: 0;
	}
	:global(.tippy-backdrop) {
		background-color: rgba(0, 0, 0, 0);
		opacity: 0;
		z-index: -1;
		&:after {
			opacity: 0;
		}
		&:before {
			opacity: 0;
		}
	}
	:global(.tippy-box > .tippy-arrow:before) {
		border-top-color: black;
	}
	:global(.tippy-arrow) {
		color: var(--color-deepreds-900);
		color: black;
	}

	:global(.tooltip.tooltip-open:after, .tooltip.tooltip-open:before, .tooltip:hover:after, .tooltip:hover:before) {
		opacity: 0;
		transition-delay: 0;
	}

    // scrollbar styles
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
