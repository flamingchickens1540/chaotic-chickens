<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { localStore } from '@/localStore.svelte';
	import { browser } from '$app/environment';

	let username = $state(localStore('username', ''));
	let scoutId = localStore('scoutId', -1);
	let waiting = $state(false);

	onMount(() => {
		if (username.value != '' && scoutId.value != -1) goto('/');
	});

	const login = async () => {
		const loginRes = await fetch(`/api/user/${username.value}`, {
			method: 'GET'
		});
		if (!loginRes.ok) return;

		const { id } = await loginRes.json();
		browser && window.localStorage.setItem('scoutId', id);

		goto('/');
	};
</script>

<div class="flex min-h-svh flex-col items-center justify-center gap-8 p-8">
	<h1 class="text-center text-3xl font-bold">Chaotic Chickens :3</h1>
	<div class="grid max-w-100 grid-rows-2 gap-2">
		{#if !waiting}
			<input
				class="rounded border-gunmetal bg-gunmetal p-2 shadow-inner"
				type="text"
				placeholder="Please enter your name here"
				bind:value={username.value}
			/>
			<button
				class="text-l rounded bg-gunmetal px-4 py-2 text-center disabled:text-white/50"
				onclick={login}
				disabled={username.value === ''}
			>
				Login
			</button>
		{:else}
			<div>Waiting for approval</div>
		{/if}
	</div>
</div>
