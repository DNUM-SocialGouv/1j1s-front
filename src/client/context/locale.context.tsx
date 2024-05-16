import React, { useContext } from 'react';

type ContextType = string;

const Context = React.createContext<ContextType | undefined>(undefined);

export const LocaleProvider = Context.Provider;

export function useLocale() {
	const locale = useContext(Context);
	if (locale) return locale;
	if (typeof window !== 'undefined') return navigator.language;
	return 'fr-FR';
}
