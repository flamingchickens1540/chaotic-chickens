<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { localStore } from '@/localStore.svelte';

	let teamKey = localStore('teamKey', '');
	let matchKey = localStore('matchKey', '');
	let color = localStore('color', '');
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

	<select
		name="color"
		bind:value={color.value}
		class="col-span-2 block w-full rounded bg-gunmetal p-4"
	>
		<option selected value="">Select a color</option>
		<option value="blue">Blue</option>
		<option value="red">Red</option>
	</select>

	<button
		class="w-full rounded bg-gunmetal p-4 text-lg font-semibold {disabled}"
		onclick={() => {
			browser && localStorage.removeItem('matchData');
			goto('/match-scout');
		}}>Scout</button
	>
</div>
