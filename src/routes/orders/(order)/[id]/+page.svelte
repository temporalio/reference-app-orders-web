<script lang="ts">
	import { onMount } from 'svelte';
	import { goto, invalidate } from '$app/navigation';
	import Fulfillment from '$lib/components/Fullfillment.svelte';
	import Button from '$lib/components/Button.svelte';
	import { page } from '$app/state';
	import type { Action } from '$lib/types/order';
	import Card from '$lib/components/Card.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import StatusBadge from '$lib/components/StatusBadge.svelte';

	let { data } = $props();
	let order = $derived(data.order);
	let id = $derived(page.params.id);
	let loading = $state(false);

	onMount(() => {
		const finalStatuses = ['completed', 'failed', 'cancelled', 'timedOut'];

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

	const sendAction = async (action: Action) => {
		loading = true;
		await fetch('/api/order-action', { method: 'POST', body: JSON.stringify({ id, action }) });
		setTimeout(() => {
			loading = false;
			if (action === 'cancel') {
				goto(`/orders`, { invalidateAll: true });
			} else {
				goto(`/orders/${id}`, { invalidateAll: true });
			}
		}, 1000);
	};

	const actionRequired = $derived(order.status === 'customerActionRequired');
</script>

<Card>
	<div class="w-full flex flex-col gap-2">
		<div class="flex flex-row items-center gap-2 w-full">
			<StatusBadge status={order.status} />
			<Heading>{order.id}</Heading>
		</div>
		<Fulfillment {order} />
	</div>
	{#snippet actionButtons()}
		{#if actionRequired}
			<div class="flex items-center justify-end gap-2">
				<Button {loading} onClick={() => sendAction('amend')}>Amend</Button>
				<Button {loading} onClick={() => sendAction('cancel')}>Cancel</Button>
			</div>
		{:else}
			<p class="px-4 py-2 text-sm font-light"><i>Customer {order.customerId}</i></p>
		{/if}
	{/snippet}
</Card>
