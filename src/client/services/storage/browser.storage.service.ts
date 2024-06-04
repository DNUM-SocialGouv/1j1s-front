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
			// FIXME (GAFI 04-06-2024): Erreur custom
			throw new Error('storage unavailable');
		}
		if (value == null) { return null; }
		return JSON.parse(value);
	}

	set<DataType>(key: string, value: DataType): void {
		const serializedData = JSON.stringify(value);
		try {
			this.storage.setItem(key, serializedData);
		} catch (e) {
			// FIXME (GAFI 04-06-2024): Erreur custom
			throw new Error('storage unavailable');
		}
	}

	remove(key: string): void {
		try {
			this.storage.removeItem(key);
		} catch (e) {
			// FIXME (GAFI 04-06-2024): Erreur custom
			throw new Error('storage unavailable');
		}
	}
}
