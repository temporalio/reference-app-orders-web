import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const GET = async () => {
    const response = await fetch(`${env.BILLING_API_URL}/charge/stats`);
    const { workerCount, completeRate, backlog } = await response.json();
    return json({ workerCount, completeRate, backlog });
};