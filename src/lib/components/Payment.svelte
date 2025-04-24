<script lang="ts">
	import type { Payment } from '$lib/types/order';
	import StatusBadge from './StatusBadge.svelte';

	let { payment }: { payment: Payment } = $props();
</script>

<table class="w-full divide-y divide-gray-600">
	<thead>
	</thead>
	<tbody class="divide-y divide-gray-200 bg-gray-100/50">
			<tr>
				<td class="px-3 py-1.5 text-sm whitespace-nowrap text-gray-700 w-full">Payment</td>
				<td class="px-3 py-1.5 text-sm whitespace-nowrap text-gray-700"><StatusBadge status={payment.status} /></td>
			</tr>
			<tr>
				<td class="px-3 py-1.5 text-sm whitespace-nowrap text-gray-700 w-full">Subtotal</td>
				<td class="px-3 py-1.5 text-sm whitespace-nowrap text-gray-700 text-right font-mono">{(payment.subTotal / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
			</tr>
			<tr>
				<td class="px-3 py-1.5 text-sm whitespace-nowrap text-gray-700 w-full">Tax</td>
				<td class="px-3 py-1.5 text-sm whitespace-nowrap text-gray-700 text-right font-mono">{(payment.tax / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
			</tr>
			<tr>
				<td class="px-3 py-1.5 text-sm whitespace-nowrap text-gray-700 w-full">Shipping</td>
				<td class="px-3 py-1.5 text-sm whitespace-nowrap text-gray-700 text-right font-mono">{(payment.shipping / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
			</tr>
			<tr>
				<td class="px-3 py-1.5 text-sm whitespace-nowrap text-gray-700 w-full">Total</td>
				<td class="px-3 py-1.5 text-sm whitespace-nowrap text-gray-700 text-right font-mono font-bold">{(payment.total / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
			</tr>
	</tbody>
</table>
