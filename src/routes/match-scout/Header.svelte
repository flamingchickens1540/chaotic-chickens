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
		prev?: () => void;
		next?: () => void;
	} = $props();

	const disabled = 'pointer-events-none opacity-30';
	const can_next = $derived(game_stage === 'Post' ? disabled : '');
	const can_prev = $derived(game_stage === 'Pre' ? disabled : '');
</script>

<header class="flex justify-between gap-1 border-b-1 border-white/10 p-2 text-xl font-bold">
	<span class={color === 'blue' ? 'text-steel-blue' : 'text-imperial-red'}>
		{team_key}
	</span>
	<div class="align-item-center flex gap-2">
		<span class="select-none">{game_stage}</span>
		<button onclick={() => prev()} class={can_prev}>
			<ArrowLeft />
		</button>
		<button onclick={() => next()} class={can_next}>
			<ArrowRight />
		</button>
	</div>
</header>
