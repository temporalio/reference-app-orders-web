<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import FulfillmentDetails from '$lib/components/fulfillment-details.svelte';
	import OrderActions from '$lib/components/order-actions.svelte';

	$: ({ order } = $page.data);

	onMount(() => {
		const finalStatuses = ['completed', 'failed', 'cancelled'];

		const interval = setInterval(() => {
			const isFinal = finalStatuses.includes(order.status);
			if (!isFinal) {
				invalidate('data:order');
			} else {
				clearInterval(interval);
			}
		}, 500);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<section>
	<div class="container">
		<h1>{$page.params.id}</h1>
		<FulfillmentDetails {order} />
		{#if order.status === 'customerActionRequired'}
			<OrderActions id={$page.params.id} />
		{/if}
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 2rem;
		background-color: white;
		padding: 2rem;
		border-radius: 0.5rem;
	}
</style>
