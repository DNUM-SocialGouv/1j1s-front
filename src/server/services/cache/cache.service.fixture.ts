import { CacheService } from '~/server/services/cache/cache.service';

export function aCacheService(): CacheService {
	return {
		get: jest.fn(),
		set: jest.fn(),
	};
}
