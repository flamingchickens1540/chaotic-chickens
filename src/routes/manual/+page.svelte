<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { localStore } from '@/localStore.svelte';

	import ToggleGroup from '@/components/ToggleGroup.svelte';

	let teamKey = localStore('teamKey', '');
	let matchKey = localStore('matchKey', '');
	let color = localStore('color', 'red');
	let disabled = $derived(
		teamKey.value == '' || matchKey.value == '' || color.value == ''
			? 'pointer-events-none opacity-30'
			: ''
	);
</script>

<div class="m-2 flex flex-col gap-2">
	<textarea
		class="w-full rounded bg-gunmetal p-4"
		placeholder="Team Number"
		bind:value={teamKey.value}
	></textarea>

	<textarea
		class="w-full rounded bg-gunmetal p-4"
		placeholder="Match Key"
		bind:value={matchKey.value}
	></textarea>

	<ToggleGroup name="team-color" bind:selected={color.value} items={['red', 'blue']} />

	<button
		class="w-full rounded bg-gunmetal p-4 text-lg font-semibold {disabled}"
		onclick={() => {
			browser && localStorage.removeItem('matchData');
			goto('/match-scout');
		}}>Scout</button
	>
</div>
