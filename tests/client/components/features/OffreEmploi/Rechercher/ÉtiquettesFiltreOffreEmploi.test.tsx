/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockSmallScreen } from '@tests/client/window.mock';
import { aLocalisationService } from '@tests/fixtures/client/services/localisationService.fixture';
import { anOffreEmploiService } from '@tests/fixtures/client/services/offreEmploiService.fixture';
import React from 'react';

import { RechercherOffreEmploi } from '~/client/components/features/OffreEmploi/Rechercher/RechercherOffreEmploi';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';

describe('Étiquettes filtre emploi', () => {

  beforeEach(() => {
    mockSmallScreen();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('quand une recherche est lancée', () => {
    it('retourne une liste d\'étiquettes',  async () => {
      const offreEmploiServiceMock = anOffreEmploiService();
      const localisationServiceMock = aLocalisationService();

      mockUseRouter({
        query: {
          codeLocalisation: '26',
          libelleLocalisation: 'BOURG LES VALENCE (26)',
          typeLocalisation: 'DEPARTEMENT',
        },
      });
      render(
        <DependenciesProvider
          localisationService={localisationServiceMock}
          offreEmploiService={offreEmploiServiceMock}>
          <RechercherOffreEmploi/>
        </DependenciesProvider>,
      );

      const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
      expect(filtresRecherche).toBeInTheDocument();
    });
  });
});
