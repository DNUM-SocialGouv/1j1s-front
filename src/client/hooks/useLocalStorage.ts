import { useState } from 'react';

import { useDependency } from '../context/dependenciesContainer.context';
import { StorageService } from '../services/storage/storage.service';

function useLocalStorage<T>(key: string): { get: () => T | null, set: (value: T) => void, remove: () => void } {
	const [fallbackStorage, setFallbackStorage] = useState<T | null>(null);
	const localStorage = useDependency<StorageService>('localStorageService');

	return {
		get() { try { return localStorage.get<T>(key); } catch { return fallbackStorage; }},
		remove() { try { localStorage.remove(key); } catch { setFallbackStorage(null); }},
		set(value) { try { localStorage.set(key, value); } catch { setFallbackStorage(value); }},
	};
}

export default useLocalStorage;
