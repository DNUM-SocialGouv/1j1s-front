import React, { FocusEvent,useCallback } from 'react';

export function useNavItemBlur(setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>) {
	return useCallback((event: FocusEvent<HTMLLIElement>) => {
		const itemWasSelected = event.currentTarget;
		const itemSelected = event.relatedTarget;
    
		setTimeout(() => {
			if (!itemWasSelected.contains(itemSelected)) {
				setIsExpanded(false);
			}
		}, 0);
	}, [setIsExpanded]);
}
