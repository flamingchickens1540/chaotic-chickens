<script lang="ts">
	import type { PageProps } from './$types';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { localStore } from '@/localStore.svelte';
	import { LogOut } from 'lucide-svelte';

	let { id, username }: PageProps = $props();

	const logout = () => {
		localStore('username', '').reset();
		localStore('id', -1).reset();
		goto('/login');
	};
</script>

<div class="flex flex-col gap-4 p-4">
	<div class="grid grid-rows-3 gap-2">
		<button onclick={logout}><LogOut /></button>
		<span>Hello {username}</span>
	</div>
	<div class="flex flex-col gap-2">
		<button class="rounded bg-gunmetal p-2 disabled:opacity-30" onclick={() => goto('queue')}
			>Match Scout</button
		>
		<button class="rounded bg-gunmetal p-2 disabled:opacity-30" onclick={() => goto('manual')}
			>Manual Match Scout</button
		>
	</div>
</div>
