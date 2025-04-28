import { json, type RequestHandler } from '@sveltejs/kit';
import { loadGenerator } from '$lib/server/load-generator';

export const GET: RequestHandler = async () => {
	return json({
		running: loadGenerator.isRunning(),
		config: loadGenerator.getConfig()
	});
};
