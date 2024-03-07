import { useState } from 'react';

import { isStorageAvailable } from '~/client/utils/isStorageAvailable';

function useSessionStorage<T>(key: string): {get: () => T | null, set: (value: T) => void, remove: () => void} {
	const [defaultValue, setDefaultValue] = useState<T | null>(null);

	const get = (): T | null => {
		const item = sessionStorage.getItem(key);
		return item ? JSON.parse(item) : null;
	};

	if (typeof window !== 'undefined' && isStorageAvailable('sessionStorage')) {
		return {
			get,
			remove: (): void => sessionStorage.removeItem(key),
			set: (value) => sessionStorage.setItem(key, JSON.stringify(value)),
		};
	}

	return {
		get: () => defaultValue,
		remove: () => setDefaultValue(null),
		set: setDefaultValue,
	};
}

export default useSessionStorage;
