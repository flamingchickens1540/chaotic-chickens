<script lang="ts">
	import { ArrowRight, ArrowLeft } from 'lucide-svelte';

	let {
		team_key,
		game_stage,
		color,
		next_page,
		prev_page
	}: {
		team_key: number;
		game_stage: string;
		color: string;
		prev_page?: () => void;
		next_page?: () => void;
	} = $props();
</script>

<header class="flex justify-between gap-1 border-b-1 border-white/10 p-2 text-lg font-semibold">
	<span class={color === 'blue' ? 'text-steel-blue' : 'text-imperial-red'}>
		{team_key}
	</span>
	<div class="align-item-center flex gap-2">
		<span class="select-none">{game_stage}</span>
		<button onclick={prev_page}>
			<ArrowLeft />
		</button>
		<button onclick={next_page}>
			<ArrowRight />
		</button>
	</div>
</header>
