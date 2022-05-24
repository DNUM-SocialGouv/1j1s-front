/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockSmallScreen } from '@tests/client/window.mock';
import { anAlternanceService } from '@tests/fixtures/client/services/alternanceService.fixture';
import { aMétierRecherchéService } from '@tests/fixtures/client/services/métierRecherchéService.fixture';
import React from 'react';

import { RechercherAlternance } from '~/client/components/features/Alternance/Rechercher/RechercherAlternance';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';

describe('RechercherAlternance', () => {
  beforeEach(() => {
    mockSmallScreen();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('quand on recherche par métier', () => {
    it('on appelle l\'api avec la liste de code ROME du métier sélectionné', async () => {
      // GIVEN
      const alternanceService = anAlternanceService();
      const métierRecherchéService = aMétierRecherchéService();
      const user = userEvent.setup();

      mockUseRouter({});
      render(
        <DependenciesProvider alternanceService={alternanceService} métierRecherchéService={métierRecherchéService}>
          <RechercherAlternance />
        </DependenciesProvider>,
      );
      const inputRechercheMétier = screen.getByTestId('InputRechercheMétier');
      const buttonRechercherAlternance = screen.getByTestId('ButtonRechercherAlternance');

      // WHEN
      await user.type(inputRechercheMétier, 'bou');
      const résultatsRechercheMétier = await screen.findByTestId('RésultatsRechercheMétier');

      // WHEN
      expect(métierRecherchéService.rechercherMétier).toHaveBeenCalledWith('bou');
      const resultListitem = within(résultatsRechercheMétier).getAllByRole('option');
      fireEvent.click(resultListitem[0]);

      fireEvent.click(buttonRechercherAlternance);

      // THEN
      await waitFor(() => {
        expect(screen.getByTestId('RechercheAlternanceNombreRésultats')).toBeInTheDocument();
      });
      expect(alternanceService.rechercherAlternance).toHaveBeenCalledWith('codeRomes=D1103%2CD1101%2CH2101');
    });
  });
});
