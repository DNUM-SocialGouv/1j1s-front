import { uuid4 } from '@sentry/utils';
import { useEffect,useState } from 'react';

const SESSION_ID  = 'session_Id';

const useSessionId = () => {
  const [value, setValue] = useState<string | null>();

  useEffect(() => {
    let sessionId = sessionStorage.getItem(SESSION_ID);
    if (!sessionId) {
      sessionStorage.setItem(SESSION_ID, uuid4());
      sessionId = sessionStorage.getItem(SESSION_ID);
    }
    setValue(sessionId);
  }, []);

  return value;
};

export default useSessionId;
