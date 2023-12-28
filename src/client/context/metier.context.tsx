import React from 'react';

import { MetierService } from '../services/metiers/metier.service';
import { DependencyException } from './dependenciesContainer.context';

export type MetierDependencies = {
		metierService: MetierService;
};

const MetierDependenciesContext = React.createContext<Partial<MetierDependencies>>({});

export function MetierDependenciesProvider({
	children,
	...dependencies
}: React.PropsWithChildren<Partial<MetierDependencies>>) {
	return (
		<MetierDependenciesContext.Provider value={dependencies}>
			{children}
		</MetierDependenciesContext.Provider>
	);
}

export function useMetierDependency(key: keyof MetierDependencies): MetierService {
	const dependencies = React.useContext(MetierDependenciesContext);
	const metierService: MetierService | undefined = dependencies[key];
	if(!metierService) {
		throw new DependencyException(key);
	}
	return metierService;
}
