import { PersistanceService } from './persistance.service';

export function aPersistanceService(overrides?: Partial<PersistanceService>): PersistanceService {
	return {
		get: jest.fn(),
		remove: jest.fn(),
		set: jest.fn(),
		...overrides,
	};
}
