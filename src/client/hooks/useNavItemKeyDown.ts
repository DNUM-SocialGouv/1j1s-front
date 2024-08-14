import React, { KeyboardEvent,useCallback } from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';

export function useNavItemKeyDown(optionRef: React.RefObject<HTMLLIElement>, setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>) {
	return useCallback((event: KeyboardEvent<HTMLLIElement>) => {
		const isEventTargetOutsideOption = !optionRef.current?.contains(event.target as Node);
		const isEscapeEventKey = event.key === KeyBoard.ESCAPE;
		const isSpaceEventKey = event.key === KeyBoard.SPACE;

		if (isEventTargetOutsideOption || isEscapeEventKey || (isEventTargetOutsideOption && isSpaceEventKey)) {
			setIsExpanded(false);
		}
	}, [optionRef, setIsExpanded]);
}
