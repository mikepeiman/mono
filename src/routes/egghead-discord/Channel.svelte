<script>
	export let serverId, channelId;
	import { page } from '$app/stores';
	import Discord from '~icons/my-icons/discord';
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
				? 'bg-sky-600'
				: 'group-hover:bg-sky-800'} 
         transition-all duration-200 bg-gray-800 text-white rounded-r relative px-2 ml-2 rounded-sm flex align-center group-active:bg-sky-800"
		>
			<a
				href="/egghead-discord/{serverId}/{channelId}"
				role="link"
				class="flex-1 py-[6px] cursor-pointer"
				data-list-item-id="channels___819723698415599626"
				tabindex="-1"
				aria-label="unread, svelte-kit (text channel)"
				><div aria-label="Text (Active Threads)" class="iconContainer-1BBaeJ">
					<!-- channel indicator icon -->
				</div>
				<div class="flex align-center" aria-hidden="true">
					<IconHashSmall class="mt-1 font-thin text-gray-500" />
					<div class="text-gray-300">{channelId}</div>
					<div class="
                    {path === `/egghead-discord/${serverId}/${channelId}`
							? 'opacity-1'
							: 'opacity-0 group-hover:opacity-50'} 
                    text-fuchsia-300 flex align-center absolute top-0 right-0 mt-[12px] mr-2 text-[10px]"
					>
						<IconPersonPlus
							class="text-blue-300 opacity-1  group-hover:opacity-1 transition-all"
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
