export interface StorageService {
	get<DataType>(key: string): DataType | null;
	set<DataType>(key: string, value: DataType): void;
	remove(key: string): void;
}
