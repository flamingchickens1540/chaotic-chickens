<script lang="ts">
	let {
		name,
		items,
		selected = $bindable()
	}: {
		name: string;
		items: string[];
		selected: string;
	} = $props();
</script>

<div class="grid auto-cols-fr grid-flow-col gap-4 rounded bg-gunmetal p-2">
	{#each items as item}
		<label
			class="flex items-center justify-center rounded bg-eerie-black p-4 text-2xl font-bold has-checked:bg-xanthous"
		>
			<input
				type="radio"
				name={`${name}-switcher`}
				value={item}
				bind:group={selected}
				class="hidden"
			/>
			<span>{item}</span>
		</label>
	{/each}
</div>
