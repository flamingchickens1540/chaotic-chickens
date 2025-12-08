<script lang="ts">
	import { useSwipe, type SwipeCustomEvent } from 'svelte-gestures';
	import { LocalStore, localStore } from '@/localStore.svelte';
	import { type FrontendTeamMatch, type Action } from '@/types';

	import GamePhase from './GamePhase.svelte';
	import Header from './Header.svelte';
	import Postmatch from './Postmatch.svelte';
	import Timeline from './Timeline.svelte';

	let timelineDisplaying = $state(false);

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

	let mostRecentAction: 'Auto' | 'Tele' | null = $state(null);
	let mostRecentTimeline = $derived(
		mostRecentAction === 'Auto'
			? match.timeline.auto
			: mostRecentAction === 'Tele'
				? match.timeline.tele
				: null
	);

	let game_stage: LocalStore<'Auto' | 'Tele' | 'Post'> = $state(localStore('game_stage', 'Auto'));

	const nextGameStage = () => {
		game_stage.value = game_stage.value === 'Auto' ? 'Tele' : 'Post';
	};

	const prevGameStage = () => {
		game_stage.value = game_stage.value === 'Post' ? 'Tele' : 'Auto';
	};

	function swipeHandler(event: SwipeCustomEvent) {
		if (event.detail.direction === 'left') prevGameStage();
		else if (event.detail.direction === 'right') nextGameStage();
	}
</script>

<div
	class="m-auto grid max-h-dvh min-h-dvh max-w-2xl grid-rows-[auto_1fr] gap-2 p-2"
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
		{#if game_stage.value === 'Auto' || game_stage.value === 'Tele'}
			<GamePhase phase={game_stage.value} bind:mostRecentAction bind:timeline={match.timeline} />
		{:else if game_stage.value === 'Post'}
			<Postmatch bind:match />
		{/if}
		<div class="flex flex-col gap-2">
			{#if game_stage.value === 'Auto' || game_stage.value === 'Tele'}
				<button
					disabled={mostRecentTimeline === null || mostRecentTimeline.length === 0}
					onclick={() => {
						mostRecentTimeline?.pop();
						mostRecentAction =
							mostRecentTimeline?.length === 0
								? mostRecentAction === 'Auto'
									? null
									: mostRecentAction === 'Tele'
										? 'Auto'
										: null
								: mostRecentAction;
					}}
					class={(mostRecentTimeline === null ? 'pointer-events-none' : '') +
						'grow-0 rounded-lg bg-gunmetal p-4 text-xl font-semibold transition-transform duration-100 ease-in-out active:scale-95 disabled:*:opacity-30'}
				>
					<span
						>Undo <span
							class={mostRecentAction === 'Auto'
								? 'text-jungle-green'
								: mostRecentAction === 'Tele'
									? 'text-eminence'
									: ''}
							>{(mostRecentTimeline ?? []).length > 0
								? mostRecentTimeline?.[mostRecentTimeline?.length - 1]
										?.match(/[A-Z][a-z]+/g)
										?.join(' ')
								: 'Nothing'}</span
						></span
					>
				</button>
			{/if}
			<button
				class="grow-0 rounded-lg bg-gunmetal p-4 text-xl font-semibold transition-transform duration-150 active:scale-95"
				onclick={() => (timelineDisplaying = true)}
			>
				Timeline
			</button>
		</div>
	</div>
</div>
<Timeline
	bind:displaying={timelineDisplaying}
	bind:mostRecentAction
	bind:timeline={match.timeline}
/>
