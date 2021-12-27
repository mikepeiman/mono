<script>
	export let data = {};

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
