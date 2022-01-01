<script>
	export let serverId, channelId, channel, channelName;
	import { page } from '$app/stores';
	import Discord from '~icons/my-icons/discord';
	import Icon from '@iconify/svelte';
	$: channelId === 'home';
	console.log(`🚀 ~ file: Server.svelte ~ line 7 ~ channelId === "home"`, channelId === 'home');
	$: path = $page.path;
	// $: console.log(`🚀 ~ file: Server.svelte ~ line 8 ~ path`, path)
	import IconHashSmall from '~icons/line-md/hash-small';
	import IconPersonPlus from '~icons/bi/person-plus-fill';
</script>

<div class="relative bg-gray-800 group" data-dnd-name="svelte-kit">
	<div class="relative" role="listitem">
		<!-- {#if path === `/egghead-discord/${serverId}/${channelId}`}
             {:else}
        {/if} -->
		<div
			class="
        {path === `/egghead-discord/${serverId}/${channelId}`
				? 'bg-sky-600/[0.32]'
				: 'group-hover:bg-sky-800/[0.16]'} 
          bg-gray-800 bg-opacity-0 text-white rounded-r relative px-2 ml-2 rounded-sm flex align-center group-active:bg-sky-800/[0.32]"
		>
			<a
				href="/egghead-discord/{serverId}/{channelId}"
				role="link"
				class="flex-1 py-[6px] cursor-pointer relative"
				data-list-item-id="channels___819723698415599626"
				tabindex="-1"
				aria-label="unread, svelte-kit (text channel)"
				>
				{#if !channel.read}
				<div aria-label="Text (Active Threads)" class="absolute  top-3.5 -left-4 -ml-1">
					<div class="bg-white w-2 h-2 rounded"></div>
				</div>
				{/if}
				<div class="flex align-center" aria-hidden="true">
					<div class="relative w-6 h-6 -mt-[2px]">
						{#if channel.icon === 'heroicons-solid:chat-alt'}
							<IconHashSmall class="absolute mt-1 w-6 h-6 font-thin text-gray-500" />
							<Icon
								class="absolute mt-0.5 font-thin h-3 w-3  z-10  text-gray-500 left-3 -bottom-[3px] bg-gray-800 rounded-sm"
								icon={channel.icon}
							/>
						{:else}
							<Icon class="mt-0.5 font-thin  w-6 h-6 text-gray-500" icon={channel.icon} />
						{/if}
					</div>
					<div class="{channel.read 
					? "text-gray-300" 
					: "text-white"}
					 pl-2">{channelName.toLowerCase()}</div>
					<div
						class="
                    {path === `/egghead-discord/${serverId}/${channelId}`
							? 'opacity-1'
							: 'opacity-0 group-hover:opacity-50'} 
                    flex align-center absolute top-0 right-0 mt-[10px] mr-2"
					>
						<IconPersonPlus
							class="text-sky-300  hover:text-sky-400 opacity-1 w-4 h-4 group-hover:opacity-1 transition-all"
						/>
					</div>
				</div></a
			>
			<div class="children-3rEycc">
				<div
					class="iconItem-F7GRxr iconBase-3LOlfs"
					aria-label="Create Invite"
					tabindex="0"
					role="button"
				>
					<!-- action icon -->
				</div>
			</div>
		</div>
	</div>
</div>
