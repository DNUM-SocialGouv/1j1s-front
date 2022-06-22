export interface CacheService {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: unknown, expiresInHours: number): void;
}
