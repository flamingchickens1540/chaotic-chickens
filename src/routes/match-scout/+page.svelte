<script lang="ts">
	import Header from './Header.svelte';
	import Timeline from './Timeline.svelte';

	let timelineDisplayed = $state(false);

	let color = 'blue';
	let team = 1540;

	$effect(() => console.log(timelineDisplayed));
</script>

<div class="flex h-dvh flex-col justify-around gap-2 p-2">
	<Header team_key={team} game_state="pre" {color} />
	<div class="flex flex-grow snap-x flex-row"></div>
	<button class="rounded bg-gunmetal p-4 text-xl font-semibold">
		Undo <span class="text-imperial-red">TODO</span>
	</button>
	<button
		class="rounded bg-gunmetal p-4 text-xl font-semibold"
		onclick={() => (timelineDisplayed = true)}
	>
		Timeline
	</button>
	<Timeline bind:displaying={timelineDisplayed} />
</div>
