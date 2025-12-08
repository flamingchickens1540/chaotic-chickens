<script lang="ts">
	import { type Action } from '@/types';
	import { X } from 'lucide-svelte';

	let { phase, action, remove }: { phase: 'Auto' | 'Tele'; action: Action; remove: () => void } =
		$props();
</script>

<div
	class="flex w-full flex-row justify-between rounded p-2 {phase == 'Auto'
		? 'bg-jungle-green'
		: 'bg-eminence'}"
>
	<span>{action.match(/[A-Z][a-z]+/g)?.join(' ')}</span>
	<button onclick={() => remove()}><X /></button>
</div>
