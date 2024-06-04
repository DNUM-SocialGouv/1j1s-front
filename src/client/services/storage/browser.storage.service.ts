import { StorageService } from './storage.service';

export type BrowserStorage = {
	getItem(key: string): string | null;
	setItem(key: string, value: string): void;
	removeItem(key: string): void;
};

export class BrowserStorageService implements StorageService {
	constructor(private storage: BrowserStorage) {}

	get<DataType>(key: string): DataType | null {
		let value;
		try {
			value = this.storage.getItem(key);
		} catch (e) {
			throw new BrowserStorageService.StorageUnavailableError('storage unavailable');
		}
		if (value == null) { return null; }
		return JSON.parse(value);
	}

	set<DataType>(key: string, value: DataType): void {
		const serializedData = JSON.stringify(value);
		try {
			this.storage.setItem(key, serializedData);
		} catch (e) {
			throw new BrowserStorageService.StorageUnavailableError('storage unavailable');
		}
	}

	remove(key: string): void {
		try {
			this.storage.removeItem(key);
		} catch (e) {
			throw new BrowserStorageService.StorageUnavailableError('storage unavailable');
		}
	}
}

export namespace BrowserStorageService {
	export class StorageUnavailableError extends Error {}
}
