import React, { createContext, useContext } from 'react';

import { Dependencies } from '~/client/dependencies.container';
import { LocalisationService } from '~/client/services/localisation.service';
import { OffreEmploiService } from '~/client/services/offreEmploi/offreEmploi.service';

class DependencyException extends Error {
  constructor(key: string) {
    super(`Dependency ${key} not found`);
    this.name = 'DependencyException';
  }
}

const DependenciesContainerContext = createContext<Partial<Dependencies>>({});

export function DependenciesProvider({
  children,
  ...dependencies
}: React.PropsWithChildren<Partial<Dependencies>>) {
  return (
    <DependenciesContainerContext.Provider value={dependencies}>
      {children}
    </DependenciesContainerContext.Provider>
  );
}

export function useDependency(key: keyof Dependencies): OffreEmploiService | LocalisationService {
  const dependencies = useContext(DependenciesContainerContext);
  const dependency: OffreEmploiService | LocalisationService | undefined = dependencies[key];
  if(!dependency) {
    throw new DependencyException(key);
  }
  return dependency;
}
