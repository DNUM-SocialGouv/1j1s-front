import { CacheService } from '~/server/services/cache/cache.service';

interface Cache {
  key: string;
  value: Promise<string>;
}

export class MockedCacheService implements CacheService {
  store: Cache[] = [];

  async get(key: string): Promise<string | number | symbol | null> {
    const result = this.store.find((value) => value.key === key);
    if (result === undefined) {
      return Promise.resolve(null);
    } else {
      return result.value;
    }
  }

  async set(key: string, value: Record<string | number | symbol, unknown>) {
    this.store.push({
      key: key,
      value: Promise.resolve(JSON.stringify(value)),
    });
  }
}
