import { StorageService } from './storage.service';

export function aStorageService(overrides?: Partial<StorageService>): StorageService {
	return {
		get: jest.fn(),
		remove: jest.fn(),
		set: jest.fn(),
		...overrides,
	};
}
