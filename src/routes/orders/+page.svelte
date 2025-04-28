<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Link from '$lib/components/Link.svelte';
	import StatusBadge from '$lib/components/StatusBadge.svelte';
	import TableWithHeader from '$lib/components/TableWithHeader.svelte';

	let { data } = $props();
	let orders = $derived(data.orders);

	const columns = [
		{
			title: 'Order ID',
			key: 'id',
			formatter: (value: string) => ({
				type: Link,
				props: { value, href: `/orders/${value}` }
			})
		},
		{
			title: 'Date & Time',
			key: 'receivedAt',
			formatter: (value: string) => {
				return `${new Date(value).toLocaleDateString()} ${new Date(value).toLocaleTimeString()}`;
			}
		},
		{
			title: 'Status',
			key: 'status',
			formatter: (value: string) => ({
				type: StatusBadge,
				props: { status: value }
			})
		}
	];
</script>

<TableWithHeader title="Orders" {columns} data={orders}>
	{#snippet action()}
		<Button onClick={() => goto('/orders/new')}>New Order</Button>
	{/snippet}
</TableWithHeader>
