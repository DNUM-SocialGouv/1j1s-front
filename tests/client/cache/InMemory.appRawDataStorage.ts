import { AppRawDataStorage } from '~/client/cache/appRawDataStorage';

export class InMemoryAppRawDataStorage implements AppRawDataStorage {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  private storage: Record<string, any> = {};

  clearAllItems(): void {
    this.storage = {};
  }

  clearItem(key: string, usePrefixDeletion?: boolean): void {
    if (usePrefixDeletion) {
      Object.keys(this.storage).forEach((storageKey) => {
        if (storageKey.startsWith(key)) {
          delete this.storage[storageKey];
        }
      });
    } else {
      delete this.storage[key];
    }
  }

  get<T>(key: string): T | null {
    return this.storage[key] ?? null;
  }

  set<T>(key: string, value: T): void {
    this.storage[key] = value;
  }
}
