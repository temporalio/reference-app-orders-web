<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import ItemDetails from '$lib/components/ItemDetails.svelte';
	import ShipmentStatus from '$lib/components/shipment-status.svelte';
	import type { Shipment } from '$lib/types/order';

	let { data } = $props();
	let shipment: Shipment = $derived(data.shipment);
	let status = $derived(shipment?.status);
	let broadcaster: BroadcastChannel;

	$effect(() => {
		if (shipment?.id && !broadcaster) {
			broadcaster = new BroadcastChannel(`shipment-${shipment.id}`);			
			broadcaster?.addEventListener('message', (event) => {
				status = event.data;
			});
		}
	});

	const dispatchShipment = async (shipment: Shipment) => {
		const signal = { name: 'ShipmentUpdate', status: 'dispatched' };
		await fetch('/api/shipment', { method: 'POST', body: JSON.stringify({ shipment, signal }) });
		status = 'dispatched';
		broadcaster?.postMessage(status);
	};

	const deliverShipment = async (shipment: Shipment) => {
		const signal = { name: 'ShipmentUpdate', status: 'delivered' };
		await fetch('/api/shipment', { method: 'POST', body: JSON.stringify({ shipment, signal }) });
		status = 'delivered';
		broadcaster?.postMessage(status);
	};
</script>

<Card>
	<div class="w-full">
		<div class="flex flex-col md:flex-row items-center justify-between gap-2 w-full">
			<Heading>{shipment.id}</Heading>
			<ShipmentStatus {status} />
		</div>
		<ItemDetails items={shipment.items} />
	</div>
	{#snippet actionButtons()}
		<Button
			disabled={status !== 'booked'}
			onClick={() => dispatchShipment(shipment)}>
			Dispatch
		</Button>
		<Button
			disabled={status !== 'dispatched'}
			onClick={() => deliverShipment(shipment)}>
			Deliver
		</Button>
	{/snippet}
</Card>

