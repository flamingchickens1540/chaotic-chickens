<script lang="ts">
	let {
		name,
		items,
		selected = $bindable()
	}: {
		name: string;
		items: (string | { display: string; value: any })[];
		selected: any;
	} = $props();
</script>

<div class="grid auto-cols-fr grid-flow-col gap-4 rounded bg-gunmetal p-2">
	{#each items as item}
		<label
			class="flex items-center justify-center rounded bg-eerie-black p-4 text-2xl font-bold has-checked:bg-xanthous"
		>
			<input
				type="radio"
				name="{name}-switcher"
				value={typeof item === 'string' ? item : item.value}
				bind:group={selected}
				class="hidden"
			/>
			<span>{typeof item === 'string' ? item : item.display}</span>
		</label>
	{/each}
</div>
