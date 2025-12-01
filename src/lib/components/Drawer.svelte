<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		displaying = $bindable(),
		gap = 'gap-2',
		p = 'p-2',
		text = 'text-white',
		max_h = 'max-h-[80svh]',
		min_h = 'min-h-[40svh]',
		scrollbar = false
	}: {
		children?: Snippet<[]>;
		displaying: boolean;
		gap?: string;
		p?: string;
		text?: string;
		max_h?: string;
		min_h?: string;
		scrollbar?: boolean;
	} = $props();
</script>

<div
	class="fixed inset-0 transition-all will-change-transform {displaying
		? 'backdrop-blur-lg'
		: 'translate-y-full'}"
	onclick={(e: Event) => {
		if (e.target === e.currentTarget) displaying = false;
	}}
>
	<div
		class="{!scrollbar
			? 'no-scrollbar'
			: ''} absolute inset-x-0 bottom-0 flex shadow-eminence/10 {min_h} {max_h} m-auto w-dvw max-w-xl flex-col items-center {gap} overflow-y-scroll rounded-t-lg bg-gunmetal {p} {text}"
	>
		{#if children}
			{@render children()}
		{:else}
			<span class="m-auto text-xl font-semibold">Nothing here :3</span>
		{/if}
	</div>
</div>
