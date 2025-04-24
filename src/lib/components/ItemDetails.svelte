<script lang="ts">
	import type { OrderItem } from '$lib/types/order';

	let { items = [] }: { items: OrderItem[] } = $props();
</script>

<div class="flex flex-col gap-2 container">
	{#each items as item}
		<div class="flex gap-2 items-center">
			<p class="flex flex-col items-center shadow-md justify-center w-8 h-8 rounded-full bg-blue-500/90 text-white font-semibold">{item.quantity}</p>
			<p class="text-base font-light">{item.sku}</p>
		</div>
	{/each}
</div>
