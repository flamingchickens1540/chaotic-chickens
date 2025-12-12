<script lang="ts">
	import { browser } from '$app/environment';
	import { localStore } from '@/localStore.svelte';
	import { goto } from '$app/navigation';

	import '../app.css';
	import favicon from '$lib/assets/favicon.png';

	if (browser) {
		const username = $state(localStore('username', ''));
		const scout_id = $state(localStore('scout_id', -1));

		if (username.value == '' || scout_id.value == -1) goto('/login');
	}

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Chaotic Chickens</title>
</svelte:head>

{@render children?.()}
