import { StorageService } from './storage.service';

export type BrowserStorage = {
	getItem(key: string): string | null;
	setItem(key: string, value: string): void;
	removeItem(key: string): void;
};

export class BrowserStorageService implements StorageService {
	constructor(private getStorage: () => BrowserStorage) {}

	get<DataType>(key: string): DataType | null {
		let value;
		try {
			value = this.getStorage().getItem(key);
		} catch {
			throw new StorageUnavailableError('storage unavailable');
		}
		if (value == null) { return null; }
		return JSON.parse(value);
	}

	set<DataType>(key: string, value: DataType): void {
		const serializedData = JSON.stringify(value);
		try {
			this.getStorage().setItem(key, serializedData);
		} catch {
			throw new StorageUnavailableError('storage unavailable');
		}
	}

	remove(key: string): void {
		try {
			this.getStorage().removeItem(key);
		} catch {
			throw new StorageUnavailableError('storage unavailable');
		}
	}
}

export class StorageUnavailableError extends Error {}
