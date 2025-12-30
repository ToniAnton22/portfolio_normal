import { getRedisClient } from '$lib/server/redis/client';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ cookies }) => {
	const key = cookies.get('key');
	const redis = await getRedisClient();
	const dataString = await redis.get(`${key}-hidden`);
	
	if(!dataString){
		return {isHidden:true}
	}
	const parsedData = JSON.parse(dataString)

	if (parsedData.isHidden) {
		return { isHidden: parsedData.isHidden };
	}
	return { isHidden:false };
};
