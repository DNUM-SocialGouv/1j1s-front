/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockLargeScreen, mockSmallScreen } from '@tests/client/window.mock';
import {
  aLocalisationService,
  aLocalisationServiceWithEmptyRésultat,
} from '@tests/fixtures/client/services/localisationService.fixture';
import { anOffreEmploiService } from '@tests/fixtures/client/services/offreEmploiService.fixture';
import React from 'react';

import { RechercherOffreEmploi } from '~/client/components/features/OffreEmploi/Rechercher/RechercherOffreEmploi';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import RechercherOffreEmploiPage from '~/pages/emplois';

describe('RechercherOffreEmploi', () => {
  beforeEach(() => {
    mockSmallScreen();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('quand on arrive sur la page', () => {
    it('affiche un formulaire pour la recherche d\'offres d\'emploi et aucun résultat', () => {
      const offreEmploiServiceMock = anOffreEmploiService();
      const localisationServiceMock = aLocalisationService();
      mockUseRouter({});
      render(
        <DependenciesProvider localisationService={localisationServiceMock} offreEmploiService={offreEmploiServiceMock}>
          <RechercherOffreEmploiPage/>
        </DependenciesProvider>,
      );

      const résultatRechercheOffreEmploiList = screen.queryAllByTestId('RésultatRechercheOffreEmploi');
      const rechercheOffreEmploiNombreRésultats = screen.queryByTestId('RechercheOffreEmploiNombreRésultats');

      expect(résultatRechercheOffreEmploiList).toHaveLength(0);
      expect(rechercheOffreEmploiNombreRésultats).not.toBeInTheDocument();
    });

    it('avec une url contenant le motCle boulanger, le codeInsee 75 et le type de localisation DEPARTEMENT, affiche la liste de tag avec boulanger et Paris (75)', async () => {
      const offreEmploiServiceMock = anOffreEmploiService();
      const localisationServiceMock = aLocalisationService();
      mockUseRouter({ query: { codeInsee: '75', motCle: 'boulanger', typeLocalisation: 'DEPARTEMENT' } });
      render(
        <DependenciesProvider localisationService={localisationServiceMock} offreEmploiService={offreEmploiServiceMock}>
          <RechercherOffreEmploiPage/>
        </DependenciesProvider>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('TagList')).toBeInTheDocument();
      });

      const tagList = screen.getAllByTestId('TagListItem');
      expect(localisationServiceMock.récupérerLocalisationAvecCodeInsee).toHaveBeenCalledWith('DEPARTEMENT', '75');
      expect(offreEmploiServiceMock.rechercherOffreEmploi).toHaveBeenCalledWith('codeInsee=75&motCle=boulanger&typeLocalisation=DEPARTEMENT');
      expect(tagList[0].textContent).toEqual('boulanger');
      expect(tagList[1].textContent).toEqual('Paris (75)');
    });
  });

  describe('pour la version mobile', () => {
    describe('quand on recherche par mot clé', () => {
      it('affiche les résultats de recherche et le nombre de résultats', async () => {
        const offreEmploiServiceMock = anOffreEmploiService();
        const localisationServiceMock = aLocalisationService();
        const routerPush = jest.fn();
        mockUseRouter({ push: routerPush });

        render(
          <DependenciesProvider localisationService={localisationServiceMock} offreEmploiService={offreEmploiServiceMock}>
            <RechercherOffreEmploiPage/>
          </DependenciesProvider>,
        );

        const containerRechercheMotClé = screen.getByTestId('InputRechercheMotClé');
        const inputRechercheMotClé = within(containerRechercheMotClé).getByRole('textbox');
        fireEvent.change(inputRechercheMotClé, { target: { value: 'boulanger' } });
        const buttonRechercher = screen.getByTestId('ButtonRechercher');
        mockUseRouter({ query: { motCle: 'boulanger', page: '1' } });
        fireEvent.click(buttonRechercher);

        const résultatRechercheOffreEmploiList = await screen.findAllByTestId('RésultatRechercherOffreEmploi');
        const rechercheOffreEmploiNombreRésultats = await screen.findByTestId('RechercheOffreEmploiNombreRésultats');

        expect(routerPush).toHaveBeenCalledWith({ query: 'motCle=boulanger&page=1' });

        expect(résultatRechercheOffreEmploiList).toHaveLength(3);
        expect(rechercheOffreEmploiNombreRésultats).toHaveTextContent('3 offres d\'emplois');
        expect(offreEmploiServiceMock.rechercherOffreEmploi).toHaveBeenCalledWith('motCle=boulanger&page=1');
      });
    });

    describe('quand on recherche par type de contrat', () => {
      it('affiche les types de contrat dans une modale', async () => {
        const offreEmploiServiceMock = anOffreEmploiService();
        const localisationServiceMock = aLocalisationService();
        const routerPush = jest.fn();
        mockUseRouter({ push: routerPush });

        render(
          <DependenciesProvider localisationService={localisationServiceMock} offreEmploiService={offreEmploiServiceMock}>
            <RechercherOffreEmploi />
          </DependenciesProvider>,
        );

        const buttonFiltresRecherche = screen.getByTestId('ButtonFiltrerRecherche');
        fireEvent.click(buttonFiltresRecherche);
        const filtreRechercheMobile = await screen.findByTestId('FiltreRechercheMobile');
        const containerFiltreTypeDeContrats = within(filtreRechercheMobile).getByTestId('FiltreTypeDeContrats');
        const inputRechercheMotClé = within(containerFiltreTypeDeContrats).getAllByRole('checkbox');
        fireEvent.click(inputRechercheMotClé[0]);
        fireEvent.click(inputRechercheMotClé[2]);
        fireEvent.click(inputRechercheMotClé[0]);

        expect(filtreRechercheMobile).toBeInTheDocument();

        const buttonAppliquerFiltres = within(filtreRechercheMobile).getByTestId('ButtonAppliquerFiltres');

        mockUseRouter({ query: { page: '1', typeDeContrats: 'MIS' } });

        fireEvent.click(buttonAppliquerFiltres);

        expect(routerPush).toHaveBeenCalledWith({ query: 'typeDeContrats=MIS&page=1' });

        await waitFor(() => {
          expect(screen.getByTestId('RechercheOffreEmploiNombreRésultats')).toBeInTheDocument();
        });

        expect(offreEmploiServiceMock.rechercherOffreEmploi).toHaveBeenCalledWith('page=1&typeDeContrats=MIS');
      });
    });

    describe('quand on recherche par localisation', () => {
      it('quand aucun résultat n\'est trouvé, on affiche un message d\'information', async () => {
        const offreEmploiServiceMock = anOffreEmploiService();
        const localisationServiceMock = aLocalisationServiceWithEmptyRésultat();

        mockUseRouter({});
        render(
          <DependenciesProvider localisationService={localisationServiceMock} offreEmploiService={offreEmploiServiceMock}>
            <RechercherOffreEmploiPage/>
          </DependenciesProvider>,
        );

        const user = userEvent.setup();
        const inputLocalisation = screen.getByTestId('InputLocalisation') as HTMLInputElement;

        await user.type(inputLocalisation, 'no result');

        const resultContainer = screen.queryByTestId('LocalisationNoResultMessage');
        expect(resultContainer).toBeInTheDocument();
      });

      it('quand on recherche avec une saisie valide, appelle l\'api avec la localisation sélectionnée', async () => {
        const offreEmploiServiceMock = anOffreEmploiService();
        const localisationServiceMock = aLocalisationService();
        const user = userEvent.setup();
        const routerPush = jest.fn();
        mockUseRouter({ push: routerPush });
        render(
          <DependenciesProvider localisationService={localisationServiceMock} offreEmploiService={offreEmploiServiceMock}>
            <RechercherOffreEmploiPage/>
          </DependenciesProvider>,
        );

        const inputLocalisation = screen.getByTestId('InputLocalisation');
        const buttonRechercher = screen.getByTestId('ButtonRechercher');

        await user.type(inputLocalisation, 'Pa');
        const resultContainer = await screen.findByTestId('RésultatsLocalisation');

        expect(localisationServiceMock.rechercheLocalisation).toHaveBeenCalledWith('Pa');

        const resultListitem = within(resultContainer).getAllByRole('option');
        fireEvent.click(resultListitem[0]);

        mockUseRouter({ query: { codeInsee: '75', page: '1', typeLocalisation: 'DEPARTEMENT' } });

        fireEvent.click(buttonRechercher);

        expect(routerPush).toHaveBeenCalledWith({ query: 'typeLocalisation=DEPARTEMENT&codeInsee=75&page=1' });

        await waitFor(() => {
          expect(screen.getByTestId('RechercheOffreEmploiNombreRésultats')).toBeInTheDocument();
        });

        expect(offreEmploiServiceMock.rechercherOffreEmploi).toHaveBeenCalledWith('codeInsee=75&page=1&typeLocalisation=DEPARTEMENT');
      });
    });
  });

  describe('pour la version desktop', () => {
    beforeEach(() => {
      mockLargeScreen();
    });

    it('on propose les filtres avancés en accordéon', async () => {
      const offreEmploiServiceMock = anOffreEmploiService();
      const localisationServiceMock = aLocalisationService();
      mockUseRouter({});

      render(
        <DependenciesProvider localisationService={localisationServiceMock} offreEmploiService={offreEmploiServiceMock}>
          <RechercherOffreEmploiPage/>
        </DependenciesProvider>,
      );

      const buttonFiltresRecherche = screen.getByTestId('ButtonFiltrerRecherche');
      fireEvent.click(buttonFiltresRecherche);
      const filtreRechercheDesktop = await screen.findByTestId('FiltreRechercheDesktop');

      expect(filtreRechercheDesktop).toBeInTheDocument();
    });
  });
});

