import { createContext, useContext } from 'react';

const DependenciesContainerContext = createContext({});



export function DependenciesProvider({children, ...dependencies}) {
  return (
    <DependenciesContainerContext.Provider value={dependencies}>
      {children}
    </DependenciesContainerContext.Provider>
  )
}

export function useDeps() {
  return useContext(DependenciesContainerContext);
}