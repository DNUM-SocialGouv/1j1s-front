export interface BackButtonPersistenceService {
	setPreviousPath: (path: string) => void;
	getPreviousPath: () => string | null;
	setCurrentPath: (path: string) => void;
	getCurrentPath: () => string | null;
}
