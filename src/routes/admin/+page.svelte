<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

	export let data;

	$: ({ limit, maintenanceMode } = data);

	$: newLimit = limit || 0;
	let promotion = 0;

	const onReset = async () => {
		await fetch('/api/reset', { method: 'POST' });
		await invalidateAll();
	};

	const onLimit = async () => {
		await fetch('/api/limit', { method: 'POST', body: JSON.stringify({ limit: newLimit }) });
		await invalidateAll();
	};

	const onMaintenanceMode = async () => {
		await fetch('/api/maintenance', { method: 'POST' });
		await invalidateAll();
	};
</script>

<div class="flex flex-col gap-4 items-center justify-start">
	<h1>Store Manager</h1>
	<div class="flex gap-2 w-full">
		<div class="w-full p-4 flex flex-col gap-4 bg-white border border-black rounded">
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
					<input type="number" bind:value={newLimit} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
					<button on:click={onLimit} class="w-full">Set</button>
					<button on:click={onReset} class="w-full">Reset</button>
					<button on:click={onMaintenanceMode} class="w-full text-nowrap">Maintenance Mode</button>
				</div>
		</div>
	</div>
</div>
