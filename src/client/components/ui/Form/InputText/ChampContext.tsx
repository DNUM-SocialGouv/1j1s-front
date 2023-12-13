import React, { Dispatch, SetStateAction, useContext } from 'react';

type ChampContextType = {
	errorId: string
	setErrorId: Dispatch<SetStateAction<string>>
	hintId: string
	setHintId: Dispatch<SetStateAction<string>>
	setTouched: Dispatch<SetStateAction<boolean>>
	touched: boolean
	inputId: string
	setInputId: Dispatch<SetStateAction<string>>
	errorMessage: string
	setErrorMessage: Dispatch<SetStateAction<string>>
};

const ChampContext = React.createContext<ChampContextType | null>(null);

export const ChampContextProvider = ChampContext.Provider;

export function useChampContext(): ChampContextType | Record<string, never> {
	const context = useContext(ChampContext);
	return context ?? {};
}
