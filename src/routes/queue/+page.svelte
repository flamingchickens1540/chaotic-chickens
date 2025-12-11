<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { localStore } from '@/localStore.svelte';
	import { io, type Socket } from 'socket.io-client';
	const username = localStore('username', 'no name');
	let queueFull = $state(false);
	const socket: Socket = io({ auth: { username: username.value } });

	socket.on('connect', () => {
		socket.emit('joinQueue');
	});
	socket.on('queueFull', () => {
		queueFull = true;
	});
	socket.on(
		'recieveRobot',
		([matchKey, { teamKey, color }]: [string, { teamKey: string; color: 'red' | 'blue' }]) => {
			if (browser) {
				localStorage.removeItem('matchData');
				localStorage.setItem('matchKey', "\""+ matchKey + "\"");
				localStorage.setItem('teamKey', "\""+teamKey+"\"");
				localStorage.setItem('color', "\""+color+"\"");
			}
			goto('/match-scout');
		}
	);
	socket.on('scoutLeftQueue', (scout: string) => {
		if (scout === username.value) {
			goto('/');
		}
	});
</script>

<div class="flex min-h-dvh flex-col items-center justify-center gap-4 p-6">
	<h1 class="font-heading p-2 text-5xl font-bold text-yellow-400">
		{#if queueFull}Queue Full{:else}In Queue{/if}
	</h1>
	<button
		class="rounded bg-gunmetal px-4 py-2 text-center text-xl"
		onclick={() => {
			socket.emit('leaveScoutQueue', username.value);
			goto('/');
		}}>Leave Queue</button
	>
</div>
