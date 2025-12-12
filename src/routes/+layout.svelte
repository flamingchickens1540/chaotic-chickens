<script lang="ts">
	import { browser } from '$app/environment';
	import { localStore } from '@/localStore.svelte';
	import { goto } from '$app/navigation';

	import '../app.css';
	import favicon from '$lib/assets/favicon.png';

	if (browser) {
                const oldData = localStorage.getItem('scoutId');
        if (oldData != null) {
            localStorage.clear();
        }
		const username = $state(localStore('username', ''));
		const scoutId = $state(localStore('scoutId', -1));

		if (username.value == '' || scoutId.value == -1) goto('/login');
	}

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Chaotic Chickens</title>
</svelte:head>

{@render children?.()}
