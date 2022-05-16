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
import { aLocalisationService } from '@tests/fixtures/client/services/localisationService.fixture';
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
  });

  describe('quand la recherche est lancée', () => {
    it('affiche les résultats de recherche et le nombre de résultats', async () => {
      const offreEmploiServiceMock = anOffreEmploiService();
      const localisationServiceMock = aLocalisationService();
      mockUseRouter({ query: { motCle: 'boulanger' } });
      render(
        <DependenciesProvider localisationService={localisationServiceMock} offreEmploiService={offreEmploiServiceMock}>
          <RechercherOffreEmploiPage/>
        </DependenciesProvider>,
      );

      const containerRechercheMotClé = screen.getByTestId('InputRechercheMotClé');
      const inputRechercheMotClé = within(containerRechercheMotClé).getByRole('textbox');
      fireEvent.change(inputRechercheMotClé, { target: { value: 'boulanger' } });
      const buttonRechercher = screen.getByTestId('ButtonRechercher');
      fireEvent.click(buttonRechercher);
      const résultatRechercheOffreEmploiList = await screen.findAllByTestId('RésultatRechercherOffreEmploi');
      const rechercheOffreEmploiNombreRésultats = await screen.findByTestId('RechercheOffreEmploiNombreRésultats');

      expect(résultatRechercheOffreEmploiList).toHaveLength(3);
      expect(rechercheOffreEmploiNombreRésultats).toHaveTextContent('3 offres d\'emplois');
      expect(offreEmploiServiceMock.rechercherOffreEmploi).toHaveBeenCalledWith('motCle=boulanger');
    });
  });

  describe('quand les filtres avancés sont ouverts', () => {
    it('affiche les filtres dans une modale', async () => {
      const offreEmploiServiceMock = anOffreEmploiService();
      const localisationServiceMock = aLocalisationService();
      mockUseRouter({ query: { typeDeContrats: 'CDD,MIS' } });

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

      expect(filtreRechercheMobile).toBeInTheDocument();

      const buttonAppliquerFiltres = within(filtreRechercheMobile).getByTestId('ButtonAppliquerFiltres');

      fireEvent.click(buttonAppliquerFiltres);

      await waitFor(() => {
        expect(screen.getByTestId('RechercheOffreEmploiNombreRésultats')).toBeInTheDocument();
      });

      expect(offreEmploiServiceMock.rechercherOffreEmploi).toHaveBeenCalledWith('typeDeContrats=CDD%2CMIS');

    });


    it('appelle l\'api avec les filtres sélectionnés', async () => {
      const offreEmploiServiceMock = anOffreEmploiService();
      const localisationServiceMock = aLocalisationService();

      const routerPush = jest.fn();
      mockUseRouter({ push: routerPush });
      render(
        <DependenciesProvider localisationService={localisationServiceMock} offreEmploiService={offreEmploiServiceMock}>
          <RechercherOffreEmploiPage/>
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

  describe('quand la version affichée est "desktop"', () => {
    beforeEach(() => {
      mockLargeScreen();
    });

    it('propose les filtres avancés en accordéon', async () => {
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

  describe('Quand on recherche par localisation', () => {
    it('N\'affiche pas le menu déroulant quand on tape 1 caractère', async () => {
      const offreEmploiServiceMock = anOffreEmploiService();
      const localisationServiceMock = aLocalisationService();

      mockUseRouter({});
      render(
        <DependenciesProvider localisationService={localisationServiceMock} offreEmploiService={offreEmploiServiceMock}>
          <RechercherOffreEmploiPage/>
        </DependenciesProvider>,
      );

      const user = userEvent.setup();
      const inputLocalisation = screen.getByTestId('InputLocalisation') as HTMLInputElement;

      user.type(inputLocalisation, 'P');

      const resultContainer = screen.queryByTestId('ResultsContainer');
      expect(resultContainer).toBeNull();
    });

    it('quand on tape plus d\'1 caractère, le menu apparaît', async () => {
      const offreEmploiServiceMock = anOffreEmploiService();
      const localisationServiceMock = aLocalisationService();

      mockUseRouter({});
      render(
        <DependenciesProvider localisationService={localisationServiceMock} offreEmploiService={offreEmploiServiceMock}>
          <RechercherOffreEmploiPage/>
        </DependenciesProvider>,
      );
      const user = userEvent.setup();
      const inputLocalisation = screen.getByTestId('InputLocalisation') as HTMLInputElement;
      user.type(inputLocalisation, 'Pa');
      const resultContainer = await screen.findByTestId('ResultsContainer');
      expect(resultContainer).toBeInTheDocument();
    });

    it('quand l\'utilisateur clique, l\'input change', async () => {
      //NOT WORKING
      const offreEmploiServiceMock = anOffreEmploiService();
      const localisationServiceMock = aLocalisationService();
      const user = userEvent.setup();

      mockUseRouter({});
      render(
        <DependenciesProvider localisationService={localisationServiceMock} offreEmploiService={offreEmploiServiceMock}>
          <RechercherOffreEmploiPage/>
        </DependenciesProvider>,
      );

      const inputLocalisation = screen.getByTestId('InputLocalisation') as HTMLInputElement;
      console.log('Before : ', inputLocalisation.value);
      user.type(inputLocalisation, 'Pa');
      const resultContainer = await screen.findByTestId('ResultsContainer');
      const resultListitem = within(resultContainer).getAllByRole('option');
      user.click(resultListitem[0]);
      expect(true).toBe(false);
    });

    it('quand l\'utilisateur clique sur rechercher, on passe la localisation dans la query', async () => {
      //To Do
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

      const inputLocalisation = screen.getByTestId('InputLocalisation') as HTMLInputElement;
      const buttonRechercher = screen.getByTestId('ButtonRechercher');
      user.type(inputLocalisation, 'Pa');
      const resultContainer = await screen.findByTestId('ResultsContainer');
      const resultListitem = within(resultContainer).getAllByRole('option');
      user.click(resultListitem[0]);

      mockUseRouter({ query: { codeInsee: '75', page: '1', typeLocalisation: 'DEPARTEMENT' } });

      user.click(buttonRechercher);
      await waitFor(() => {
        expect(screen.getByTestId('RechercheOffreEmploiNombreRésultats')).toBeInTheDocument();
      });
      expect(offreEmploiServiceMock.rechercherOffreEmploi).toHaveBeenCalledWith('codeInsee=75&page=1&typeLocalisation=DEPARTEMENT');
    });
  });
});
