import { createContext, useContext } from 'react';

import NoProviderError from '~/client/Errors/NoProviderError';


type SelectContext = {
	activeDescendant: string | undefined,
	onOptionSelection: (optionId: string) => void,
	isCurrentItemSelected: (optionValue: string) => boolean
}

export const SelectContext = createContext<SelectContext | null>(null);

export function useSelectContext() {
	const selectContext = useContext(SelectContext);

	if (selectContext == null) {
		throw new NoProviderError(SelectContext);
	}

	return selectContext;
}
