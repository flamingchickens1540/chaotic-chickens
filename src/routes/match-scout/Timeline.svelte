<script lang="ts">
	import { type Timeline } from '@/types';
	import Drawer from '$lib/components/Drawer.svelte';
	import TimelineAction from './TimelineAction.svelte';
	import { MoveDown, MoveUp } from 'lucide-svelte';

	let {
		displaying = $bindable(),
		timeline = $bindable()
	}: {
		displaying: boolean;
		timeline: Timeline;
	} = $props();

	const moveUp = () => {
		const firstTele = timeline.tele.shift();
		timeline.auto.push(firstTele!);
	};
	const moveDown = () => {
		const lastAuto = timeline.auto.pop()!;
		// NOTE This function will never be called while the conversion is invalid
		// Thus our conversion is safe
		timeline.tele.unshift(lastAuto as any);
	};

	let auto_len = $derived(timeline.auto.length);
	let tele_len = $derived(timeline.tele.length);
</script>

<Drawer bind:displaying>
	{#each timeline.tele as action, i}
		<TimelineAction phase="Tele" {action} remove={remove_tele(i)} />
	{/each}
	{#if auto_len + tele_len > 0}
		<div class="flex w-full items-center gap-8 rounded bg-gunmetal p-2">
			<button class="disabled:opacity-30" disabled={tele_len === 0} onclick={moveUp}
				><MoveUp /></button
			>
			<hr class="h-1 grow" />
			<button class="disabled:opacity-30" disabled={auto_len === 0} onclick={moveDown}
				><MoveDown /></button
			>
		</div>
	{/if}
	{#each timeline.auto as action, i}
		<TimelineAction phase="Auto" {action} remove={remove_tele(i)} />
	{/each}
</Drawer>
