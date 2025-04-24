<script lang="ts">
	import Logo from '$lib/components/logo.svelte';
	import './app.css';

	let { children } = $props();
</script>

<div class="relative flex flex-col min-h-screen">
	<header class="px-4 py-2 flex justify-end bg-gray-900/90">
		<nav class="flex items-center justify-between w-full mx-auto h-[80px]">
			<Logo />
		</nav>
	</header>
	<main class="flex flex-col items-center justify-center p-4 w-full h-full">
		<div class="w-full mx-auto max-w-6xl flex flex-col items-start gap-4">
			{@render children()}
		</div>
	</main>
</div>
