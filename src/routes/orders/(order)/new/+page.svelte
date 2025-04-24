<script lang="ts">
	import { generateOrders, type Item, type Order, type OrderItem } from '$lib/types/order';
	import Logo from '$lib/components/logo.svelte';
	import Button from '$lib/components/Button.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	const orders = generateOrders(20);
	let order: Order = $state(orders[0]);
	let loading = $state(false);

	const onItemClick = async (item: Order) => {
		order = item;
	};
</script>

{#snippet orderDetails(item: OrderItem)}
	<div class="rounded-xl shadow-lg bg-white p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100 bg-white rounded-lg shadow-md">
		<div class="flex justify-between items-center mb-4">
			<h3 class="text-lg font-bold text-gray-800">{item.sku}</h3>
			<div class="rounded-full bg-blue-100 text-blue-600 font-bold px-3 py-1 text-sm"><span class="text-xl">{item.quantity}</span>x</div>
		</div>
		<div class="text-gray-600">{item.description}</div>
	</div>
{/snippet}

{#snippet orderButton(item: Order, index: number)}
	<button
		class="w-full rounded-full bg-gray-200 text-gray-800 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
		class:bg-blue-400={item.id === order.id}
		onclick={() => onItemClick(item)}
		>
		Order {index + 1}
	</button>
{/snippet}


<section class="flex flex-col items-center justify-center min-h-screen p-4">
	{#if loading}
		<Logo loading />
	{:else}
		<div class="flex gap-2">
			<div class="flex flex-col gap-2 w-1/3 min-h-fit overflow-y-auto">
				{#each orders as item, index}
					{@render orderButton(item, index)}
				{/each}
			</div>
			<form 
				class="w-full flex flex-col gap-2 px-2 items-end"
				method="POST" 
				use:enhance={() => {
					loading = true;
					return async ({ result }) => {
						if (result.type === 'redirect') {
							goto(result.location);
						} else {
							loading = false;;
						}
					}
				}}
				>
				{#each order.items as item}
					{@render orderDetails(item)}
				{/each}
				<input type="hidden" name="order" value={JSON.stringify(order)} />
				<Button type="submit" disabled={!order}>Submit</Button>
			</form>
		</div>
	{/if}
</section>
