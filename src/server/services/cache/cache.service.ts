export interface CacheService {
  get(key: string): Promise<string | null>;
  set(key: string, value: any): void;
}
