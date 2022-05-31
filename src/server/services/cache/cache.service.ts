export interface CacheService {
  get(key: string): Promise<string | number | symbol | null>;
  set(key: string, value: Record<string | number | symbol, unknown>, expiresInHours: number): void;
}
