import { BackButtonPersistenceService } from './backButtonPersistence.service';

export function aBackButtonPersistenceService(override?: Partial<BackButtonPersistenceService>): BackButtonPersistenceService {
	return {
		getCurrentPath: jest.fn(),
		getPreviousPath: jest.fn(),
		setCurrentPath: jest.fn(),
		setPreviousPath: jest.fn(),
		...override,
	};
}
