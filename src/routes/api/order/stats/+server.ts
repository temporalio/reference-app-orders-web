import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const GET = async () => {
    try {
        const response = await fetch(`${env.ORDER_API_URL}/orders/stats`);
        const { completeRate, backlog } = await response.json();
        return json({ completeRate, backlog });
    } catch (error) {
        console.error('Failed to fetch backlog:', error);
        return json(0, { status: 500 });
    }
};