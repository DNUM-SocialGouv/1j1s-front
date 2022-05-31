import React, { createContext, useContext } from 'react';

import {
  Dependencies,
  Dependency,
} from '~/client/dependencies.container';

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

export function useDependency<D = Dependency>(key: keyof Dependencies): D {
  const dependencies = useContext(DependenciesContainerContext);
  const dependency: Dependency | undefined = dependencies[key];
  if(!dependency) {
    throw new DependencyException(key);
  }
  return dependency as unknown as D;
}
