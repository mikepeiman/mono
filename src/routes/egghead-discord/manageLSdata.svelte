<script>
	import { onMount } from 'svelte';
    
    let servers, channels, messages;
    let serversLS, channelsLS, messagesLS;
    
	onMount(() => {
		console.log(`🚀 ~ file: index.svelte ~ line 9 ~ data`, data)
		serversLS = localStorage.getItem('servers');
		channelsLS = localStorage.getItem('channels');
		messagesLS = localStorage.getItem('messages');
		if (serversLS) {
			existingServerList = true;
		}
		if (!existingServerList) {
			servers = [];
			channels = [];
			messages = [];
			[...Array(40)].map((_, i) => {
				let id = makeid(2);
				let channel = makeid(random.range(6, 18));
				let message = lorem.generateSentences(Math.floor(random.range(1, 8)));
				servers.push(id);
				channels.push(channel);
				messages.push(message);
			});
			serversStore.set(servers);
			channelsStore.set(channels);
			messagesStore.set(messages);
		} else {
			servers = JSON.parse(serversLS)
			channels = JSON.parse(channelsLS)
			messages = JSON.parse(messagesLS)
		}
		mounted = true;
	});

    let data = { servers: servers, channels: channels, messages: messages }
    
</script>