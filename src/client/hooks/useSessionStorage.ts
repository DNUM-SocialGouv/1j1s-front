import { useState } from 'react';

import { useDependency } from '../context/dependenciesContainer.context';
import { PersistanceService } from '../services/persistance/persistance.service';

function useSessionStorage<T>(key: string): {get: () => T | null, set: (value: T) => void, remove: () => void} {
	const [fallbackStorage, setFallbackStorage] = useState<T | null>(null);
	const sessionStorage = useDependency<PersistanceService>('sessionStorageService');

	if (sessionStorage != null) {
		return {
			get: () => sessionStorage.get(key),
			remove: (): void => sessionStorage.remove(key),
			set: (value) => sessionStorage.set(key, value),
		};
	}

	return {
		get: () => fallbackStorage,
		remove: () => setFallbackStorage(null),
		set: setFallbackStorage,
	};
}

export default useSessionStorage;
