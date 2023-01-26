import React, { useContext } from 'react';

type ContextType = string;

const Context = React.createContext<ContextType | undefined>(undefined);

export const LocaleProvider = Context.Provider;

export function useLocale() {
	return useContext(Context);
}
