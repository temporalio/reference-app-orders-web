<script lang="ts">
	import { type Fulfillment, type Order } from '$lib/types/order';
	import ItemDetails from './ItemDetails.svelte';
	import Payment from './Payment.svelte';
	import ShipmentProgress from './ShipmentProgress.svelte';

	let { order }: { order: Order } = $props();
	let fulfillments: Fulfillment[] = $derived(order?.fulfillments || []);

	const getStatus = (fulfillment: Fulfillment): string => {
		if (!fulfillment.shipment) return fulfillment.status || 'unavailable';
		return fulfillment.shipment.status;
	};
</script>

<div class="flex flex-col gap-4 w-full items-start">
	{#each fulfillments as fulfillment}
		<div class="container">
			<div class="flex flex-col md:flex-row items-end justify-between w-full border-b-2 mb-1">
				<p class="text-lg text-gray-500/90 font-semibold italic">
					{#if fulfillment?.location}
						{fulfillment.location}
					{:else if fulfillment?.status == "cancelled"}
						Unavailable
					{:else}
						Action Required
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
