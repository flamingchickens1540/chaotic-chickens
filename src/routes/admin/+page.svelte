<script lang="ts">
    let scout_queue: Array<string> = $state([
        "Dougie",
        "Cooper",
    ])

    let current_match: Array<{team: number, color: string}> = [
        { team: 1540, color: "red" },
        { team: 2910, color: "red" },
        { team: 1323, color: "red" },
        { team: 254, color: "blue" },
        { team: 1844, color: "blue" },
        { team: 1678, color: "blue" },
    ]

    let next_match: Array<{team: number, color: string}> = [
        { team: 5940, color: "red" },
        { team: 694, color: "red" },
        { team: 1690, color: "red" },
        { team: 9450, color: "blue" },
        { team: 2811, color: "blue" },
        { team: 3636, color: "blue" },
    ]



    function remove_scout(i: number) {
        scout_queue.splice(i, 1)
    }
    
</script>

<div class="grid grid-cols-3 gap-3 m-auto mt-3 w-6xl">
    <div class="col-span-1 grid grid-rows-2 gap-3">
        <div class="row-span-1 bg-slate-900 p-3 rounded">
            Current Match
            <div class="grid grid-cols-3 gap-2 grid-rows-2 rounded mt-2">
                {#each current_match as {team, color} }
                    <div class="col-span-1 row-span-1 bg-slate-950 p-2 rounded {color == "red" ? "text-red-500" : "text-blue-500"}">
                        {team}
                    </div>
                {/each}
            </div>
        </div>
        <div class="row-span-1 bg-slate-900 p-3 rounded">
            Next Match
            <div class="grid grid-cols-3 gap-2 grid-rows-2 rounded mt-2">
                {#each next_match as {team, color} }
                    <div class="col-span-1 row-span-1 bg-slate-950 p-2 rounded {color == "red" ? "text-red-500" : "text-blue-500"}">
                        {team}
                    </div>
                {/each}
            </div>
        </div>
    </div>
    <div class="col-span-1 bg-slate-900 rounded text-center p-3">
        Queue
        {#if scout_queue.length > 0}
            {#each scout_queue as scout, i}
                <div class="bg-slate-950 rounded mt-2 p-2 grid grid-cols-12">
                    <button class="bg-slate-800 rounded col-span-1" onclick={() => remove_scout(i)}>❎</button>
                    <span class="col-span-11">
                        {scout}
                    </span>
                </div>
            {/each}
        {:else}
            <div class="bg-slate-950 rounded mt-2 p-2">Queue is empty</div>
        {/if}
    </div>
    <div class="col-span-1 bg-slate-900 rounded text-center p-3">
        <button class="bg-slate-950 rounded p-1 w-full p-2 mb-2" onclick={() => console.log("PLACEHOLDER")}>Load from Fowlfield</button>
        <button class="bg-slate-950 rounded p-1 w-full p-2" onclick={() => console.log("PLACEHOLDER")}>Clear Next Match</button>
    </div>
</div>