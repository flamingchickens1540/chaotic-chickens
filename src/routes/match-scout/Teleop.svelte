<script lang="ts">
    import Header from "./Header.svelte"
	import Timeline from "./Timeline.svelte";
	import UndoButton from "./UndoButton.svelte";

    let {
        team_key,
        team_color,
        timeline
    } : {
        team_key: number
        team_color: string
        timeline: string[]
    } = $props();

    let bg_color = 'bg-amber-600';

	let feeder_station = () => {};
	let grass = () => {};
	let opposing_robot = () => {};
</script>

<div class="flex min-h-dvh flex-col">
	<Header {team_key} {team_color} game_stage={'Auto'} {timeline} />

	<div class="grid-cols m-2 grid flex-grow gap-2 text-xl font-semibold">
		<button class="child rounded {bg_color} h-full w-full" onclick={feeder_station}
			>Feeder Station</button
		>
		<button class="rounded {bg_color} h-full w-full" onclick={grass}>Grass</button>
		<button class="rounded {bg_color} h-full w-full" onclick={opposing_robot}>Opposing Robot</button
		>
	</div>

	<UndoButton {timeline} />
	<Timeline />
</div>