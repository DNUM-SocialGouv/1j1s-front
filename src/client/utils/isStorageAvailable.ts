export const isStorageAvailable = (storageType: 'sessionStorage' | 'localStorage') => { //TODO is storageAvailable ?
	let storage;
	try {
		storage = window[storageType];
		const x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch {
		return false;
	}
};
