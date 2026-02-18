import { useMemo } from 'react';

import { isStorageAvailable } from '~/client/utils/isStorageAvailable';

const SESSION_ID = 'session_Id';

function useSessionId (): string | undefined {
	return useMemo(() => {
		if (typeof window === 'undefined' || !isStorageAvailable('sessionStorage')) {
			return;
		}
		// FIXME (GAFI 29-10-2024): À injecter
		const sessionId = sessionStorage?.getItem(SESSION_ID);
		if (sessionId) {
			return sessionId;
		}
		const randomUUIDAvailable = typeof window.crypto?.randomUUID === 'function';
		if (randomUUIDAvailable) {
			// FIXME (GAFI 28-10-2024): Idéalement à injecter
			const newSessionId = window.crypto.randomUUID();
			sessionStorage?.setItem(SESSION_ID, newSessionId);
			return newSessionId;
		}
	}, []);
};

export default useSessionId;
