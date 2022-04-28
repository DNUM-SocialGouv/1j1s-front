import { render, RenderOptions } from '@testing-library/react';
import { aRésultatsRechercheOffreEmploi } from '@tests/fixtures/domain/offreEmploi.fixture';
import { anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';
import React, { FC, ReactElement } from 'react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';

const dependenciesContainerMocked = () => {
  return {
    offreEmploiService: unOffreEmploiService(),
  };
};

const unOffreEmploiService = () => {
  return {
    rechercherOffreEmploi: jest.fn().mockResolvedValue(anAxiosResponse(aRésultatsRechercheOffreEmploi())),
  };
};

const MockedProviders: FC = ({ children }) => {
  return (
    <DependenciesProvider dependenciesContainer={dependenciesContainerMocked()}>
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
