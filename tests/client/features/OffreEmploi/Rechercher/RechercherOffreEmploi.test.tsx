/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import {
  mockUseRouter,
  mockUseRouterOnce,
} from '@tests/client/useRouter.mock';
import { mockLargeScreen, mockSmallScreen } from '@tests/client/window.mock';
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
      mockUseRouter({});
      render(
        <DependenciesProvider offreEmploiService={offreEmploiServiceMock}>
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
      mockUseRouter({ query: { motCle: 'boulanger', typeDeContrats: '' } });
      render(
        <DependenciesProvider offreEmploiService={offreEmploiServiceMock}>
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
      expect(offreEmploiServiceMock.rechercherOffreEmploi).toHaveBeenCalledWith('motCle=boulanger&typeDeContrats=');
    });
  });

  describe('quand les filtres avancés sont ouverts', () => {
    it('affiche les filtres dans une modale', async () => {
      const offreEmploiServiceMock = anOffreEmploiService();
      mockUseRouter({ query: { motCle: '', typeDeContrats: 'CDD,MIS' } });

      render(
        <DependenciesProvider offreEmploiService={offreEmploiServiceMock}>
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

      expect(offreEmploiServiceMock.rechercherOffreEmploi).toHaveBeenCalledWith('motCle=&typeDeContrats=CDD%2CMIS');

    });


    it('appelle l\'api avec les filtre sélectionnés', async () => {
      const offreEmploiServiceMock = anOffreEmploiService();

      const routerPush = jest.fn();
      mockUseRouter({ push: routerPush });
      render(
        <DependenciesProvider offreEmploiService={offreEmploiServiceMock}>
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

      mockUseRouterOnce({ query: { motCle: '', typeDeContrats: 'MIS' } });

      fireEvent.click(buttonAppliquerFiltres);

      expect(routerPush).toHaveBeenCalledWith({ query: 'typeDeContrats=MIS' });


      await waitFor(() => {
        expect(screen.getByTestId('RechercheOffreEmploiNombreRésultats')).toBeInTheDocument();
      });

      expect(offreEmploiServiceMock.rechercherOffreEmploi).toHaveBeenCalledWith('motCle=&typeDeContrats=MIS');
    });
  });

  describe('quand la version affichée est "desktop"', () => {
    beforeEach(() => {
      mockLargeScreen();
    });

    it('propose les filtres avancés en accordéon', async () => {
      const offreEmploiServiceMock = anOffreEmploiService();
      mockUseRouter({});

      render(
        <DependenciesProvider offreEmploiService={offreEmploiServiceMock}>
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
