import { useCallback, useRef, useState } from 'react';

export function useTouchedInput() {
	const [touched, setTouched] = useState(false);
	const valueOnFocus = useRef<string | null>(null);

	const saveValueOnFocus = useCallback(function saveCurrentValue(value: string) {
		valueOnFocus.current = value;
	}, []);

	const setTouchedOnBlur = useCallback(function touch(currentValue: string) {
		if (valueOnFocus.current !== currentValue) {
			const wasAlreadyTouched = touched;
			setTouched(true);
			return !wasAlreadyTouched;
		}
		return false;
	}, [touched]);

	return { saveValueOnFocus, setTouchedOnBlur, touched };
}
