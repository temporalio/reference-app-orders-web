import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const GET = async () => {
	const response = await fetch(`${env.SHIPMENT_API_URL}/shipments/stats`);
	const { workerCount, backlog } = await response.json();
	return json({ workerCount, backlog });
};
