<script lang="ts">
	import type { Payment } from '$lib/types/order';
	import StatusBadge from './status-badge.svelte';

	export let payment: Payment;
</script>

<div class="flex flex-col gap-2 mt-4 p-2 rounded bg-gray-200 w-full">
	<div class="flex justify-between">
		<p class="">Payment</p>
		<div class="text-right">
			<StatusBadge status={payment.status} />
		</div>
	</div>
	<div class="flex justify-between">
		<p class="">Subtotal</p>
		<p class="text-right pr-2">
			{(payment.subTotal / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
		</p>
	</div>
	<div class="flex justify-between">
		<p class="">Tax</p>
		<p class="text-right pr-2">
			{(payment.tax / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
		</p>
	</div>
	<div class="flex justify-between">
		<p class="">Shipping</p>
		<p class="text-right pr-2">
			{(payment.shipping / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
		</p>
	</div>
	<div class="flex justify-between border-t-2 border-black">
		<p class=" font-bold">Total</p>
		<p class="font-bold text-right pr-2">
			{(payment.total / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
		</p>
	</div>
</div>
