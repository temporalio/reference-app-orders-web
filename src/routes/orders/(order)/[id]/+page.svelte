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

<div class="flex flex-col bg-white p-8 rounded-lg shadow-md container">
	<h1>{$page.params.id}</h1>
	<FulfillmentDetails {order} />
	{#if order.status === 'customerActionRequired'}
		<OrderActions id={$page.params.id} />
	{/if}
</div>
