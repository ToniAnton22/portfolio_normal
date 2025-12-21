import {
	CACHE_ID,
	LANG_SERVER_URL,
	PORT,
	REDDIS_HOST,
	REDDIS_LANG_CACHE,
	REDDIS_PASSWORD,
	REDDIS_USERNAME
} from '$env/static/private';
import { LangCache } from '@redis-ai/langcache';
import { createClient, type RedisClientType } from 'redis';
import { building, dev } from '$app/environment';

let redisClient: RedisClientType | null = null;
let langCache: LangCache | null = null;

export async function getRedisClient(): Promise<RedisClientType> {
	if (building) {
		throw new Error('Cannot use Redis during build');
	}

	if (redisClient?.isOpen) {
		return redisClient;
	}

	if (redisClient) {
		try {
			await redisClient.quit();
		} catch (e) {
			console.error('Error closing old Redis client:', e);
		}
	}

	redisClient = createClient({
		username: REDDIS_USERNAME,
		password: REDDIS_PASSWORD,
		socket: {
			host: REDDIS_HOST,
			port: Number(PORT)
		}
	});

	redisClient.on('error', (err) => console.error('Redis Client Error', err));

	await redisClient.connect();
	
	console.log('✅ Redis client connected');
	
	return redisClient;
}

export async function getLangCache(): Promise<LangCache> {
	if (building) {
		throw new Error('Cannot use LangCache during build');
	}

	if (!langCache) {
		langCache = new LangCache({
			serverURL: LANG_SERVER_URL,
			cacheId: CACHE_ID,
			apiKey: REDDIS_LANG_CACHE
		});
		console.log('✅ LangCache initialized');
	}

	return langCache;
}

if (dev) {
	process.on('SIGTERM', async () => {
		if (redisClient?.isOpen) {
			await redisClient.quit();
		}
	});
}