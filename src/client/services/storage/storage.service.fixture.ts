import { StorageService } from './storage.service';

export function aStorageService(overrides?: Partial<StorageService>): StorageService {
	return {
		get: vi.fn(),
		remove: vi.fn(),
		set: vi.fn(),
		...overrides,
	};
}
