import { useState } from 'react';

function useLocalStorage<T>(key: string): {get: () => T | null, set: (value: T) => void, remove: () => void} {
	const [defaultValue, setDefaultValue] = useState<T | null>(null);

	const get = (): T | null => {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : null;
	};

	if (window && window.localStorage) {
		return {
			get,
			remove: (): void => localStorage.removeItem(key),
			set: (value) => localStorage.setItem(key, JSON.stringify(value)),
		};
	}

	return {
		get: () => defaultValue,
		remove: () => setDefaultValue(null),
		set: setDefaultValue,
	};
};

export default useLocalStorage;
