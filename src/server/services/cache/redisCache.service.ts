import Redis from "ioredis";

import { ConfigurationService } from "../configuration.service";
import { CacheService } from "./cache.service";

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

  async get(key: any): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, object: any) {
    this.client.set(key, JSON.stringify(object));
    this.client.expire(key, 3600 * 6);
  }
}
