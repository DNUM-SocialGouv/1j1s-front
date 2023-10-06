import React, { useContext } from 'react';

type ContextType = {
  errorId: string
};

const Context = React.createContext<ContextType | null>(null);

export const ChampContextProvider = Context.Provider;

export function useChampContext(): ContextType | Record<string, never> {
	const context = useContext(Context);
	return context ?? {};
}
