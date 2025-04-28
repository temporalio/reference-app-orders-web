<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import Heading from '$lib/components/Heading.svelte';

	let { data } = $props();
	let { limit, maintenanceMode } = $derived(data);
	let newLimit = $derived(limit ? limit / 100 : 0);

	const onReset = async () => {
		await fetch('/api/reset', { method: 'POST' });
		await invalidateAll();
	};

	const onLimit = async () => {
		await fetch('/api/limit', { method: 'POST', body: JSON.stringify({ limit: newLimit * 100 }) });
		await invalidateAll();
	};

	const onMaintenanceMode = async () => {
		await fetch('/api/maintenance', { method: 'POST' });
		await invalidateAll();
	};
</script>

<Heading>Store Manager</Heading>
<Card>
	<div class="w-full flex flex-col gap-4">
		<h3 class="text-xl font-bold">Fraud</h3>
		<p>
			Fraud Limit: <strong
				>{limit
					? (limit / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
					: 'Unlimited'}</strong
			>
		</p>
		<p>
			Maintenance Mode: <strong>{maintenanceMode ? 'Enabled' : 'Disabled'}</strong>
		</p>
		<div class="flex items-center gap-2">
			<div
				class="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
			>
				<div class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">$</div>
				<input
					bind:value={newLimit}
					type="number"
					name="price"
					id="price"
					class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
					placeholder="0.00"
					aria-describedby="price-currency"
				/>
				<div id="price-currency" class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
					USD
				</div>
			</div>
			<Button onClick={onLimit}>Set Limit</Button>
		</div>
	</div>
	{#snippet actionButtons()}
		<Button onClick={onReset}>Reset</Button>
		<Button onClick={onMaintenanceMode} disabled={maintenanceMode}>Toggle Maintenance Mode</Button>
	{/snippet}
</Card>
