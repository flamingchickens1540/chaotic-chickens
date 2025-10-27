<script lang="ts">
	import Auto from './Auto.svelte';
	import Endgame from './Endgame.svelte';
	import Teleop from './Teleop.svelte';

	// TODO: get all of these to be variable
	let team_key = $state(1540);
	let team_color = $state("red");
	let timeline = $state([]);
</script>

<!-- TODO: add queue page -->

<!-- if assigned robot -->
<div class="flex w-[300vw]">
	<!-- TODO: swiping -->
	<div class="w-[100vw]"><Auto team_key={team_key} team_color={team_color} timeline={timeline} /></div>
	<div class="w-[100vw]"><Teleop team_key={team_key} team_color={team_color} timeline={timeline} /></div>
	<div class="w-[100vw]"><Endgame team_key={team_key} team_color={team_color} timeline={timeline} /></div>
</div>
