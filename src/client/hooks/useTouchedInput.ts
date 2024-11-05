import { useCallback, useRef, useState } from 'react';

export function useTouchedInput<Value = string>() {
	const [touched, setTouched] = useState(false);
	const valueOnFocus = useRef<Value | null>(null);

	const saveValueOnFocus = useCallback(function saveCurrentValue(value: Value) {
		valueOnFocus.current = value;
	}, []);

	const setTouchedOnBlur = useCallback(function touch(currentValue: Value) {
		if (valueOnFocus.current !== currentValue) {
			const wasAlreadyTouched = touched;
			setTouched(true);
			return !wasAlreadyTouched;
		}
		return false;
	}, [touched]);

	return { saveValueOnFocus, setTouchedOnBlur, touched };
}
