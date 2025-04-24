<script lang="ts">
	import { type Fulfillment, type Order } from '$lib/types/order';
	import ItemDetails from './ItemDetails.svelte';
	import Payment from './Payment.svelte';
	import ShipmentProgress from './ShipmentProgress.svelte';

	let { order }: { order: Order } = $props();
	let fulfillments: Fulfillment[] = $derived(order?.fulfillments || []);

	const getStatus = (fulfillment: Fulfillment) => {
		if (!fulfillment.shipment) return fulfillment.status;
		return fulfillment.shipment.status;
	};
</script>

<div class="flex flex-col gap-4 w-full items-start">
	{#each fulfillments as fulfillment}
		<div class="container">
			<div class="flex flex-col md:flex-row items-end justify-between w-full border-b-2 mb-1">
				<p>
					{#if fulfillment?.location}
						<i>{fulfillment.location}</i>
					{:else if fulfillment?.status == "cancelled"}
						<strong>Unavailable</strong>
					{:else}
						<strong>Action Required</strong>
					{/if}
				</p>
				<ShipmentProgress status={getStatus(fulfillment)} />
			</div>
			<div class="w-full flex flex-col md:flex-row items-start justify-between gap-2 my-4 items-center">
				<ItemDetails items={fulfillment.items} />
				{#if fulfillment.payment}
					<Payment payment={fulfillment.payment} />
				{/if}
			</div>
		</div>
	{/each}
</div>
