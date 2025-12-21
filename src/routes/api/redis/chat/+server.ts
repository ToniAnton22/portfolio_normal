import { getRedisClient } from '$lib/server/redis/client';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	const redis = await getRedisClient();
	if (!redis) {
		return error(500, { message: "Couldn't fetch chat data.", success: false });
	}
	const key = cookies.get('key');
	if (!key) {
		return json(
			{ message: "Couldn't load chat due to missing key", success: false },
			{ status: 404 }
		);
	}
	const data = await redis?.get(key);

	return json({ data, message: 'Success', success: true }, { status: 200 });
};

export const POST: RequestHandler = async ({ cookies, request }) => {
	const redis = await getRedisClient();
	const requestData = await request.json();
	if (!redis) {
		return error(500, { message: "Couldn't fetch chat data.", success: false });
	}
	const key = cookies.get('key');
	if (!key) {
		return json(
			{ message: "Couldn't load chat due to missing key", success: false },
			{ status: 404 }
		);
	}
	const data = await redis?.set(key, requestData);

	return json({ data, message: 'Success', success: true }, { status: 200 });
};
