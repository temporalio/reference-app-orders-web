import { env } from '$env/dynamic/private';

export const load = async () => {
	const response = await fetch(`${env.FRAUD_API_URL}/settings`);
	const { limit, maintenanceMode } = await response.json();
	return { limit, maintenanceMode };
};
