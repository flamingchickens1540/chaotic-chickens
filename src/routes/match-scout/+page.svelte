<script lang="ts">
	import { useSwipe, type SwipeCustomEvent } from 'svelte-gestures';
	import { LocalStore, localStore } from '@/localStore.svelte';
	import { type FrontendTeamMatch } from '@/types';

	import GamePhase from './GamePhase.svelte';
	import Header from './Header.svelte';
	import Postmatch from './Postmatch.svelte';
	import Prematch from './Prematch.svelte';
	import Timeline from './Timeline.svelte';

	let timelineDisplayed = $state(false);

	let color = 'blue';
	let team = 1540;

	let match: FrontendTeamMatch = $state({
		matchKey: 'fwejifj',
		eventKey: 'feoiwf',
		teamKey: '1540',
		timeline: {
			auto: [],
			tele: []
		},
		autoStart: 'Close',
		autoMobility: false,
		skill: 3,
		notes: '',
		scoutId: 90128340812,
		scout: 'daisy'
	});

	$effect(() => console.log(timelineDisplayed));

	const feederStationPressed = (phase: string) => {};
	const grassPressed = (phase: string) => {};
	const opposingRobotPressed = (phase: string) => {};

	let game_stage: LocalStore<'Pre' | 'Auto' | 'Tele' | 'Post'> = $state(
		localStore('game_stage', 'Pre')
	);

	const nextGameStage = () => {
		game_stage.value =
			game_stage.value === 'Pre' ? 'Auto' : game_stage.value === 'Auto' ? 'Tele' : 'Post';
	};

	const prevGameStage = () => {
		game_stage.value =
			game_stage.value === 'Post' ? 'Tele' : game_stage.value === 'Tele' ? 'Auto' : 'Pre';
	};

	function swipeHandler(event: SwipeCustomEvent) {
		if ((event.detail.direction = 'left')) prevGameStage();
		else if ((event.detail.direction = 'right')) nextGameStage();
	}
</script>

<div
	class="grid max-h-dvh min-h-dvh max-w-dvw grid-rows-[auto_1fr] gap-2 p-2"
	{...useSwipe(swipeHandler, () => ({ timeframe: 300, minSwipeDistance: 60 }))}
>
	<Header
		team_key={team}
		game_stage={game_stage.value}
		{color}
		next={nextGameStage}
		prev={prevGameStage}
	/>
	<div class="grid max-h-full grid-rows-[1fr_auto] gap-2 overflow-y-scroll">
		{#if game_stage.value === 'Pre'}
			<Prematch />
		{:else if game_stage.value === 'Auto' || game_stage.value === 'Tele'}
			<GamePhase
				phase={game_stage.value}
				feederStationClicked={() => {}}
				grassClicked={() => {}}
				opposingRobotClicked={() => {}}
			/>
		{:else if game_stage.value === 'Post'}
			<Postmatch bind:match />
		{/if}
		<div class="flex flex-col gap-2">
			{#if game_stage.value === 'Auto' || game_stage.value === 'Tele'}
				<button
					class="grow-0 rounded-lg bg-gunmetal p-4 text-xl font-semibold transition-transform duration-100 ease-in-out active:scale-95"
				>
					Undo <span class="text-xanthous">TODO</span>
				</button>
			{/if}
			{#if game_stage.value == 'Auto' || game_stage.value === 'Tele' || game_stage.value === 'Post'}
				<button
					class="grow-0 rounded-lg bg-gunmetal p-4 text-xl font-semibold transition-transform duration-150 active:scale-95"
					onclick={() => (timelineDisplayed = true)}
				>
					Timeline
				</button>
			{/if}
		</div>
	</div>
</div>
<Timeline bind:displaying={timelineDisplayed} />
