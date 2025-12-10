<script lang="ts">
	let scout_queue: Array<string> = $state(['Dougie', 'Cooper']);

	const BAQ_URL = '';

	let current_match: Array<{ team: number; color: string }> = $state([
		{ team: 1540, color: 'red' },
		{ team: 2910, color: 'red' },
		{ team: 1323, color: 'red' },
		{ team: 254, color: 'blue' },
		{ team: 1844, color: 'blue' },
		{ team: 1678, color: 'blue' }
	]);

	let next_match: Array<{ team: number; color: string }> = $state([
		{ team: 5940, color: 'red' },
		{ team: 694, color: 'red' },
		{ team: 1690, color: 'red' },
		{ team: 9450, color: 'blue' },
		{ team: 2811, color: 'blue' },
		{ team: 3636, color: 'blue' }
	]);

	const remove_scout = (i: number) => {
		scout_queue.splice(i, 1);
	};

	const load_from_baq = async () => {
		let baq_data: Response;
		try {
			// baq_data = await fetch(`${BAQ_URL}/queue`, {
			// method: "GET"
			// });
			// TODO: learn how the api works (I DON'T KNOW RUST)
		} catch (e: any) {
			console.log('BAQ request failed');
		}
	};
</script>

<div class="m-auto mt-3 grid w-sm grid-cols-1 gap-3 lg:w-6xl lg:grid-cols-3">
	<div class="col-span-1 grid grid-rows-2 gap-3">
		<div class="row-span-1 rounded bg-gunmetal p-3">
			Current Match
			<div class="mt-2 grid grid-cols-3 grid-rows-2 gap-2 rounded">
				{#each current_match as { team, color }, i}
					<input
						class="col-span-1 row-span-1 rounded bg-eerie-black p-2 {color == 'red'
							? 'text-imperial-red'
							: 'text-steel-blue'} border-2"
						placeholder={team.toString()}
						bind:value={current_match[i].team}
					/>
				{/each}
			</div>
		</div>
		<div class="row-span-1 rounded bg-gunmetal p-3">
			Next Match
			<div class="mt-2 grid grid-cols-3 grid-rows-2 gap-2 rounded">
				{#each next_match as { team, color }}
					<div
						class="col-span-1 row-span-1 rounded bg-eerie-black p-2 {color == 'red'
							? 'text-imperial-red'
							: 'text-steel-blue'} border-2"
					>
						{team}
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div class="col-span-1 rounded bg-gunmetal p-3 text-center">
		Queue
		{#if scout_queue.length > 0}
			{#each scout_queue as scout, i}
				<div class="mt-2 grid grid-cols-12 items-center rounded bg-eerie-black p-2">
					<button class="col-span-1 rounded bg-gunmetal py-1" onclick={() => remove_scout(i)}
						>×</button
					>
					<span class="col-span-11">
						{scout}
					</span>
				</div>
			{/each}
		{:else}
			<div class="mt-2 rounded bg-eerie-black p-2">Queue is empty</div>
		{/if}
	</div>
	<div class="col-span-1 rounded bg-gunmetal p-3 text-center">
		<button class="mb-2 w-full rounded bg-eerie-black p-2" onclick={load_from_baq}
			>Load from BAQ</button
		>
	</div>
</div>
