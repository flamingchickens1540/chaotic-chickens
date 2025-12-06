<script lang="ts">
	let {
		phase,
		feederStationClicked,
		grassClicked,
		opposingRobotClicked
	}: {
		phase: 'Auto' | 'Tele';
		feederStationClicked: () => null;
		grassClicked: () => null;
		opposingRobotClicked: () => null;
	} = $props();
</script>

<div class="flex grow flex-col gap-2 text-xl font-bold">
	<button
		class="grow rounded-xl p-6 transition-transform duration-100 ease-in-out active:scale-95 {phase ==
		'Auto'
			? 'bg-jungle-green'
			: 'bg-eminence'}"
		onclick={feederStationClicked}>Feeder Station</button
	>
	<button
		class="grow rounded-xl p-6 transition-transform duration-100 ease-in-out active:scale-95 {phase ==
		'Auto'
			? 'bg-jungle-green'
			: 'bg-eminence'}"
		onclick={grassClicked}>Grass</button
	>
	<button
		class="grow rounded-xl p-6 transition-transform duration-100 ease-in-out active:scale-95 {phase ==
		'Auto'
			? 'bg-jungle-green'
			: 'bg-eminence'}"
		onclick={opposingRobotClicked}>Opposing Robot</button
	>
</div>
