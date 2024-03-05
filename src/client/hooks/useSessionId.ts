import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { isStorageAvailable } from '~/client/utils/isStorageAvailable';

const SESSION_ID = 'session_Id';
function useSessionId (): string | undefined {
	const [value, setValue] = useState<string>();

	useEffect(() => {
		if (isStorageAvailable('sessionStorage')) {
			let sessionId = sessionStorage ? sessionStorage.getItem(SESSION_ID) : undefined;
			if (!sessionId) {
				sessionId = uuidv4();
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
