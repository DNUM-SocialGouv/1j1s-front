import Redis from 'ioredis';

import { CacheService } from '~/server/services/cache/cache.service';
import { ConfigurationService } from '~/server/services/configuration.service';

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

  async get(key: string): Promise<string | number | symbol | null> {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set(key: string, value: Record<string | number | symbol, unknown>, expiresInHours: number) {
    await this.client.set(key, JSON.stringify(value));
    this.client.expire(key, 3600 *  expiresInHours);
  }
}
