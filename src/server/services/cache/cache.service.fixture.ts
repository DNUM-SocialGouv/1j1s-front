import { CacheService } from '~/server/services/cache/cache.service';

export function aCacheService(): CacheService {
	return {
		get: vi.fn(),
		set: vi.fn(),
	};
}
