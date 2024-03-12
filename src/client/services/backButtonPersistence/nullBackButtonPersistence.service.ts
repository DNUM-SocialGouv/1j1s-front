import { BackButtonPersistenceService } from './backButtonPersistence.service';

export class NullBackButtonPersistenceService implements BackButtonPersistenceService {
	isStorageAvailable(): boolean {
		return false;
	}

	setPreviousPath(): void {
		return;
	}

	getPreviousPath(): string | null {
		return null;
	}

	setCurrentPath(): void {
		return;
	}

	getCurrentPath(): string | null {
		return null;
	}
}
