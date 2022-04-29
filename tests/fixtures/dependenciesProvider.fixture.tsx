import { render, RenderOptions } from '@testing-library/react';
import { aDependenciesContainer } from '@tests/fixtures/services/dependenciesContainer.fixture';
import React, { FC, ReactElement } from 'react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';


const MockedProviders: FC = ({ children }) => {
  return (
    <DependenciesProvider dependenciesContainer={aDependenciesContainer()}>
      {children}
    </DependenciesProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: MockedProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
