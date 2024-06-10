<script lang="ts">
	import { invalidateAll } from '$app/navigation';

	export let data;

	$: ({ limit } = data);

	$: newLimit = limit || 0;

	const onReset = async () => {
		await fetch('/api/reset', { method: 'POST' });
		await invalidateAll();
	};

	const onLimit = async () => {
		await fetch('/api/limit', { method: 'POST', body: JSON.stringify({ limit: newLimit }) });
		await invalidateAll();
	};
</script>

<div class="flex items-center justify-start">
	<h1>Fraud Check</h1>
	<p>
		Limit: <strong
			>{limit
				? (limit / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
				: 'Unlimited'}</strong
		>
	</p>
	<input type="number" bind:value={newLimit} />
	<button on:click={onLimit}>Set Limit</button>
	<button on:click={onReset}>Reset</button>
</div>
