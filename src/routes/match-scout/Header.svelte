<script lang="ts">
	import { ArrowRight, ArrowLeft } from 'lucide-svelte';

	let {
		teamKey,
		gameStage,
		color,
		next,
		prev
	}: {
		teamKey: string;
		gameStage: string;
		color: string;
		prev: () => void;
		next: () => void;
	} = $props();
</script>

<header class="flex justify-between gap-1 border-b border-white/10 p-2 text-xl font-bold">
	<span class={color === 'blue' ? 'text-steel-blue' : 'text-imperial-red'}>
		{teamKey}
	</span>
	<div class="align-item-center flex gap-2">
		<span class="select-none">{gameStage}</span>
		<button onclick={() => prev()} disabled={gameStage === 'Auto'} class="disabled:opacity-30">
			<ArrowLeft />
		</button>
		<button onclick={() => next()} disabled={gameStage === 'Post'} class="disabled:opacity-30">
			<ArrowRight />
		</button>
	</div>
</header>
