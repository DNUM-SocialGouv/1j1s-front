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

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, object: Record<string, unknown>) {
    this.client.set(key, JSON.stringify(object));
    this.client.expire(key, 3600 * 6);
  }
}
