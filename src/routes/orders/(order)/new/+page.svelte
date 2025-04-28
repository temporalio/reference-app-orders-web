<script lang="ts">
	import { generateOrders, type Order, type OrderItem } from '$lib/types/order';
	import Button from '$lib/components/Button.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import ItemDetails from '$lib/components/ItemDetails.svelte';
	import Card from '$lib/components/Card.svelte';
	import Heading from '$lib/components/Heading.svelte';

	const orders = generateOrders(20);
	let order: Order = $state(orders[0]);
	let loading = $state(false);

	const onItemClick = async (item: Order) => {
		order = item;
	};
</script>

{#snippet orderDetails(item: OrderItem)}
	<Card>
		<ItemDetails items={[item]} />
		{#snippet actionButtons()}
			<div class="text-xs text-gray-600/80 px-4">{item.description}</div>
		{/snippet}
	</Card>
{/snippet}

<Heading>New Order</Heading>
<div class="flex flex-col gap-2">
	<div class="flex flex-wrap gap-0.5">
		{#each orders as item, index}
			<button
				onclick={() => onItemClick(item)}
				type="button"
				class="relative cursor-pointer inline-flex items-center {order.id === item.id
					? 'bg-blue-500 hover:bg-blue-600 text-white'
					: 'bg-white hover:bg-gray-50'} px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-200 ring-inset focus:z-10"
				>Package {index + 1}</button
			>
		{/each}
	</div>
	<form
		class="flex w-full flex-col gap-2 items-end"
		method="POST"
		use:enhance={() => {
			loading = true;
			return async ({ result }) => {
				if (result.type === 'redirect') {
					goto(result.location);
				} else {
					loading = false;
				}
			};
		}}
	>
		{#each order.items as item}
			{@render orderDetails(item)}
		{/each}
		<input type="hidden" name="order" value={JSON.stringify(order)} />
		<Button type="submit" {loading} disabled={!order}>Submit</Button>
	</form>
</div>
