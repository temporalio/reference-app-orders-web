import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const order = JSON.parse(data.get('order') as string);

		await fetch('/api/order', { method: 'POST', body: JSON.stringify({ order }) });
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return redirect(303, `/orders/${order?.id}`);
	}
} satisfies Actions;
