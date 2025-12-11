<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	if (browser && !(localStorage.getItem('username') && localStorage.getItem('scoutId'))) {
		goto('/login');
	}
</script>

<div class="flex min-h-svh flex-col justify-center gap-8 p-8">
	<h1 class="text-center text-3xl font-bold">Chaotic Chickens :3</h1>
	<button class="text-l rounded bg-gunmetal px-4 py-2 text-center disabled:text-white/50">
		Log In
	</button>
</div>
