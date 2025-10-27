<script lang="ts">
    import Header from "./Header.svelte"
	import Timeline from "./Timeline.svelte";

    let {
        team_key,
        team_color,
        timeline
    } : {
        team_key: number
        team_color: string
        timeline: string[]
    } = $props();
</script>

<Header team_key={team_key} team_color={team_color} game_stage={'Endgame'} timeline={timeline} />



<Timeline />