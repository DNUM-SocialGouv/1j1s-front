import { render, RenderOptions } from '@testing-library/react';
import { anOffreEmploiService } from '@tests/fixtures/client/services/offreEmploiService.fixture';
import React, { ReactElement } from 'react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';

function MockedProviders ({ children }: React.PropsWithChildren<unknown>) {
  return (
    <DependenciesProvider offreEmploiService={anOffreEmploiService()}>
      {children}
    </DependenciesProvider>
  );
}

function customRender (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, { wrapper: MockedProviders, ...options });
}

export * from '@testing-library/react';
export { customRender as render };
