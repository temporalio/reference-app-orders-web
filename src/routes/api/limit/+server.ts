import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request }) => {
	const { limit } = await request.json();

	try {
		const response = await fetch(`${env.FRAUD_API_URL}/limit`, {
			method: 'POST',
			body: JSON.stringify({ limit })
		});
		return json({ status: 'ok', body: response });
	} catch (e) {
		return json({ status: 'error' });
	}
};
