<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { LocalStore, localStore } from '@/localStore.svelte';
	import { io, type Socket } from 'socket.io-client';
	import { onMount } from 'svelte';
	const username = localStore('username', 'no name');
	let queue_full = $state(false);
	let socket: Socket;

	onMount(() => {
		socket = io({ auth: { username: username.value } });

		socket.on('connect', () => {
			socket.emit('join_queue');
		});
		socket.on('queue_full', () => {
			queue_full = true;
		});
		socket.on(
			'recieve_robot',
			([match_key, { team_key, color }]: [string, { team_key: string; color: 'red' | 'blue' }]) => {
				browser &&
					localStorage.setItem('match_data', '') &&
					localStorage.setItem('match_key', match_key) &&
					localStorage.setItem('team_key', team_key) &&
					localStorage.setItem('color', color);
				goto('/match-scout');
			}
		);
		socket.on('scout_left_queue', (scout: string) => {
			if (scout === username.value) {
				goto('/');
			}
		});
	});
</script>

<div class="flex min-h-dvh flex-col items-center justify-center gap-4 p-6">
	<h1 class="font-heading p-2 text-5xl font-bold text-yellow-400">
		{#if queue_full}Queue Full{:else}In Queue{/if}
	</h1>
	<button
		class="rounded bg-gunmetal px-4 py-2 text-center text-xl"
		onclick={() => {
			socket.emit('leave_scout_queue', username.value);
			goto('/');
		}}>Leave Queue</button
	>
</div>
