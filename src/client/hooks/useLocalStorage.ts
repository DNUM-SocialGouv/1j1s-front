import { useState } from 'react';

import { useDependency } from '../context/dependenciesContainer.context';
import { PersistanceService } from '../services/persistance/persistance.service';

function useLocalStorage<T>(key: string): { get: () => T | null, set: (value: T) => void, remove: () => void } {
	const [fallbackStorage, setFallbackStorage] = useState<T | null>(null);
	const localStorage = useDependency<PersistanceService>('localStorageService');

	if (localStorage != null) {
		return {
			get: () => localStorage.get(key),
			remove: (): void => localStorage.remove(key),
			set: (value) => localStorage.set(key, value),
		};
	}

	return {
		get: () => fallbackStorage,
		remove: () => setFallbackStorage(null),
		set: setFallbackStorage,
	};
}

export default useLocalStorage;
