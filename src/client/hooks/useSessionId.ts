import { useEffect, useState } from 'react';

import { isStorageAvailable } from '~/client/utils/isStorageAvailable';

const SESSION_ID = 'session_Id';
function useSessionId (): string | undefined {
	const [value, setValue] = useState<string | undefined>();

	useEffect(() => {
		if (!isStorageAvailable('sessionStorage')) {
			return;
		}
		// FIXME (GAFI 29-10-2024): À injecter
		const sessionId = sessionStorage?.getItem(SESSION_ID);
		if (sessionId) {
			setValue(sessionId);
			return;
		}
		const randomUUIDAvailable = typeof window.crypto?.randomUUID === 'function';
		if (randomUUIDAvailable) {
			// FIXME (GAFI 28-10-2024): Idéalement à injecter
			const newSessionId = window.crypto.randomUUID();
			sessionStorage?.setItem(SESSION_ID, newSessionId);
			setValue(newSessionId);
		}
	}, []);

	return value;
};

export default useSessionId;
