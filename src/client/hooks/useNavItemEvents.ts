import React, { useCallback, useEffect, useRef } from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';

export function useNavItemEvents(setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>) {
	const optionRef = useRef<HTMLLIElement>(null);

	const handleOutsideInteraction = useCallback((event: MouseEvent | KeyboardEvent) => {
		const isOutside = !optionRef.current?.contains(event.target as Node);
		const isRelevantKey = 'key' in event && (event.key === KeyBoard.SPACE || event.key === KeyBoard.ESCAPE);
    
		if (isOutside && (event.type === 'mouseup' || isRelevantKey)) {
			setIsExpanded(false);
		}
	}, [setIsExpanded]);

	useEffect(() => {
		document.addEventListener('mouseup', handleOutsideInteraction);
		document.addEventListener('keyup', handleOutsideInteraction);

		return () => {
			document.removeEventListener('mouseup', handleOutsideInteraction);
			document.removeEventListener('keyup', handleOutsideInteraction);
		};
	}, [handleOutsideInteraction]);

	const onBlur = useCallback((event: React.FocusEvent<HTMLLIElement>) => {
		if (!event.currentTarget.contains(event.relatedTarget)) {
			setIsExpanded(false);
		}
	}, [setIsExpanded]);

	return { onBlur, optionRef };
}
