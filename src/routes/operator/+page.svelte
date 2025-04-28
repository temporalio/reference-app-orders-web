<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Heading from '$lib/components/Heading.svelte';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import Charts from '$lib/components/Charts.svelte';

	let { data } = $props();
	let { running, config } = $derived(data);
	let newLimit = $derived(config.ordersPerSecond ? config.ordersPerSecond : 1);

	const onStop = async () => {
		await fetch('/api/load-generator', {
			method: 'POST',
			body: JSON.stringify({ action: 'stop' })
		});
		await invalidateAll();
	};

	const onStart = async () => {
		await fetch('/api/load-generator', {
			method: 'POST',
			body: JSON.stringify({ action: 'start', config: { ...config, ordersPerSecond: newLimit } })
		});
		await invalidateAll();
	};

	const onToggle = async () => {
		if (running) {
			await onStop();
		} else {
			await onStart();
		}
	};
</script>

<Heading>Operator</Heading>
<Card>
	<div class="w-full flex flex-col gap-4">
		<h3 class="text-xl font-bold">Load Testing</h3>
		<p>
			Status: <strong class:text-red-500={!running} class:text-green-500={running}
				>{running ? 'Running' : 'Stopped'}</strong
			>
		</p>
		<div
			class="flex w-48 items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-600"
		>
			<input
				bind:value={newLimit}
				type="number"
				name="price"
				id="price"
				class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
				placeholder="1"
				aria-describedby="price-currency"
			/>
			<div id="price-currency" class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
				orders / second
			</div>
		</div>
	</div>
	{#snippet actionButtons()}
		<Button onClick={onToggle} disabled={!running}>Stop</Button>
		<Button onClick={onToggle} disabled={running}>Start</Button>
	{/snippet}
</Card>
<Charts />
