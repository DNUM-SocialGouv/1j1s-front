/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import '~/client/utils/form/form.util';

import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { mockLargeScreen, mockSmallScreen } from '@tests/client/window.mock';
import { anOffreEmploiService } from '@tests/fixtures/client/services/offreEmploiService.fixture';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import RechercherOffresEmploi from '~/pages/emplois';

describe('Page rechercher offres emploi', () => {
  beforeAll(() => {
    mockSmallScreen();
  });

  describe('quand on arrive sur la page', () => {
    it('affiche un formulaire pour la recherche d\'offres d\'emploi et aucun résultat', () => {
      const offreEmploiServiceMock = anOffreEmploiService();

      render(
        <DependenciesProvider offreEmploiService={offreEmploiServiceMock}>
          <RechercherOffresEmploi/>
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

      render(
        <DependenciesProvider offreEmploiService={offreEmploiServiceMock}>
          <RechercherOffresEmploi/>
        </DependenciesProvider>,
      );

      const containerRechercheMotClé = screen.getByTestId('InputRechercheMotClé');
      const inputRechercheMotClé = within(containerRechercheMotClé).getByRole('textbox');
      fireEvent.change(inputRechercheMotClé, { target: { value: 'boulanger' } });
      const buttonRechercher = screen.getByTestId('ButtonRechercher');
      fireEvent.click(buttonRechercher);
      const résultatRechercheOffreEmploiList = await screen.findAllByTestId('RésultatRechercheOffreEmploi');
      const rechercheOffreEmploiNombreRésultats = await screen.findByTestId('RechercheOffreEmploiNombreRésultats');

      expect(résultatRechercheOffreEmploiList).toHaveLength(3);
      expect(rechercheOffreEmploiNombreRésultats).toHaveTextContent('3 offres d\'emplois');
      expect(offreEmploiServiceMock.rechercherOffreEmploi).toHaveBeenCalledWith({
        motCle: 'boulanger',
        typeDeContrats: '',
      });
    });
  });

  describe('quand les filtres avancés sont ouverts', () => {
    it('affiche les filtres dans une modale', async () => {
      const offreEmploiServiceMock = anOffreEmploiService();

      render(
        <DependenciesProvider offreEmploiService={offreEmploiServiceMock}>
          <RechercherOffresEmploi/>
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

      expect(offreEmploiServiceMock.rechercherOffreEmploi).toHaveBeenCalledWith({
        motCle: '',
        typeDeContrats: 'CDD,MIS',
      });
    });
  });

  describe('quand la version affichée est "desktop"', () => {
    beforeAll(() => {
      mockLargeScreen();
    });

    it('propose les filtres avancés en accordéon', async () => {
      const offreEmploiServiceMock = anOffreEmploiService();

      render(
        <DependenciesProvider offreEmploiService={offreEmploiServiceMock}>
          <RechercherOffresEmploi/>
        </DependenciesProvider>,
      );

      const buttonFiltresRecherche = screen.getByTestId('ButtonFiltrerRecherche');
      fireEvent.click(buttonFiltresRecherche);
      const filtreRechercheDesktop = await screen.findByTestId('FiltreRechercheDesktop');

      expect(filtreRechercheDesktop).toBeInTheDocument();
    });
  });
});
