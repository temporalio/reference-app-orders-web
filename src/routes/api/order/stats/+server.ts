import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const GET = async () => {
	const response = await fetch(`${env.ORDER_API_URL}/orders/stats`);
	const { workerCount, completeRate, backlog } = await response.json();
	return json({ workerCount, completeRate, backlog });
};
