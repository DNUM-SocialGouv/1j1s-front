import React, { RefObject, useContext } from 'react';

export type ComboboxState = {
  open: boolean,
  activeDescendant: string | undefined,
  value: string,
  suggestionList: RefObject<HTMLUListElement>
}

const Context = React.createContext<ComboboxState | undefined>(undefined);

export const ComboboxProvider = Context.Provider;

export function useCombobox() {
	const context = useContext(Context);

	if (context == null) {
		// FIXME (GAFI 20-06-2023): Throw custom error
		throw new Error('Provider not found');
	}

	return context;
}
