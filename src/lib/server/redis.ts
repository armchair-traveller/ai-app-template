import { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from '$env/static/private';
import { Redis } from '@upstash/redis';

export const redis = new Redis({
	url: UPSTASH_REDIS_REST_URL,
	token: UPSTASH_REDIS_REST_TOKEN
});

const CACHE_EXPIRY_SECONDS = 60 * 60 * 6; // 6 hours
const CACHE_KEY_SEPARATOR = ':';

export const cacheWithRedis = <TFunc extends (...args: any[]) => Promise<any>>(
	keyPrefix: string,
	fn: TFunc
): TFunc => {
	return (async (...args: Parameters<TFunc>) => {
		const key = `${keyPrefix}${CACHE_KEY_SEPARATOR}${JSON.stringify(args)}`;
		const cachedResult = await redis.get(key);
		if (cachedResult) {
			console.log(`Cache hit for ${key}`);
			return cachedResult; // Upstash Redis automatically parses JSON
		}

		const result = await fn(...args);
		await redis.set(key, result, { ex: CACHE_EXPIRY_SECONDS });
		return result;
	}) as TFunc;
};
