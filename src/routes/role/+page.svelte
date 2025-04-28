<script lang="ts">
	import Link from '$lib/components/Link.svelte';
	import TableWithHeader from '$lib/components/TableWithHeader.svelte';
	import type { TableColumns } from '$lib/types/ui';

	let { data } = $props();
	let personas = $derived(data.personas);

	const columns: TableColumns = [
		{
			title: 'Role',
			key: 'role',
			formatter: (value, row: Record<string, string>) => ({
				type: Link,
				props: { value, href: row.link }
			})
		},
		{
			title: 'Description',
			key: 'description'
		}
	];
</script>

<TableWithHeader title="Select Your Role" {columns} data={personas} />
