<script lang="ts">
	import { page } from '$app/state';
	import { type Order } from '$lib/types/order';

	const actionRequired = $derived(
		page.data?.orders?.some((o: Order) => o?.status === 'customerActionRequired')
	);
	const statusColor = $derived(actionRequired ? '#EF8080' : '#366ee9');
</script>

<svg width="60" height="40" viewBox="0 0 120 60">
	<text fill={statusColor} x="55" y="50">OMS</text>
</svg>

<style>
	text {
		font-family: 'Kanit', sans-serif;
		font-size: 3.5rem;
		stroke-linejoin: round;
		text-anchor: middle;
		paint-order: stroke fill;
		stroke: #000;
		stroke-width: 12px;
		letter-spacing: -8px;
		font-weight: 600;
		text-transform: uppercase;
	}
</style>
