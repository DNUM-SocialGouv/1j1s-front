/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockSmallScreen } from '@tests/client/window.mock';
import { aLocalisationService } from '@tests/fixtures/client/services/localisationService.fixture';
import {
  anOffreEmploiService,
  aSingleResultOffreEmploiService,
} from '@tests/fixtures/client/services/offreEmploiService.fixture';
import React from 'react';

import { RechercherJobÉtudiant } from '~/client/components/features/JobÉtudiant/Rechercher/RechercherJobÉtudiant';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';

describe('RechercherJobÉtudiant', () => {
  beforeEach(() => {
    mockSmallScreen();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('quand le composant est affiché sans recherche', () => {
    it('affiche un formulaire pour la recherche de jobs étudiants, sans résultat ou message d\'erreur', async () => {
      // GIVEN
      const offreEmploiServiceMock = anOffreEmploiService();
      const localisationServiceMock = aLocalisationService();
      mockUseRouter({});
      render(
        <DependenciesProvider
          localisationService={localisationServiceMock}
          offreEmploiService={offreEmploiServiceMock}
        >
          <RechercherJobÉtudiant/>
        </DependenciesProvider>,
      );

      // WHEN
      const formulaireRechercheOffreEmploi = screen.getByRole('form');
      const résultatRechercheOffreEmploiList = screen.queryAllByTestId('RésultatRechercheOffreEmploi');
      const errorMessage = screen.queryByText('0 résultat');

      // THEN
      expect(formulaireRechercheOffreEmploi).toBeInTheDocument();
      expect(résultatRechercheOffreEmploiList).toHaveLength(0);
      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  describe('quand le composant est affiché avec une recherche avec résultats', () => {
    describe('quand la recherche ne comporte pas de mot clé', () => {
      it('affiche les critères de recherche sous forme d\'étiquettes', async () => {
        // GIVEN
        const offreEmploiServiceMock = anOffreEmploiService();
        const localisationServiceMock = aLocalisationService();
        mockUseRouter({});
        mockUseRouter({
          query: {
            codeLocalisation: '26',
            libelleLocalisation: 'BOURG LES VALENCE (26)',
            typeLocalisation: 'DEPARTEMENT',
          },
        });

        // WHEN
        render(
          <DependenciesProvider
            localisationService={localisationServiceMock}
            offreEmploiService={offreEmploiServiceMock}
          >
            <RechercherJobÉtudiant/>
          </DependenciesProvider>,
        );

        // THEN
        expect(offreEmploiServiceMock.rechercherJobÉtudiant).toHaveBeenCalledWith('codeLocalisation=26&libelleLocalisation=BOURG%20LES%20VALENCE%20(26)&typeLocalisation=DEPARTEMENT');
        expect(await screen.findByText('3 offres de jobs étudiants')).toBeInTheDocument();
        expect(screen.getAllByTestId('TagListItem')[0].textContent).toEqual('BOURG LES VALENCE (26)');
      });
    });

    describe('quand on recherche par mot clé', () => {
      it('affiche les résultats de recherche et le nombre de résultats', async () => {
        // GIVEN
        const offreEmploiServiceMock = anOffreEmploiService();
        const localisationServiceMock = aLocalisationService();
        mockUseRouter({ query: { motCle: 'boulanger', page: '1' } });

        render(
          <DependenciesProvider
            localisationService={localisationServiceMock}
            offreEmploiService={offreEmploiServiceMock}
          >
            <RechercherJobÉtudiant/>
          </DependenciesProvider>,
        );

        // WHEN
        const résultatRechercheOffreEmploiList = await screen.findAllByTestId('RésultatRechercherSolution');
        const rechercheOffreEmploiNombreRésultats = await screen.findByText('3 offres de jobs étudiants pour boulanger');

        // THEN
        expect(résultatRechercheOffreEmploiList).toHaveLength(3);
        expect(rechercheOffreEmploiNombreRésultats).toBeInTheDocument();
        expect(offreEmploiServiceMock.rechercherJobÉtudiant).toHaveBeenCalledWith('motCle=boulanger&page=1');
      });
    });
  });

  describe('quand le composant est affiché avec une recherche comportant un seul résultat', () => {
    it('affiche le nombre de résultat au singulier', async () => {
      // GIVEN
      const offreEmploiServiceMock = aSingleResultOffreEmploiService();
      const localisationServiceMock = aLocalisationService();
      mockUseRouter({ query: { motCle: 'barman', page: '1' } });

      render(
        <DependenciesProvider
          localisationService={localisationServiceMock}
          offreEmploiService={offreEmploiServiceMock}
        >
          <RechercherJobÉtudiant/>
        </DependenciesProvider>,
      );

      // WHEN
      const errorMessage = await screen.findByText('1 offre de job étudiant pour barman');

      // THEN
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('quand le composant est affiché avec une recherche sans résultats', () => {
    it('affiche un message dédié', async () => {
      // GIVEN
      const offreEmploiServiceMock = aSingleResultOffreEmploiService();
      const localisationServiceMock = aLocalisationService();
      mockUseRouter({ query: { motCle: 'mot clé qui ne donne aucun résultat', page: '1' } });

      render(
        <DependenciesProvider
          localisationService={localisationServiceMock}
          offreEmploiService={offreEmploiServiceMock}
        >
          <RechercherJobÉtudiant/>
        </DependenciesProvider>,
      );

      // WHEN
      const errorMessage = await screen.findByText('0 résultat');

      // THEN
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
