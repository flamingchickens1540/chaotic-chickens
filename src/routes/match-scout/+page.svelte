<script lang="ts">
	import Header from './Header.svelte';
	import Timeline from './Timeline.svelte';

	let timelineDisplayed = $state(false);

	let color = 'blue';
	let team = 1540;

	$effect(() => console.log(timelineDisplayed));

    const feederStationPressed = (phase: string) => { };
    const grassPressed = (phase: string)  => { };
    const opposingRobotPressed = (phase: string) => { };

    const phases = [ "pre", "auto", "tele", "post" ];

    let currentPhase = "auto";

$effect(() => {
        console.log(currentPhase);
        console.log(prevPage);
        console.log(nextPage)
    })

    let prevPage = phases[0] == currentPhase ? null : () => { phases[phases.indexOf(currentPhase) - 1] };
    let nextPage = phases[phases.length - 1] == currentPhase ? null : () => { phases[phases.indexOf(currentPhase) + 2] };
</script>

<div class="flex h-dvh flex-col justify-around gap-2 p-2 max-w-dvw">
	<Header team_key={team} game_state="pre" {color} {prevPage} {nextPage} />
	<div class="flex grow flex-row gap-8" onscroll={() => console.log("scrolled")}>
        {#each ["auto", "tele"] as phase}
        {#if currentPhase == phase}
        <div id={phase} class="flex flex-col gap-3 min-w-[calc(100dvw-1rem)] ">
            <button class="grow rounded-xl p-6 text-xl font-bold {phase == "auto" ? "bg-steel-blue" : "bg-eminence"}"
                    onclick={() => feederStationPressed(phase)}>Feeder Station</button>
            <button class="grow rounded-xl p-6 text-xl font-bold {phase == "auto" ? "bg-steel-blue" : "bg-eminence"}"
                    onclick={() => grassPressed(phase)}>Grass</button>
            <button class="grow rounded-xl p-6 text-xl font-bold {phase == "auto" ? "bg-steel-blue" : "bg-eminence"}"

                    onclick={() => opposingRobotPressed(phase)}>Opposing Robot</button>
        </div>
        {/if}
        {/each}
    </div>
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
