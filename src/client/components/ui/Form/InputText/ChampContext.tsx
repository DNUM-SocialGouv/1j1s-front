import React, { Dispatch, SetStateAction, useContext } from 'react';

type ContextType = {
  errorId: string
	setErrorId: Dispatch<SetStateAction<string>>
};

const Context = React.createContext<ContextType | null>(null);

export const ChampContextProvider = Context.Provider;

export function useChampContext(): ContextType | Record<string, never> {
	const context = useContext(Context);
	return context ?? {};
}
