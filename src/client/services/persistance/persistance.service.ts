export interface PersistanceService {
	get<DataType>(key: string): DataType;
	set<DataType>(key: string, value: DataType): void;
	remove(key: string): void;
}
