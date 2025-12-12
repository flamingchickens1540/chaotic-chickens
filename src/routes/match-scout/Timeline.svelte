<script lang="ts">
	import { type Timeline } from '@/types';
	import Drawer from '$lib/components/Drawer.svelte';
	import TimelineAction from './TimelineAction.svelte';
	import { MoveDown, MoveUp } from 'lucide-svelte';

	let {
		displaying = $bindable(),
		timeline = $bindable(),
		mostRecentAction = $bindable()
	}: {
		displaying: boolean;
		timeline: Timeline;
		mostRecentAction: 'Auto' | 'Tele' | null;
	} = $props();

	const removeAuto = (index: number) => {
		timeline.auto.splice(index, 1);
	};
	const removeTele = (index: number) => {
		timeline.tele.splice(index, 1);
	};

	const moveUp = () => {
		mostRecentAction = 'Auto';
		const firstTele = timeline.tele.shift();
		timeline.auto.push(firstTele!);
	};
	const moveDown = () => {
		mostRecentAction = 'Tele';
		const lastAuto = timeline.auto.pop()!;
		// NOTE This function will never be called while the conversion is invalid
		// Thus our conversion is safe
		timeline.tele.unshift(lastAuto as any);
	};

	let autoLen = $derived(timeline.auto.length);
	let teleLen = $derived(timeline.tele.length);
</script>

<Drawer bind:displaying>
	{#each timeline.tele as action, i}
		<TimelineAction phase="Tele" {action} remove={() => removeTele(i)} />
	{/each}
	{#if autoLen + teleLen > 0}
		<div class="flex w-full items-center gap-8 rounded bg-gunmetal p-2">
			<button class="disabled:opacity-30" disabled={teleLen === 0} onclick={moveUp}
				><MoveUp /></button
			>
			<hr class="h-1 grow" />
			<button class="disabled:opacity-30" disabled={autoLen === 0} onclick={moveDown}
				><MoveDown /></button
			>
		</div>
	{/if}
	{#each timeline.auto as action, i}
		<TimelineAction phase="Auto" {action} remove={() => removeAuto(i)} />
	{/each}
</Drawer>
