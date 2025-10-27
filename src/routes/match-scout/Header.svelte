<script lang="ts">
	import UndoButton from './UndoButton.svelte';

	let {
		team_key,
		team_color,
		game_stage,
		timeline = $bindable()
	}: {
		team_key: number;
		team_color: string;
		game_stage: string;
		timeline?: string[];
	} = $props();
</script>

<header
	class="font-heading flex place-content-center border-b-2 border-white/10 p-2 text-lg font-semibold"
>
	<span
		class="mx-4"
		style={team_color === 'blue' ? 'color: #2196F3 !important' : 'color: #F44336 !important'}
	>
		{team_key}
	</span>
	<span class="mx-4"> {game_stage} </span>
</header>
