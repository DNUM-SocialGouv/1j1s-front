import { StorageService } from './storage.service';

export function addFallbackToStorageService(service: StorageService, fallback: StorageService): StorageService {
	return {
		get<DataType>(key: string): DataType | null {
			try {
				return service.get(key);
			} catch (e) {
				return fallback.get(key);
			}
		},
		remove(key: string): void {
			try {
				return service.remove(key);
			} catch (e) {
				return fallback.remove(key);
			}
		},
		set<DataType>(key: string, value: DataType): void {
			try {
				return service.set(key, value);
			} catch (e) {
				return fallback.set(key, value);
			}
		},
	};
}
