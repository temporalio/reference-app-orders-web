<script lang="ts">
	import { invalidateAll } from '$app/navigation';

	export let data;

	$: ({ limit, maintenanceMode } = data);

	$: newLimit = limit || 0;

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

<div class="flex items-center justify-start">
	<h1>Admin</h1>
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
	<input type="number" bind:value={newLimit} />
	<button on:click={onLimit}>Set Limit</button>
	<button on:click={onMaintenanceMode}>Maintenance Mode</button>
	<button on:click={onReset}>Reset</button>
</div>
