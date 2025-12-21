import { getRedisClient } from '$lib/server/redis/client';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const redis = await getRedisClient();
	if (!redis) {
		return error(500, { message: "Couldn't fetch chat data.", success: false });
	}

	const data = await redis?.get('info');

	return json({ data, message: 'Success', success: true }, { status: 200 });
};
