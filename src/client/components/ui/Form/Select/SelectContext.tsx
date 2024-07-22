import React, { useContext } from 'react';

import NoProviderError from '~/client/Errors/NoProviderError';


type ContextContent = {
	activeDescendant: string | undefined,
	onOptionSelection: (optionId: string) => void,
	isCurrentItemSelected: (optionValue: string) => boolean
}

const Context = React.createContext<ContextContent | undefined>(undefined);
Context.displayName = 'SelectContext';

export const SelectProvider = Context.Provider;

export function useSelect() {
	const context = useContext(Context);

	if (context == null) {
		throw new NoProviderError(Context);
	}

	return context;
}
