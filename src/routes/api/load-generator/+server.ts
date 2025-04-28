import { json, type RequestHandler } from '@sveltejs/kit';
import { loadGenerator } from '$lib/server/load-generator';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const { action, config } = body;

	switch (action) {
		case 'start':
			loadGenerator.start(config);
			return json({ running: true });

		case 'stop':
			loadGenerator.stop();
			return json({ running: false });

		default:
			return json({ status: 'error' }, { status: 400 });
	}
};
