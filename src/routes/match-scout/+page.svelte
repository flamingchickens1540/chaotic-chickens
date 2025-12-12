<script lang="ts">
	import { useSwipe, type SwipeCustomEvent } from 'svelte-gestures';
	import { LocalStore, localStore } from '@/localStore.svelte';
	import { type FrontendTeamMatch } from '@/types';

	import GamePhase from './GamePhase.svelte';
	import Header from './Header.svelte';
	import Postmatch from './Postmatch.svelte';
	import Timeline from './Timeline.svelte';

	const username = $state(localStore('username', ''));
	const scoutId = $state(localStore('scoutId', -1));

	let timelineDisplaying = $state(false);

	const color = localStore('color', '').value;

	// need to clear on submission and on joining from queue, also a homescreen button could be "return to match" and just runs goto(/match-scout)
	let match: LocalStore<FrontendTeamMatch> = $state(
		localStore('matchData', {
			matchKey: localStore('matchKey', '').value,
			eventKey: '2025orbb',
			teamKey: localStore('teamKey', '').value,
			timeline: {
				auto: [],
				tele: []
			},
			autoStart: 'Close',
			autoMobility: false,
			skill: 3,
			notes: '',
			scout: username.value,
			scoutId: scoutId.value
		})
	);

	let mostRecentAction: 'Auto' | 'Tele' | null = $state(null);
	let mostRecentTimeline = $derived(
		mostRecentAction === 'Auto'
			? match.value.timeline.auto
			: mostRecentAction === 'Tele'
				? match.value.timeline.tele
				: null
	);

	let gameStage: LocalStore<'Auto' | 'Tele' | 'Post'> = $state(localStore('gameStage', 'Auto'));

	const nextGameStage = () => {
		gameStage.value = gameStage.value === 'Auto' ? 'Tele' : 'Post';
	};

	const prevGameStage = () => {
		gameStage.value = gameStage.value === 'Post' ? 'Tele' : 'Auto';
	};

	function swipeHandler(event: SwipeCustomEvent) {
		if (event.detail.direction === 'left') nextGameStage();
		else if (event.detail.direction === 'right') prevGameStage();
	}
</script>

<div
	class="m-auto flex min-h-dvh max-w-2xl flex-col justify-stretch gap-2 p-2"
	{...useSwipe(swipeHandler, () => ({ timeframe: 300, minSwipeDistance: 60 }))}
>
	<Header
		teamKey={match.value.teamKey}
		gameStage={gameStage.value}
		{color}
		next={nextGameStage}
		prev={prevGameStage}
	/>
	{#if gameStage.value === 'Auto' || gameStage.value === 'Tele'}
		<GamePhase phase={gameStage.value} bind:mostRecentAction bind:timeline={match.value.timeline} />
	{:else if gameStage.value === 'Post'}
		<Postmatch bind:match={match.value} />
	{/if}
	<div class="flex flex-col gap-2">
		{#if gameStage.value === 'Auto' || gameStage.value === 'Tele'}
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
				class="grow-0 rounded-xl bg-gunmetal p-4 text-xl font-semibold transition-transform duration-100 ease-in-out active:scale-95 disabled:*:opacity-30"
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
			class="grow-0 rounded-xl bg-gunmetal p-4 text-xl font-semibold transition-transform duration-150 active:scale-95"
			onclick={() => (timelineDisplaying = true)}
		>
			Timeline
		</button>
	</div>
</div>
<Timeline
	bind:displaying={timelineDisplaying}
	bind:mostRecentAction
	bind:timeline={match.value.timeline}
/>
