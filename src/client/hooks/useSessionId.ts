import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SESSION_ID = 'session_Id';

function useSessionId (): string | undefined {
	const [value, setValue] = useState<string>();

	useEffect(() => {
		let sessionId = sessionStorage.getItem(SESSION_ID);
		if (!sessionId) {
			sessionId = uuidv4();
			sessionStorage.setItem(SESSION_ID, sessionId);
		}
		setValue(sessionId);
	}, []);

	return value;
};

export default useSessionId;
