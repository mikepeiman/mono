<script>
	import random from 'canvas-sketch-util/random.js';
	import math from 'canvas-sketch-util/math.js';
	import Color from 'canvas-sketch-util/color.js';
	import { LoremIpsum } from 'lorem-ipsum';
	import SvgIcon from '$components/SvgIcon.svelte';

	const lorem = new LoremIpsum({
		sentencesPerParagraph: {
			min: 1,
			max: 8
		},
		wordsPerSentence: {
			min: 4,
			max: 16
		}
	});

	function makeid(length) {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
	let discord_src = 'svg/discord.svg';
	let alpha = 'abcdefghijklmnopqrstuvwxyz';
	let discordData = {};
	let servers = [];
	let channels = [];
	let messages = [];
	[...Array(40)].map((_, i) => {
		let id = makeid(2);
		let channel = makeid(random.range(6, 18));
		let message = lorem.generateSentences(Math.floor(random.range(1, 8)));
		servers.push(id);
		channels.push(channel);
		messages.push(message);
	});
    discordData.servers = servers
	servers.forEach((id) => {
		discordData[id] = {id, channels: channels}
        channels.forEach(channel => {
            discordData[id].channels[channel] = messages
        })
	});
    
    console.log(`🚀 ~ file: __layout.svelte ~ line 45 ~ servers.forEach ~ discordData`, discordData)

	$: servers, channels, discordData;

	import { page } from '$app/stores';
	import Server from './Server.svelte';
	import ServerData from './ServerData.svelte';
	$: path = $page.path;
	$: console.log(`🚀 ~ file: __layout.svelte ~ line 46 ~ path`, path);
</script>

<!-- Beginning to work through https://egghead.io/lessons/tailwind-intro-to-styling-custom-uis-with-tailwind-utility-classes -->

<ServerData {discordData} />
