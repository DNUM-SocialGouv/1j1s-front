enum Key {
  SESSION_ID = 'session_Id',
}

function setItem(key: string, value: string): void {
  sessionStorage.setItem(key, value);
}

function getItem(key: string): string | null {
  return sessionStorage.getItem(key);
}

const StorageService = {
  Key,
  getItem,
  setItem,
};

export default StorageService;
