<script lang="ts">
	import Link from '$lib/components/Link.svelte';
	import TableWithHeader from '$lib/components/TableWithHeader.svelte';
	import StatusBadge from '$lib/components/StatusBadge.svelte';

	let { data } = $props();
	let shipments = $derived(data.shipments);

	const columns = [
		{
			title: 'Shipment ID',
			key: 'id',
			formatter: (value: string) => ({
				type: Link,
				props: { value, href: `/shipments/${value}` }
			})
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

<TableWithHeader title="Shipments" {columns} data={shipments} />
