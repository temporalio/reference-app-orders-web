import { env } from '$env/dynamic/private';

export const load = async () => {
	const response = await fetch(`${env.FRAUD_API_URL}/limit`);
	const { limit } = await response.json();
	return { limit };
};
