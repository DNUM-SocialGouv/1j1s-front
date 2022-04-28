import { uuid4 } from '@sentry/utils';
import { useEffect,useState } from 'react';

export enum SESSION_STORAGE_KEY {
  SESSION_ID = 'session_Id',
}
const useSessionId = (name: SESSION_STORAGE_KEY) => {
  const [value, setValue] = useState<string | null>();

  useEffect(() => {
    let sessionId = sessionStorage.getItem(name);
    if (!sessionId) {
      sessionStorage.setItem(SESSION_STORAGE_KEY.SESSION_ID, uuid4());
      sessionId = sessionStorage.getItem(name);
    }
    setValue(sessionId);
  }, [name]);

  return value;
};

export default useSessionId;
