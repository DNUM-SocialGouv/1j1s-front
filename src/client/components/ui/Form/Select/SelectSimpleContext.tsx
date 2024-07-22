import React, { ReducerState, useContext } from 'react';

import NoProviderError from '~/client/Errors/NoProviderError';

import { SelectSimpleReducer } from './SelectReducer';


type ContextContent = {
	state: ReducerState<typeof SelectSimpleReducer>,
	onOptionSelection: (optionId: string) => void,
	isCurrentItemSelected: (optionValue: string) => boolean
}

const Context = React.createContext<ContextContent | undefined>(undefined);
Context.displayName = 'SelectSimpleContext';

export const SelectSimpleProvider = Context.Provider;

export function useSelectSimple() {
	const context = useContext(Context);

	if (context == null) {
		throw new NoProviderError(Context);
	}

	return context;
}
