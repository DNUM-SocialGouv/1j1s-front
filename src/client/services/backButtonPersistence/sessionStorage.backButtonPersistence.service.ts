import { BackButtonPersistenceService } from '~/client/services/backButtonPersistence/backButtonPersistence.service';

const PREVIOUS_PATH_KEY = 'previousPath';
const CURRENT_PATH_KEY = 'currentPath';

export class SessionStorageBackButtonPersistenceService implements BackButtonPersistenceService {
	setPreviousPath(path: string): void {
		sessionStorage.setItem(PREVIOUS_PATH_KEY, path);
	}

	getPreviousPath(): string | null {
		return sessionStorage.getItem(PREVIOUS_PATH_KEY);
	}

	setCurrentPath(path: string): void {
		sessionStorage.setItem(CURRENT_PATH_KEY, path);
	}

	getCurrentPath(): string | null {
		return sessionStorage.getItem(CURRENT_PATH_KEY);
	}
}
