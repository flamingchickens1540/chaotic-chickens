<script lang="ts">
	import { type FrontendTeamMatch } from '@/types';

	import Rate from '@/components/Rate.svelte';
	import ToggleGroup from '@/components/ToggleGroup.svelte';
	import { goto } from '$app/navigation';

	let { match = $bindable() }: { match: FrontendTeamMatch } = $props();

	async function submit() {
		const res = await fetch('/api/team-match', {
			method: 'POST',
			body: JSON.stringify(match)
		});

		if (res.status !== 200) {
			alert('Failed to submit');
			console.log('Failed to submit:', res);
			return;
		}

		goto('/');
	}
</script>

<div class="flex flex-col gap-4 overflow-y-scroll">
	<div class="flex flex-col gap-2">
		<h2 class="text-center text-2xl font-bold">Moved During Auto?</h2>
		<ToggleGroup
			name="auto-move"
			bind:selected={match.autoMobility}
			items={[
				{ display: 'true', value: true },
				{ display: 'false', value: false }
			]}
		/>
	</div>

	<div class="flex flex-col gap-2">
		<h2 class="text-center text-2xl font-bold">Auto Start</h2>
		<ToggleGroup
			name="auto-start"
			bind:selected={match.autoStart}
			items={['Close', 'Mid', 'Far']}
		/>
	</div>

	<div class="flex flex-col gap-2">
		<h2 class="text-center text-2xl font-bold">Skill</h2>
		<Rate name="skill" bind:value={match.skill} />
	</div>

	<textarea
		name="notes"
		placeholder="Notes..."
		bind:value={match.notes}
		class="m-1 min-h-32 rounded bg-gunmetal p-2"
	></textarea>

	<button
		class="mb-4 grow-0 rounded-lg bg-xanthous p-4 text-xl font-semibold transition-transform duration-100 ease-in-out active:scale-95"
		onclick={submit}
	>
		Submit!
	</button>
</div>
