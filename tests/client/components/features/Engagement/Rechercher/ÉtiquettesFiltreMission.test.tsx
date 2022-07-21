/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockSmallScreen } from '@tests/client/window.mock';
import { aLocalisationService } from '@tests/fixtures/client/services/localisationService.fixture';
import {
  aMissionEngagementService,
} from '@tests/fixtures/client/services/missionEngagementService.fixture';
import React from 'react';

import { RechercherMission } from '~/client/components/features/Engagement/Rechercher/RechercherMission';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { EngagementCategory } from '~/client/utils/engagementsCategory.enum';

describe('Étiquettes filtre mission', () => {

  beforeEach(() => {
    mockSmallScreen();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('quand une recherche est lancée', () => {
    it('retourne une liste d\'étiquettes', async () => {
      const missionEngagementServiceMock = aMissionEngagementService();
      const localisationServiceMock = aLocalisationService();

      mockUseRouter({ query: { ouvertsAuxMineurs: 'true', page: '1' } });
      render(
        <DependenciesProvider localisationService={localisationServiceMock} missionEngagementService={missionEngagementServiceMock} >
          <RechercherMission category={EngagementCategory.SERVICE_CIVIQUE}/>
        </DependenciesProvider>,
      );

      const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
      expect(filtresRecherche).toBeInTheDocument();
    });
  });
});
