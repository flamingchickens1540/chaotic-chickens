<script lang="ts">
	import { localStore } from '@/localStore.svelte';
	import { io, type Socket } from 'socket.io-client';
	type Robot = { teamKey: string; color: 'red' | 'blue' };
	type Match = [Robot, Robot, Robot, Robot, Robot, Robot];
	// TODO: Get URL

	type Alliance = [string, string, string];
	type MatchCandidate = {
		red: Alliance;
		blue: Alliance;
	};
	const BAQ_URL = 'http://queue.team1540.org/';
	const emptyMatch: () => Match = () => [
		{ teamKey: '', color: 'red' },
		{ teamKey: '', color: 'red' },
		{ teamKey: '', color: 'red' },
		{ teamKey: '', color: 'blue' },
		{ teamKey: '', color: 'blue' },
		{ teamKey: '', color: 'blue' }
	];

	let scoutQueue: string[] = $state([]);
	let matchKey: string = $state('qm1');
	const username = localStore('username', 'admin');
	const socket: Socket = io({ auth: { username: 'Admin ' + username.value, token: 'admin' } });

	socket.on('connect', () => {
		socket.emit('getScoutQueue', ({ scouts }: { scouts: string[] }) => {
			scoutQueue = scouts;
			console.log(scouts);
		});
		socket.emit('getRobotQueue', ({ robots }: { robots: Robot[] }) => {});
	});
	socket.on('scoutQueued', (username) => {
		scoutQueue.push(username);
	});
	// socket.on('robotLeftQueue', ({ nextRobot, scout }: { nextRobot: Robot; scout: string }) => {
	// });
	socket.on('scoutLeftQueue', (username: string) => {
		scoutQueue.splice(
			scoutQueue.findIndex((scout) => scout == username),
			1
		);
	});
	let nextMatch: Match = $state(emptyMatch());
	let curMatch: Match = $state(emptyMatch());

	const removeScout = (i: number) => {
		socket.emit('leaveScoutQueue', scoutQueue.splice(i, 1));
	};

	const loadFromBaq = async () => {
		try {
			// NOTE: this api call CREATES A NEW MATCH so check that it isn't doing that later
			const res = await fetch(`${BAQ_URL}/api/get_match`, {
				method: 'GET'
			});
			if (!res.ok) {
				console.log(`Error getting data from BAQ: ${res.status}`);
			}
			const baq_data: MatchCandidate = await res.json();
			const data = [
				...baq_data.red.map((team) => {
					return { teamKey: team, color: 'red' } as Robot;
				}),
				...baq_data.blue.map((team) => {
					return { teamKey: team, color: 'blue' } as Robot;
				})
			] as Match;
			nextMatch = data;
		} catch (e: any) {
			console.log('BAQ request failed');
		}
	};
	const queueMatch = () => {
		if (nextMatch.filter((robot) => robot.teamKey == '').length == 0) {
			console.log('Queuing next match!');
			curMatch = nextMatch;
			socket.emit('sendMatch', [matchKey, nextMatch]);
			nextMatch = emptyMatch();
		} else {
			console.log('teams list not full');
		}
	};
</script>

<div class="m-auto mt-3 grid w-sm grid-cols-1 gap-3 lg:w-6xl lg:grid-cols-3">
	<div class="col-span-1 grid grid-rows-2 gap-3">
		<div class="row-span-1 rounded bg-gunmetal p-3">
			<div class="flex items-center justify-between">
				Next Match
				<input class="rounded bg-eerie-black p-2" placeholder="Match Key" bind:value={matchKey} />
			</div>
			<div class="mt-2 grid grid-cols-3 grid-rows-2 gap-2 rounded">
				{#each nextMatch as { teamKey, color }, i}
					<input
						class="col-span-1 row-span-1 rounded border-2 bg-eerie-black p-2 {color == 'red'
							? 'text-imperial-red'
							: 'text-steel-blue'}"
						placeholder={teamKey}
						bind:value={nextMatch[i].teamKey}
					/>
				{/each}
			</div>
		</div>
		<div class="row-span-1 rounded bg-gunmetal p-3">
			Current Match
			<div class="mt-2 grid grid-cols-3 grid-rows-2 gap-2 rounded">
				{#each curMatch as { teamKey, color }}
					<div
						class="col-span-1 row-span-1 rounded bg-eerie-black p-2 {color == 'red'
							? 'text-imperial-red'
							: 'text-steel-blue'} border-2"
					>
						{teamKey}
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div class="col-span-1 rounded bg-gunmetal p-3 text-center">
		Scout Queue
		{#if scoutQueue.length > 0}
			{#each scoutQueue as scout, i}
				<div class="mt-2 grid grid-cols-12 items-center rounded bg-eerie-black p-2">
					<button class="col-span-1 rounded bg-gunmetal py-1" onclick={() => removeScout(i)}
						>×</button
					>
					<span class="col-span-11">
						{scout}
					</span>
				</div>
			{/each}
		{:else}
			<div class="mt-2 rounded bg-eerie-black p-2">Queue is empty</div>
		{/if}
	</div>
	<div class="col-span-1 rounded bg-gunmetal p-3 text-center">
		<button class="mb-2 w-full rounded bg-eerie-black p-2" onclick={loadFromBaq}
			>Load from BAQ</button
		>
		<button class="mb-2 w-full rounded bg-eerie-black p-2" onclick={queueMatch}>Queue match</button>
	</div>
</div>
