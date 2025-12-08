<script lang="ts">
	import { ArrowRight, ArrowLeft } from 'lucide-svelte';

	let {
		team_key,
		game_stage,
		color,
		next,
		prev
	}: {
		team_key: number;
		game_stage: string;
		color: string;
		prev: () => void;
		next: () => void;
	} = $props();
</script>

<header class="flex justify-between gap-1 border-b-1 border-white/10 p-2 text-xl font-bold">
	<span class={color === 'blue' ? 'text-steel-blue' : 'text-imperial-red'}>
		{team_key}
	</span>
	<div class="align-item-center flex gap-2">
		<span class="select-none">{game_stage}</span>
		<button onclick={() => prev()} disabled={game_stage === 'Auto'} class="disabled:opacity-30">
			<ArrowLeft />
		</button>
		<button onclick={() => next()} disabled={game_stage === 'Post'} class="disabled:opacity-30">
			<ArrowRight />
		</button>
	</div>
</header>
