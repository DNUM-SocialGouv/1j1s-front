import React, { Dispatch, SetStateAction, useContext } from 'react';

type ContextType = {
	errorId: string
	setErrorId: Dispatch<SetStateAction<string>>
	hintId: string
	setHintId: Dispatch<SetStateAction<string>>
	setTouched: Dispatch<SetStateAction<boolean>>
	touched: boolean
};

const Context = React.createContext<ContextType | null>(null);

export const ChampContextProvider = Context.Provider;

export function useChampContext(): ContextType | Record<string, never> {
	const context = useContext(Context);
	return context ?? {};
}
