import { useEffect, useState } from 'react';

import { isStorageAvailable } from '~/client/utils/isStorageAvailable';

const SESSION_ID = 'session_Id';
function useSessionId (): string | undefined {
	const [value, setValue] = useState<string>();

	useEffect(() => {
		if (isStorageAvailable('sessionStorage')) {
			let sessionId = sessionStorage ? sessionStorage.getItem(SESSION_ID) : undefined;
			if (!sessionId) {
				// FIXME (GAFI 28-10-2024): Idéalement à injecter
				sessionId = window.crypto.randomUUID();
				sessionStorage.setItem(SESSION_ID, sessionId);
			}
			setValue(sessionId);
		} else {
			setValue(undefined);
		};

	}, []);

	return value;
};

export default useSessionId;
