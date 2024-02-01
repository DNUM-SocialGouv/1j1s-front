import React, { Dispatch, ReducerState,useContext } from 'react';

import NoProviderError from '~/client/Errors/NoProviderError';

import { ComboboxAction, ComboboxReducer } from './ComboboxReducer';

type ContextContent = {
	state: ReducerState<typeof ComboboxReducer>,
	dispatch: Dispatch<ComboboxAction>,
	onOptionSelection: (option: Element) => void,
	filter: (element: Element, value: string) => boolean,
	onUpdateVisibleOptions: (option: Element) => void,
	visibleOptions: Array<string>
}

const Context = React.createContext<ContextContent | undefined>(undefined);
Context.displayName = 'ComboboxContext';

export const ComboboxProvider = Context.Provider;

export function useCombobox() {
	const context = useContext(Context);

	if (context == null) {
		throw new NoProviderError(Context);
	}

	return context;
}
