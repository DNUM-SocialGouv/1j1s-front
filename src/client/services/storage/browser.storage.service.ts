import { StorageService } from './storage.service';

export type BrowserStorage = {
	getItem(key: string): string | null;
	setItem(key: string, value: string): void;
	removeItem(key: string): void;
};

export class BrowserStorageService implements StorageService {
	constructor(private storage: BrowserStorage) {}

	get<DataType>(key: string): DataType | null {
		const value = this.storage.getItem(key);
		if (value == null) { return null; }
		return JSON.parse(value);
	}

	set<DataType>(key: string, value: DataType): void {
		const serializedData = JSON.stringify(value);
		this.storage.setItem(key, serializedData);
	}

	remove(key: string): void {
		this.storage.removeItem(key);
	}
}
