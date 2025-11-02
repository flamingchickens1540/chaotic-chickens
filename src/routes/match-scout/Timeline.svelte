<script lang="ts">
	import Drawer from '$lib/components/Drawer.svelte';

	let {
		displaying = $bindable()
	}: {
		displaying: boolean;
	} = $props();
</script>

<Drawer bind:displaying></Drawer>
