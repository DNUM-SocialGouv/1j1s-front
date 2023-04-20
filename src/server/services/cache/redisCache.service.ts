import Redis from 'ioredis';

import { SentryException } from '~/server/exceptions/sentryException';
import { CacheService } from '~/server/services/cache/cache.service';
import { LoggerService } from '~/server/services/logger.service';

export class RedisCacheService implements CacheService {
	private client: Redis;
	constructor(private url: string, private loggerService: LoggerService) {
		this.client = new Redis(url);
	}

	async get<T>(key: string): Promise<T | null> {
		try {
			const value = await this.client.get(key);
			return value ? JSON.parse(value) as T : null;
		} catch (error) {
			this.loggerService.warnWithExtra(
				new SentryException(
					'[Cache Redis] Erreur de récupération du cache',
					{ context: JSON.stringify(error), source: 'Cache Redis' },
					{ errorDetail: `${key}` },
				),
			);
			return Promise.reject();
		}
	}

	async set(key: string, value: unknown, expiresInHours: number) {
		try {
			await this.client.set(key, JSON.stringify(value));
			this.client.expire(key, 3600 *  expiresInHours);
		} catch (error) {
			this.loggerService.warnWithExtra(
				new SentryException(
					'[Cache Redis] Erreur de mise en cache',
					{ context: JSON.stringify(error), source: 'Cache Redis' },
					{ errorDetail: `${key} : ${value} - Expires in ${expiresInHours} hours` },
				),
			);
		}
	}
}
