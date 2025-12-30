import { getLangCache } from '$lib/server/redis/client';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
	const redis = await getLangCache();
	const { query } = await request.json();

	if (!redis) {
		return error(500, { message: "Couldn't fetch chat data.", success: false });
	}

	const data = await redis?.search({
		prompt: query,
		similarityThreshold: 0.7
	});

	return json({ data, message: 'Success', success: true }, { status: 200 });
};

export const POST: RequestHandler = async ({ request }) => {
	const redis = await getLangCache();
	const { query, response } = await request.json();
	if (!redis) {
		return error(500, { message: "Couldn't fetch chat data.", success: false });
	}

	const data = await redis?.set({
		prompt: query,
		response,
		attributes: {
			createdAt: new Date().toISOString()
		},
		ttlMillis: 60 * 60 * 24 * 7
	});

	return json({ data, message: 'Success', success: true }, { status: 200 });
};
