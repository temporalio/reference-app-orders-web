<script lang="ts">
	import { onMount } from 'svelte';
	import { goto, invalidate } from '$app/navigation';
	import FulfillmentDetails from '$lib/components/fulfillment-details.svelte';
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/components/logo.svelte';
	import { page } from '$app/state';
	import type { Action } from '$lib/types/order';
	import Card from '$lib/components/Card.svelte';
	import Heading from '$lib/components/Heading.svelte';

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
		<Heading>{id}</Heading>
		<FulfillmentDetails {order} />	
	</div>
	{#snippet actionButtons()}
		{#if actionRequired}
			<div class="flex items-center justify-end gap-2">
				{#if loading}
					<Logo loading loadingText="Processing" />
				{:else}
					<Button onClick={() => sendAction('amend')}>Amend</Button>
					<Button onClick={() => sendAction('cancel')}>Cancel</Button>
				{/if}
			</div>
		{/if}
	{/snippet}
</Card>
