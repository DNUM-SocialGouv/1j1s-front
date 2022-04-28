export enum SESSION_STORAGE_KEY {
  SESSION_ID = 'session_Id',
}

export function setSessionStorage(key: string, value: string): void {
  sessionStorage.setItem(key, value);
}

export function getSessionStorage(key: string): string | null {
  return typeof window !== 'undefined' ? sessionStorage.getItem(key) : null;
}
