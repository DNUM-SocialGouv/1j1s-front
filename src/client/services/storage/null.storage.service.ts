import { StorageService } from './storage.service';

export class NullStorageService implements StorageService {
	get<DataType>(): DataType | null {
		return null;
	}

	remove(): void {
	}

	set(): void {
	}
}
