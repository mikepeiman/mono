<script>
    export let servers, channels, serverIndex, channelIndex
    import { D } from '$stores/discord.js';
    let messages = false
    $: serverIndex ? messages = D.generateMessages(serverIndex, channelIndex) : false
    $: console.log(`🚀 ~ file: Messages.svelte ~ line 6 ~ messages`, messages)
</script>

<div class="p-3 h-12 shadow-md shadow-gray-900 z-10 bg-gray-750 flex font-fira">Messages</div>
<div class="p-3 bg-gray-750  flex-1 space-y-4 overflow-y-scroll h-full">
    {#if messages}
        {#each messages as message}
            <p class="w-full text-2xl">{message}</p>
        {/each}
    {/if}
</div>