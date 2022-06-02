/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockSmallScreen } from '@tests/client/window.mock';
import { anAlternanceService } from '@tests/fixtures/client/services/alternanceService.fixture';
import {
  aMétierRecherchéService,
  aMétierRecherchéServiceWithEmptyResponse,
} from '@tests/fixtures/client/services/métierRecherchéService.fixture';
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
      const routerPush = jest.fn();
      mockUseRouter({ push: routerPush });
      const user = userEvent.setup();

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
      expect(métierRecherchéService.rechercherMétier).toHaveBeenCalledWith('bou');

      mockUseRouter({ query: { codeRomes: 'D1103%2CD1101%2CH2101', metierSelectionne: 'boulanger' } });

      // WHEN
      const resultListItem = within(résultatsRechercheMétier).getAllByRole('option');
      fireEvent.click(resultListItem[0]);

      fireEvent.click(buttonRechercherAlternance);

      // THEN
      expect(await screen.findByTestId('RechercheAlternanceNombreRésultats')).toBeInTheDocument();
      expect(alternanceService.rechercherAlternance).toHaveBeenCalledWith('codeRomes=D1103%2CD1101%2CH2101');
    });
  });

  describe('quand le métier recherché n\'a pas été trouvé' , () => {
    it('on affiche un message d\'information et on n\'appelle pas l\'api', async () => {
      // GIVEN
      const alternanceService = anAlternanceService();
      const métierRecherchéService = aMétierRecherchéServiceWithEmptyResponse();
      const routerPush = jest.fn();
      mockUseRouter({ push: routerPush });
      const user = userEvent.setup();

      render(
        <DependenciesProvider alternanceService={alternanceService} métierRecherchéService={métierRecherchéService}>
          <RechercherAlternance />
        </DependenciesProvider>,
      );
      const inputRechercheMétier = screen.getByTestId('InputRechercheMétier');
      const buttonRechercherAlternance = screen.getByTestId('ButtonRechercherAlternance');

      // WHEN
      await user.type(inputRechercheMétier, 'fake métier');

      // WHEN
      expect(métierRecherchéService.rechercherMétier).toHaveBeenCalledWith('fake métier');
      fireEvent.click(buttonRechercherAlternance);

      // THEN
      expect(await screen.findByTestId('MétierRecherchéNoResultMessage')).toBeInTheDocument();
      expect(alternanceService.rechercherAlternance).not.toHaveBeenCalled();
    });
  });

  describe('quand il n\'y a aucun métier recherché' , () => {
    it('on affiche un message d\'erreur et on n\'appelle pas l`\'api', async () => {
      // GIVEN
      const alternanceService = anAlternanceService();
      const métierRecherchéService = aMétierRecherchéService();
      mockUseRouter({ query: {} });

      render(
        <DependenciesProvider alternanceService={alternanceService} métierRecherchéService={métierRecherchéService}>
          <RechercherAlternance />
        </DependenciesProvider>,
      );
      const buttonRechercherAlternance = screen.getByTestId('ButtonRechercherAlternance');

      // WHEN
      fireEvent.click(buttonRechercherAlternance);

      // THEN
      expect(await screen.findByTestId('RequiredFieldErrorMessage')).toBeInTheDocument();
      expect(métierRecherchéService.rechercherMétier).not.toHaveBeenCalled();
      expect(alternanceService.rechercherAlternance).not.toHaveBeenCalled();
    });
  });

  describe('quand l\'utilisateur sélectionne un métier puis enlève la recherche' , () => {
    it('on affiche un message d\'erreur et on n\'appelle pas l`\'api', async () => {
      // GIVEN
      const alternanceService = anAlternanceService();
      const métierRecherchéService = aMétierRecherchéService();
      mockUseRouter({ query: {} });
      const user = userEvent.setup();

      render(
        <DependenciesProvider alternanceService={alternanceService} métierRecherchéService={métierRecherchéService}>
          <RechercherAlternance />
        </DependenciesProvider>,
      );
      const inputRechercheMétier = screen.getByTestId('InputRechercheMétier');
      const buttonRechercherAlternance = screen.getByTestId('ButtonRechercherAlternance');

      // WHEN
      await user.type(inputRechercheMétier, 'fake métier');
      await user.clear(inputRechercheMétier);

      // WHEN
      fireEvent.click(buttonRechercherAlternance);

      // THEN
      expect(await screen.findByTestId('RequiredFieldErrorMessage')).toBeInTheDocument();
      expect(alternanceService.rechercherAlternance).not.toHaveBeenCalledWith('');
      expect(alternanceService.rechercherAlternance).not.toHaveBeenCalled();
    });
  });
});
