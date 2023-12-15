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

export function useMetierDependency<D = MetierService>(key: keyof MetierDependencies): D {
	const dependencies = React.useContext(MetierDependenciesContext);
	const dependency: MetierService | undefined = dependencies[key];
	if(!dependency) {
		throw new DependencyException(key);
	}
	return dependency as unknown as D;
}
