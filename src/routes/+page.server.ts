import { getRedisClient } from '$lib/server/redis/client';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ cookies }) => {
	const key = cookies.get('key');
	const redis = await getRedisClient();
	const isHidden = await redis.get(`${key}-hidden`);

	if (isHidden !== 'false') {
		return { isHidden: true };
	}
	return { isHidden:false };
};
