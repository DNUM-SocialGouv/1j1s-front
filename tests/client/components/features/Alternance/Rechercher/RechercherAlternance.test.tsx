/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockSmallScreen } from '@tests/client/window.mock';
import { anAlternanceService } from '@tests/fixtures/client/services/alternanceService.fixture';
import { aLocalisationService } from '@tests/fixtures/client/services/localisationService.fixture';
import {
  aMétierRecherchéService,
  aMétierRecherchéServiceWithEmptyResponse,
} from '@tests/fixtures/client/services/métierRecherchéService.fixture';
import { aLocalisationListWithCommuneAndDépartement } from '@tests/fixtures/domain/localisation.fixture';
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
      const localisationServiceMock = aLocalisationService();

      const routerPush = jest.fn();
      mockUseRouter({ push: routerPush });
      const user = userEvent.setup();

      render(
        <DependenciesProvider alternanceService={alternanceService} métierRecherchéService={métierRecherchéService} localisationService={localisationServiceMock}>
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
      const localisationServiceMock = aLocalisationService(aLocalisationListWithCommuneAndDépartement());

      const routerPush = jest.fn();
      mockUseRouter({ push: routerPush });
      const user = userEvent.setup();

      render(
        <DependenciesProvider alternanceService={alternanceService} métierRecherchéService={métierRecherchéService} localisationService={localisationServiceMock}>
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
      const localisationServiceMock = aLocalisationService(aLocalisationListWithCommuneAndDépartement());

      mockUseRouter({ query: {} });

      render(
        <DependenciesProvider alternanceService={alternanceService} métierRecherchéService={métierRecherchéService} localisationService={localisationServiceMock}>
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
      const localisationServiceMock = aLocalisationService(aLocalisationListWithCommuneAndDépartement());
      mockUseRouter({ query: {} });
      const user = userEvent.setup();

      render(
        <DependenciesProvider alternanceService={alternanceService} métierRecherchéService={métierRecherchéService} localisationService={localisationServiceMock}>
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
  describe('Recherche par lieu', () => {
    it('quand on recherche avec un lieu', async () => {
      // GIVEN
      const alternanceService = anAlternanceService();
      const métierRecherchéService = aMétierRecherchéService();
      const localisationServiceMock = aLocalisationService(aLocalisationListWithCommuneAndDépartement());

      const user = userEvent.setup();
      const routerPush = jest.fn();
      mockUseRouter({ push: routerPush });
      render(
        <DependenciesProvider alternanceService={alternanceService} métierRecherchéService={métierRecherchéService} localisationService={localisationServiceMock}>
          <RechercherAlternance />
        </DependenciesProvider>,
      );
      const inputRechercheMétier = screen.getByTestId('InputRechercheMétier');
      const inputLocalisation = screen.getByTestId('InputLocalisation');
      const buttonRechercher = screen.getByTestId('ButtonRechercherAlternance');
      // WHEN
      await user.type(inputRechercheMétier, 'bou');
      const résultatsRechercheMétier = await screen.findByTestId('RésultatsRechercheMétier');

      // THEN
      expect(métierRecherchéService.rechercherMétier).toHaveBeenCalledWith('bou');

      // WHEN
      const resultListItem = within(résultatsRechercheMétier).getAllByRole('option');
      fireEvent.click(resultListItem[0]);

      await user.type(inputLocalisation, 'Pa');
      const résultatsLocalisation = await screen.findByTestId('RésultatsLocalisation');

      // WHEN
      expect(localisationServiceMock.rechercheLocalisation).toHaveBeenCalledWith('Pa');
      const resultListitem = within(résultatsLocalisation).getAllByRole('option');

      fireEvent.click(resultListitem[0]);

      mockUseRouter({ query: { codeInsee: '75056', codeRomes: 'D1103%2CD1101%2CH2101', metierSelectionne: 'boulanger' } });
      
      fireEvent.click(buttonRechercher);

      // THEN
      await waitFor(() => {
        expect(screen.getByTestId('RechercheAlternanceNombreRésultats')).toBeInTheDocument();
      });
      expect(routerPush).toHaveBeenCalledWith({ query: 'codeRomes=D1103%2CD1101%2CH2101&metierSelectionne=Boucherie%2C+charcuterie%2C+traiteur&typeLocalisation=COMMUNE&codeInsee=75001_75056' });
      expect(alternanceService.rechercherAlternance).toHaveBeenCalledWith('codeRomes=D1103%2CD1101%2CH2101&codeInsee=75056');
    });
  });
});
