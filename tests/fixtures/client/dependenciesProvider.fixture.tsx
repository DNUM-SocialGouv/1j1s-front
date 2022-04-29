import { render, RenderOptions } from '@testing-library/react';
import { aDependenciesContainer } from '@tests/fixtures/client/dependenciesContainer.fixture';
import React, { FC, ReactElement } from 'react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';

const MockedProviders: FC<React.PropsWithChildren<Record<string, unknown>>> = ({ children }) => {
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
