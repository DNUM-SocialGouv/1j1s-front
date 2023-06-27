import React, { Dispatch, ReducerState, useContext } from 'react';

import { ComboboxAction, ComboboxReducer } from '~/client/components/ui/Form/Combobox/ComboboxReducer';

type ContextContent = {
	state: ReducerState<typeof ComboboxReducer>,
	dispatch: Dispatch<ComboboxAction>,
	focusInput: () => void
}

const Context = React.createContext<ContextContent | undefined>(undefined);

export const ComboboxProvider = Context.Provider;

export function useCombobox() {
	const context = useContext(Context);

	if (context == null) {
		// FIXME (GAFI 20-06-2023): Throw custom error
		throw new Error('Provider not found');
	}

	return context;
}
