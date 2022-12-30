import { CacheService } from './cache.service';

interface Cache {
  key: string;
  value: string;
  expiresInHours: number;
}

export class MockedCacheService implements CacheService {
	store: Cache[] = [];

	get<T>(key: string): Promise<T | null> {
		const result = this.store.find((value) => value.key === key);
		if (result === undefined) {
			return Promise.resolve(null);
		} else {
			return Promise.resolve(JSON.parse(result.value) as T);
		}
	}

	set(key: string, value: unknown, expiresInHours: number): void {
		this.store.push({
			expiresInHours,
			key: key,
			value: JSON.stringify(value),
		});
	}
}
