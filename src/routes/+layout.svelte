<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Chaotic Chickens</title>
</svelte:head>

<div class="m-auto max-w-2xl">
	{@render children?.()}
</div>
