/**
 * @jest-environment jsdom
 */

import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockSmallScreen } from '@tests/client/window.mock';
import { anAlternanceService } from '@tests/fixtures/client/services/alternanceService.fixture';
import { aLocalisationService } from '@tests/fixtures/client/services/localisationService.fixture';
import { aMétierRecherchéService } from '@tests/fixtures/client/services/métierRecherchéService.fixture';
import React from 'react';

import { FormulaireRechercheAlternance } from '~/client/components/features/Alternance/FormulaireRecherche/FormulaireRechercheAlternance';
import { RechercherAlternance } from '~/client/components/features/Alternance/Rechercher/RechercherAlternance';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';

describe('FormulaireRechercheAlternance', () => {
  beforeEach(() => {
    mockSmallScreen();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('quand on recherche par métier', () => {
    it('ajouter le métier aux query params', async () => {
      // GIVEN
      const alternanceService = anAlternanceService();
      const métierRecherchéService = aMétierRecherchéService();
      const localisationServiceMock = aLocalisationService();
      const user = userEvent.setup();
      const routerPush = jest.fn();
      mockUseRouter({ push: routerPush });

      render(
        <DependenciesProvider
          alternanceService={alternanceService}
          métierRecherchéService={métierRecherchéService}
          localisationService={localisationServiceMock}>
          <FormulaireRechercheAlternance />
        </DependenciesProvider>,
      );

      const inputRechercheMétier = screen.getByTestId('InputRechercheMétier');
      const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });

      // WHEN
      await user.type(inputRechercheMétier, 'boulanger');
      const résultatsRechercheMétier = await screen.findByTestId('RésultatsRechercheMétier');
      const resultListMétier = within(résultatsRechercheMétier).getAllByRole('option');
      expect(métierRecherchéService.rechercherMétier).toHaveBeenCalledWith('boulanger');
      fireEvent.click(resultListMétier[0]);
      fireEvent.click(buttonRechercher);

      // THEN
      expect(routerPush).toHaveBeenCalledWith({ query: 'metierSelectionne=Boulangerie%2C+p%C3%A2tisserie%2C+chocolaterie&codeRomes=D1102%2CD1104&page=1' }, undefined, { shallow: true });
    });
  });

  describe('quand on recherche par métier et par lieu', () => {
    it('ajoute le métier et le lieu et le rayon par défaut aux query params', async () => {
      // GIVEN
      const alternanceService = anAlternanceService();
      const métierRecherchéService = aMétierRecherchéService();
      const localisationServiceMock = aLocalisationService();

      const user = userEvent.setup();
      const routerPush = jest.fn();
      mockUseRouter({
        push: routerPush,
        query: {
          codeRomes: 'D1103%252CD1101%252CH2101',
          metierSelectionne: 'Boucherie%252C%2Bcharcuterie%252C%2Btraiteur',
        },
      });
      render(
        <DependenciesProvider
          alternanceService={alternanceService}
          métierRecherchéService={métierRecherchéService}
          localisationService={localisationServiceMock}>
          <RechercherAlternance />
        </DependenciesProvider>,
      );

      const inputCommune = screen.getByTestId('InputCommune');
      const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });

      //  WHEN
      await user.type(inputCommune, 'Pari');
      const résultatsCommune = await screen.findByTestId('RésultatsCommune');
      const resultListCommune = within(résultatsCommune).getAllByRole('option');
      fireEvent.click(resultListCommune[0]);
      fireEvent.click(buttonRechercher);

      // THEN
      expect(routerPush).toHaveBeenCalledWith({ query: 'metierSelectionne=Boucherie%25252C%252Bcharcuterie%25252C%252Btraiteur&codeRomes=D1103%25252CD1101%25252CH2101&libelleCommune=Paris&codeCommune=75056&latitudeCommune=48.859&longitudeCommune=2.347&distanceCommune=10&page=1' }, undefined, { shallow: true });
    });
  });

  describe('quand on recherche par métier,lieu et rayon', () => {
    it('ajoute le métier, le lieu et le rayon aux query params', async () => {
      // GIVEN
      const alternanceService = anAlternanceService();
      const métierRecherchéService = aMétierRecherchéService();
      const localisationServiceMock = aLocalisationService();

      const routerPush = jest.fn();
      mockUseRouter({
        push: routerPush,
        query: {
          codeCommune: '75056',
          codeRomes: 'D1103%252CD1101%252CH2101',
          distanceCommune: '10',
          latitudeCommune: '48.859',
          libelleCommune: 'Paris',
          longitudeCommune: '2.347',
          metierSelectionne: 'Boucherie%252C%2Bcharcuterie%252C%2Btraiteur',
        },
      });
      render(
        <DependenciesProvider
          alternanceService={alternanceService}
          métierRecherchéService={métierRecherchéService}
          localisationService={localisationServiceMock}>
          <RechercherAlternance />
        </DependenciesProvider>,
      );

      const button = await screen.findByText('10 km');
      fireEvent.click(button);

      const optionsRadius = await screen.findByTestId('Select-distanceCommune');
      const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });

      //  WHEN
      await waitFor(() => {
        expect(optionsRadius).toBeInTheDocument();
      });

      const inputRadius = within(optionsRadius).getAllByRole('option');
      fireEvent.click(inputRadius[1]);
      fireEvent.click(buttonRechercher);

      // THEN
      expect(routerPush).toHaveBeenCalledWith({ query: 'metierSelectionne=Boucherie%25252C%252Bcharcuterie%25252C%252Btraiteur&codeRomes=D1103%25252CD1101%25252CH2101&libelleCommune=Paris&codeCommune=75056&latitudeCommune=48.859&longitudeCommune=2.347&distanceCommune=30&page=1' }, undefined, { shallow: true });
    });
  });
});
