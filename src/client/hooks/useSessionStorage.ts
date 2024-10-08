import { useState } from 'react';

import { useDependency } from '../context/dependenciesContainer.context';
import { StorageService } from '../services/storage/storage.service';

function useSessionStorage<T>(key: string): {get: () => T | null, set: (value: T) => void, remove: () => void} {
	const [fallbackStorage, setFallbackStorage] = useState<T | null>(null);
	const sessionStorage = useDependency<StorageService>('sessionStorageService');

	return {
		get() { try { return sessionStorage.get<T>(key); } catch { return fallbackStorage; }},
		remove() { try { sessionStorage.remove(key); } catch { setFallbackStorage(null); }},
		set(value) { try { sessionStorage.set(key, value); } catch { setFallbackStorage(value); }},
	};
}

export default useSessionStorage;
