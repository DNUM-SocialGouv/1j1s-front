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
import {
  anAlternanceService,
  anAlternanceServiceWithErrorDemandeIncorrecte,
  anAlternanceServiceWithErrorInattendue,
  anAlternanceServiceWithErrorServiceIndisponible,
  anEmptyAlternanceService,
} from '@tests/fixtures/client/services/alternanceService.fixture';
import { aLocalisationService } from '@tests/fixtures/client/services/localisationService.fixture';
import {
  aMétierRecherchéService,
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

  describe('quand le composant est affiché sans recherche', () => {
    it('affiche un formulaire pour la recherche d\'offres d\'alternance, sans résultat ou message d\'erreur', async () => {
      // GIVEN
      const alternanceService = anAlternanceService();
      const métierRecherchéService = aMétierRecherchéService();
      const localisationServiceMock = aLocalisationService();

      mockUseRouter({});

      render(
        <DependenciesProvider
          alternanceService={alternanceService}
          métierRecherchéService={métierRecherchéService}
          localisationService={localisationServiceMock}>
          <RechercherAlternance />
        </DependenciesProvider>,
      );

      // WHEN
      const formulaireRechercheAlternance = screen.getByRole('form');
      const résultatRechercheAlternanceList = screen.queryAllByTestId('RésultatRechercheAlternance');
      const rechercheOffreEmploiNombreRésultats = screen.queryByTestId('NombreRésultatsSolution');
      const errorMessage = screen.queryByText('0 résultat');

      // THEN
      expect(formulaireRechercheAlternance).toBeInTheDocument();
      expect(résultatRechercheAlternanceList).toHaveLength(0);
      expect(rechercheOffreEmploiNombreRésultats).not.toBeInTheDocument();
      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  describe('quand le composant est affiché pour une recherche avec résultats', () => {
    describe('quand on recherche par métier', () => {
      it('affiche les résultats de recherche et le nombre de résultats', async () => {
        // GIVEN
        const alternanceService = anAlternanceService();
        const métierRecherchéService = aMétierRecherchéService();
        const localisationServiceMock = aLocalisationService();
        mockUseRouter({});
        mockUseRouter({
          query: {
            codeRomes: 'D1103%2CD1101%2CH2101',
            metierSelectionne: 'boulanger',
          },
        });

        // WHEN
        render(
          <DependenciesProvider
            alternanceService={alternanceService}
            métierRecherchéService={métierRecherchéService}
            localisationService={localisationServiceMock}>
            <RechercherAlternance />
          </DependenciesProvider>,
        );

        // THEN
        expect(alternanceService.rechercherAlternance).toHaveBeenCalledWith('codeRomes=D1103%252CD1101%252CH2101&metierSelectionne=boulanger');
        await waitFor(() => {
          expect(screen.getByText('4 contrats d\'alternances pour boulanger')).toBeInTheDocument();
        });

        const résultatRechercheAlternanceList = await screen.findAllByTestId('RésultatRechercherSolution');
        expect(résultatRechercheAlternanceList).toHaveLength(4);

      });
    });

    describe('quand on recherche par métier et par lieu', () => {
      it('affiche les résultats de recherche et le nombre de résultats et les étiquettes', async () => {
        // GIVEN
        const alternanceService = anAlternanceService();
        const métierRecherchéService = aMétierRecherchéService();
        const localisationServiceMock = aLocalisationService();

        const user = userEvent.setup();
        const routerPush = jest.fn();
        mockUseRouter({
          push: routerPush,
          query: {
            codeRomes: 'D1103%2CD1101%2CH2101',
            metierSelectionne: 'boucherie',
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
        const buttonRechercher = screen.getByTestId('ButtonRechercherAlternance');

        await user.type(inputCommune, 'Pa');
        const résultatsCommune = await screen.findByTestId('RésultatsCommune');

        // WHEN
        expect(localisationServiceMock.rechercherCommune).toHaveBeenCalledWith('Pa');
        const resultListCommune = within(résultatsCommune).getAllByRole('option');

        fireEvent.click(resultListCommune[0]);



        fireEvent.click(buttonRechercher);

        const résultatRechercheAlternanceList = await screen.findAllByTestId('RésultatRechercherSolution');
        expect(résultatRechercheAlternanceList).toHaveLength(4);
        expect(screen.getAllByTestId('TagListItem')[0].textContent).toEqual('AURILLAC (15)');
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
        const localisationServiceMock = aLocalisationService();
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
  });

  describe('quand le composant est affiché pour une recherche infructueuse', () => {
    describe('quand il n\'y a aucun résultat', () => {
      it('retourne le message d\'erreur correspondant', async () => {
        // GIVEN
        const alternanceService = anEmptyAlternanceService();
        const métierRecherchéService = aMétierRecherchéService();
        const localisationServiceMock = aLocalisationService(aLocalisationListWithCommuneAndDépartement());
        mockUseRouter({ query: { codeRomes: 'D1103%2CD1101%2CH2101', metierSelectionne: 'boulanger' } });

        render(
          <DependenciesProvider alternanceService={alternanceService} métierRecherchéService={métierRecherchéService} localisationService={localisationServiceMock}>
            <RechercherAlternance />
          </DependenciesProvider>,
        );

        await waitFor(async () => {
          // WHEN
          const errorMessage = await screen.findByText('0 résultat');

          // THEN
          expect(errorMessage).toBeInTheDocument();
        });
      });
    });

    describe('quand il y a une erreur inattendue', () => {
      it('retourne le message d\'erreur correspondant', async () => {
        // GIVEN
        const alternanceService = anAlternanceServiceWithErrorInattendue();
        const métierRecherchéService = aMétierRecherchéService();
        const localisationServiceMock = aLocalisationService(aLocalisationListWithCommuneAndDépartement());
        mockUseRouter({ query: { codeRomes: 'D1103%2CD1101%2CH2101', metierSelectionne: 'boulanger' } });

        render(
          <DependenciesProvider alternanceService={alternanceService} métierRecherchéService={métierRecherchéService} localisationService={localisationServiceMock}>
            <RechercherAlternance />
          </DependenciesProvider>,
        );

        // WHEN
        const unexpectedErrorMessage = await screen.findByText('Erreur inattendue');

        // THEN
        await waitFor(() => {
          expect(unexpectedErrorMessage).toBeInTheDocument();
        });
      });
    });

    describe('quand le service est indisponible', () => {
      it('retourne le message d\'erreur correspondant', async () => {
        // GIVEN
        const alternanceService = anAlternanceServiceWithErrorServiceIndisponible();
        const métierRecherchéService = aMétierRecherchéService();
        const localisationServiceMock = aLocalisationService(aLocalisationListWithCommuneAndDépartement());
        mockUseRouter({ query: { codeRomes: 'D1103%2CD1101%2CH2101', metierSelectionne: 'boulanger' } });

        render(
          <DependenciesProvider alternanceService={alternanceService} métierRecherchéService={métierRecherchéService} localisationService={localisationServiceMock}>
            <RechercherAlternance />
          </DependenciesProvider>,
        );

        // WHEN
        const unavailableServiceErrorMessage = await screen.findByText('Service indisponible');

        // THEN
        await waitFor(() => {
          expect(unavailableServiceErrorMessage).toBeInTheDocument();
        });
      });
    });

    describe('quand la demande est incorrecte', () => {
      it('retourne le message d\'erreur correspondant', async () => {
        // GIVEN
        const alternanceService = anAlternanceServiceWithErrorDemandeIncorrecte();
        const métierRecherchéService = aMétierRecherchéService();
        const localisationServiceMock = aLocalisationService(aLocalisationListWithCommuneAndDépartement());
        mockUseRouter({ query: { codeRomes: 'D1', metierSelectionne: 'b' } });

        render(
          <DependenciesProvider alternanceService={alternanceService} métierRecherchéService={métierRecherchéService} localisationService={localisationServiceMock}>
            <RechercherAlternance />
          </DependenciesProvider>,
        );

        // WHEN
        const incorrectRequestErrorMessage = await screen.findByText('Erreur - Demande incorrecte');

        // THEN
        await waitFor(() => {
          expect(incorrectRequestErrorMessage).toBeInTheDocument();
        });
      });
    });
  });
});
