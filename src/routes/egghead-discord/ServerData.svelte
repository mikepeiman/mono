<script>
	export let data = {};
	import Discord from '~icons/my-icons/discord';
	let localStorageSupported = (() => {
		try {
			return typeof window.localStorage !== 'undefined';
		} catch (err) {
			return false;
		}
	})();

	// None of this will work in the sandbox REPL but it will work offline
	// saveData(settings, data)

	import { page } from '$app/stores';
	$: path = $page.path;
	readData(data);
	$: saveData(data);

	function saveData(data) {
		if (localStorageSupported) {
			window.localStorage.setItem('discordData', JSON.stringify(data));
		}
	}

	function readData(data) {
		if (localStorageSupported) {
			try {
				const prev = window.localStorage.getItem('discordData');
				if (!prev) return;
				const newData = JSON.parse(prev);
				Object.assign(data, newData);
			} catch (err) {
				console.warn(err);
			}
		}
	}
</script>


<div class="flex flex-row text-white h-screen w-full">
	<div class="bg-gray-800 p-3 space-y-2 overflow-y-scroll">
		<a
			href="/egghead-discord"
			class="{path === '/egghead-discord'
				? 'bg-blue-500 text-white rounded-2xl'
				: 'text-gray-100 rounded-3xl bg-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-200 rounded-3xl hover:rounded-2xl'} w-12 h-12 flex items-center justify-center "
		>
			<Discord class="w-7 h-5 " />
		</a>

		{#each servers as serverId}
			<Server {serverId} {path} />
		{/each}
	</div>
	<div class="bg-winterblues-100 w-60 flex flex-col">
		<div class="px-3 h-12 shadow-md flex flex-shrink-0 items-center font-fira">Header</div>
		<div class="flex flex-col overflow-y-scroll">
			{#each channels as item}
				<!-- content here -->
				<div class="bg-blue-900 p-3 flex-1">{item}</div>
			{/each}
		</div>
	</div>
	<div class="flex flex-1 flex-col">
		<div class="p-3 h-12 shadow-md bg-electricindigo-800 flex font-fira">Main</div>
		<div class="p-3 bg-electricindigo-700  flex-1 space-y-4 overflow-y-scroll">
			{#each messages as message}
				<p class="w-full text-2xl">{message}</p>
			{/each}
		</div>
	</div>
</div>

