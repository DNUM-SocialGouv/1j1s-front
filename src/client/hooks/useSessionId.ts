import { uuid4 } from '@sentry/utils';
import { useEffect,useState } from 'react';

const SESSION_ID = 'session_Id';

function useSessionId (): string | undefined {
  const [value, setValue] = useState<string>();

  useEffect(() => {
    let sessionId = sessionStorage.getItem(SESSION_ID);
    if (!sessionId) {
      sessionId = uuid4();
      sessionStorage.setItem(SESSION_ID, sessionId);
    }
    setValue(sessionId);
  }, []);

  return value;
};

export default useSessionId;
