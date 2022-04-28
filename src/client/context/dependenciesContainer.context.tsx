import React, { createContext, useContext } from 'react';

import { OffreEmploiService } from '../services/offreEmploi.service';

const DependenciesContainerContext = createContext({});

interface DependenciesContainer {
  offreEmploiService: OffreEmploiService
}

export function DependenciesProvider({
  children,
  ...dependencies
}: React.PropsWithChildren<Record<string, unknown>>) {
  return (
    <DependenciesContainerContext.Provider value={dependencies}>
      {children}
    </DependenciesContainerContext.Provider>
  );
}

export function useDeps(): Record<string, DependenciesContainer> {
  return useContext(DependenciesContainerContext);
}
