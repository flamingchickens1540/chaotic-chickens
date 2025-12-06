<script lang="ts">
	import { Star } from 'lucide-svelte';
	let { name, value = $bindable() }: { name: string; value: number } = $props();
</script>

<div class="flex flex-row justify-center gap-2 p-1">
	{#each [1, 2, 3, 4, 5] as rating}
		<label class="flex items-center justify-center rounded text-2xl font-bold">
			<input type="radio" name={`${name}-rate`} value={rating} bind:group={value} class="hidden" />
			<Star class={rating <= value ? 'text-xanthous' : 'text-white/50'} size={60} />
		</label>
	{/each}
</div>
