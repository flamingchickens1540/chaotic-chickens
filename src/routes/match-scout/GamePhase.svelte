<script lang="ts">
	import { type Action, type Timeline } from '@/lib/types';

	let {
		phase,
		mostRecentAction = $bindable(),
		timeline = $bindable()
	}: {
		phase: 'Auto' | 'Tele';
		mostRecentAction: ('Auto' | 'Tele')?;
		timeline: Timeline;
	} = $props();

	const buttonPressed = $derived((action: Action) => {
		mostRecentAction = phase;
		if (phase === 'Auto') timeline.auto.push(action);
		else timeline.tele.push(action);
	});
</script>

<div class="flex grow flex-col gap-2 text-xl font-bold">
	<button
		class="grow rounded-xl p-6 transition-transform duration-100 ease-in-out active:scale-95 {phase ==
		'Auto'
			? 'bg-jungle-green'
			: 'bg-eminence'}"
		onclick={() => buttonPressed('ScoreFeedingStation')}>Feeder Station</button
	>
	<button
		class="grow rounded-xl p-6 transition-transform duration-100 ease-in-out active:scale-95 {phase ==
		'Auto'
			? 'bg-jungle-green'
			: 'bg-eminence'}"
		onclick={() => buttonPressed('ScoreGrass')}>Grass</button
	>
	<button
		class="grow rounded-xl p-6 transition-transform duration-100 ease-in-out active:scale-95 {phase ==
		'Auto'
			? 'bg-jungle-green'
			: 'bg-eminence'}"
		onclick={() => buttonPressed('ScoreRobot')}>Opposing Robot</button
	>
</div>
