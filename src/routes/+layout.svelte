<script lang="ts">
	import { page } from '$app/state';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import './app.css';

	let { children } = $props();

	let title = $derived(page.url.pathname.slice(1))

	const paths = $derived(page.url.pathname.split('/').filter(Boolean));
</script>


<svelte:head>
	<title>OMS | {title}</title>
	<meta name="description" content="OMS App" />
</svelte:head>

<div class="relative flex flex-col min-h-screen">
	<header class="px-4 py-1 flex justify-end bg-gray-900/20">
		<nav class="flex items-center justify-between w-full mx-auto h-[60px]">
			<Breadcrumb {paths} />
		</nav>
	</header>
	<main class="flex flex-col items-center justify-center p-4 w-full h-full">
		<div class="w-full mx-auto max-w-6xl flex flex-col items-start gap-4 py-6">
			{@render children()}
		</div>
	</main>
</div>
