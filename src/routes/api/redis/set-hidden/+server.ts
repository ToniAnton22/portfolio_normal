import { getRedisClient } from '$lib/server/redis/client';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const PUT: RequestHandler = async ({ cookies, request }) => {
	try {
		const hidden = await request.json();
		const redis = await getRedisClient();
		if (!redis) {
			return error(500, { message: "Couldn't fetch chat data.", success: false });
		}
		const key = cookies.get('key');
		const data = await redis?.set(
			`${key}-hidden`,
			JSON.stringify({
				hidden,
				createdAt: new Date().toISOString()
			})
		);
		await redis?.expire(`${key}-hidden`, 60 * 60 * 24 * 7);
		return json({ data, message: 'Success', success: true }, { status: 200 });
	} catch (e) {
		console.error(e);
		return error(500, { message: "Couldn't fetch chat data.", success: false });
	}
};
