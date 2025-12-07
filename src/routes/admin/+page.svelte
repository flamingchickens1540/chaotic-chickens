<script lang="ts">
    let scout_queue: Array<string> = $state([
        "Dougie",
        "Cooper",
    ])

    /*  Status: 0: not sent out - 1: sent but not recieved - 2: recieved
        Subject to change???
    */
    let current_match: Array<{team: number, color: string, status: number}> = [
        { team: 1540, color: "red", status: 0 },
        { team: 2910, color: "red", status: 2 },
        { team: 1323, color: "red", status: 1 },
        { team: 254, color: "blue", status: 2 },
        { team: 1844, color: "blue", status: 0},
        { team: 1678, color: "blue", status: 1 },
    ]

    let next_match: Array<{team: number, color: string, status: number}> = [
        { team: 5940, color: "red", status: 2 },
        { team: 694, color: "red", status: 1},
        { team: 1690, color: "red", status: 1 },
        { team: 9450, color: "blue", status: 0 },
        { team: 2811, color: "blue", status: 2 },
        { team: 3636, color: "blue", status: 0 },
    ]



    const remove_scout = (i: number) => {
        scout_queue.splice(i, 1)
    }

    const load_from_fowlfield = () => {}

    const clear_next_match = () => {
        next_match = []
    }
    
</script>

<div class="grid lg:grid-cols-3 grid-cols-1 gap-3 m-auto mt-3 w-sm lg:w-6xl">
    <div class="col-span-1 grid grid-rows-2 gap-3">
        <div class="row-span-1 bg-gunmetal p-3 rounded">
            Current Match
            <div class="grid grid-cols-3 gap-2 grid-rows-2 rounded mt-2">
                {#each current_match as {team, color, status} }
                    <div class="col-span-1 row-span-1 bg-eerie-black p-2 rounded {color == "red" ? "text-imperial-red" : "text-steel-blue"} border {status == 0 ? "border-none" : "border-solid"} border-2 {status == 1 ? "border-crayola-orange" : "border-jungle-green"}">
                        {team}
                    </div>
                {/each}
            </div>
        </div>
        <div class="row-span-1 bg-gunmetal p-3 rounded">
            Next Match
            <div class="grid grid-cols-3 gap-2 grid-rows-2 rounded mt-2">
                {#each next_match as {team, color, status} }
                    <div class="col-span-1 row-span-1 bg-eerie-black p-2 rounded {color == "red" ? "text-imperial-red" : "text-steel-blue"} border {status == 0 ? "border-none" : "border-solid"} border-2 {status == 1 ? "border-crayola-orange" : "border-jungle-green"}">
                        {team}
                    </div>
                {/each}
            </div>
        </div>
    </div>
    <div class="col-span-1 bg-gunmetal rounded text-center p-3">
        Queue
        {#if scout_queue.length > 0}
            {#each scout_queue as scout, i}
                <div class="bg-eerie-black rounded mt-2 p-2 grid grid-cols-12 items-center">
                    <button class="bg-gunmetal rounded col-span-1 py-1" onclick={() => remove_scout(i)}>×</button>
                    <span class="col-span-11">
                        {scout}
                    </span>
                </div>
            {/each}
        {:else}
            <div class="bg-eerie-black rounded mt-2 p-2">Queue is empty</div>
        {/if}
    </div>
    <div class="col-span-1 bg-gunmetal rounded text-center p-3">
        <button class="bg-eerie-black rounded w-full p-2 mb-2" onclick={() => console.log("PLACEHOLDER")}>Load from Fowlfield</button>
        <button class="bg-eerie-black rounded w-full p-2" onclick={clear_next_match}>Clear Next Match</button>
    </div>
</div>