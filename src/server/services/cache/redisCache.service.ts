import Redis from 'ioredis';

import { SentryException } from '~/server/exceptions/sentryException';
import { CacheService } from '~/server/services/cache/cache.service';
import { ConfigurationService } from '~/server/services/configuration.service';
import { LoggerService } from '~/server/services/logger.service';

export class RedisCacheService implements CacheService {
  private client: Redis;
  constructor(private configurationService: ConfigurationService) {
    const conf = configurationService.getConfiguration();
    this.client = new Redis({
      db: conf.REDIS_DB,
      host: conf.REDIS_HOST,
      password: conf.REDIS_PASSWORD,
      port: conf.REDIS_PORT,
      username: conf.REDIS_USERNAME,
    });
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) as T : null;
    } catch (error) {
      LoggerService.warnWithExtra(
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
      LoggerService.warnWithExtra(
        new SentryException(
          '[Cache Redis] Erreur de mise en cache',
          { context: JSON.stringify(error), source: 'Cache Redis' },
          { errorDetail: `${key} : ${value} - Expires in ${expiresInHours} hours` },
        ),
      );
    }
  }
}
