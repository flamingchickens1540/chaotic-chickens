<script lang="ts">
	import { goto } from '$app/navigation';
	import { localStore } from '@/localStore.svelte';
	import { LogOut } from 'lucide-svelte';

	let username = $state(localStore('username', ''));
	let scoutId = $state(localStore('scoutId', -1));

	const logout = () => {
		username.reset();
		scoutId.reset();
		goto('/login');
	};
</script>

<div class="flex flex-col gap-4 p-4">
	<div class="grid grid-cols-[1fr_auto_1fr] gap-2">
		<button onclick={logout}><LogOut /></button>
		<span class="text-lg font-semibold">Hello {username.value}</span>
	</div>
	<div class="flex flex-col gap-2 text-xl font-semibold">
		<button class="rounded bg-gunmetal p-2 disabled:opacity-30" onclick={() => goto('queue')}
			>Match Scout</button
		>
		<button class="rounded bg-gunmetal p-2 disabled:opacity-30" onclick={() => goto('manual')}
			>Manual Match Scout</button
		>
		<button class="rounded bg-gunmetal p-2 disabled:opacity-30" onclick={() => goto('match-scout')}
			>Return to match scouting if you were kicked</button
		>
	</div>
</div>
