/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen, within } from '@testing-library/react';
import React from 'react';

import { RechercherOffreEmploi } from '~/client/components/features/OffreEmploi/Rechercher/RechercherOffreEmploi';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';
import {
  anOffreService,
  aNoResultOffreService,
  aSingleResultOffreService } from '~/client/services/offre/offreService.fixture';

describe('RechercherOffreEmploi', () => {
  beforeEach(() => {
    mockSmallScreen();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('quand le composant est affiché sans recherche', () => {
    it('affiche un formulaire pour la recherche d‘offres d‘emploi, avec un échantillon de résultat', async () => {
      // GIVEN
      const offreServiceMock = anOffreService();
      const localisationServiceMock = aLocalisationService();
      mockUseRouter({ query: { page: '1' } });
      render(
        <DependenciesProvider
          localisationService={localisationServiceMock}
          offreService={offreServiceMock}
        >
          <RechercherOffreEmploi/>
        </DependenciesProvider>,
      );

      // WHEN
      const formulaireRechercheOffreEmploi = screen.getByRole('form');
      const errorMessage = screen.queryByText('0 résultat');

      // THEN
      expect(formulaireRechercheOffreEmploi).toBeInTheDocument();
      expect(await screen.findByText('3 offres d‘emplois')).toBeInTheDocument();
      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  describe('quand le composant est affiché pour une recherche avec résultats', () => {
    describe('quand la recherche ne comporte pas de mot clé', () => {
      it('affiche les critères de recherche sous forme d‘étiquettes', async () => {
        // GIVEN
        const offreServiceMock = anOffreService();
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
            offreService={offreServiceMock}>
            <RechercherOffreEmploi/>
          </DependenciesProvider>,
        );

        // THEN
        expect(offreServiceMock.rechercherOffreEmploi).toHaveBeenCalledWith('codeLocalisation=26&libelleLocalisation=BOURG%20LES%20VALENCE%20(26)&typeLocalisation=DEPARTEMENT');
        expect(await screen.findByText('3 offres d‘emplois')).toBeInTheDocument();
        const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
        expect(filtresRecherche).toBeInTheDocument();
        expect(within(filtresRecherche).getByText('BOURG LES VALENCE (26)')).toBeInTheDocument();
      });
    });

    describe('quand on recherche par mot clé', () => {
      it('affiche les résultats de recherche et le nombre de résultats', async () => {
        // GIVEN
        const offreServiceMock = anOffreService();
        const localisationServiceMock = aLocalisationService();
        mockUseRouter({ query: { motCle: 'boulanger', page: '1' } });

        render(
          <DependenciesProvider
            localisationService={localisationServiceMock}
            offreService={offreServiceMock}
          >
            <RechercherOffreEmploi/>
          </DependenciesProvider>,
        );

        // WHEN
        const résultatRechercheOffreEmploiList = await screen.findAllByTestId('RésultatRechercherSolution');
        const rechercheOffreEmploiNombreRésultats = await screen.findByText('3 offres d‘emplois pour boulanger');

        // THEN
        expect(résultatRechercheOffreEmploiList).toHaveLength(3);
        expect(rechercheOffreEmploiNombreRésultats).toBeInTheDocument();
        expect(offreServiceMock.rechercherOffreEmploi).toHaveBeenCalledWith('motCle=boulanger&page=1');
      });
    });
  });

  describe('quand le composant est affiché pour une recherche comportant un seul résultat', () => {
    it('affiche le nombre de résultat au singulier', async () => {
      // GIVEN
      const offreServiceMock = aSingleResultOffreService();
      const localisationServiceMock = aLocalisationService();
      mockUseRouter({ query: { motCle: 'barman', page: '1' } });

      render(
        <DependenciesProvider
          localisationService={localisationServiceMock}
          offreService={offreServiceMock}
        >
          <RechercherOffreEmploi/>
        </DependenciesProvider>,
      );

      // WHEN
      const messageNombreRésultats = await screen.findByText('1 offre d‘emploi pour barman');

      // THEN
      expect(messageNombreRésultats).toBeInTheDocument();
    });
  });

  describe('quand le composant est affiché pour une recherche sans résultats', () => {
    it('affiche un message dédié', async () => {
      // GIVEN
      const offreServiceMock = aNoResultOffreService();
      const localisationServiceMock = aLocalisationService();
      mockUseRouter({ query: { motCle: 'mot clé qui ne donne aucun résultat', page: '1' } });

      render(
        <DependenciesProvider
          localisationService={localisationServiceMock}
          offreService={offreServiceMock}
        >
          <RechercherOffreEmploi/>
        </DependenciesProvider>,
      );

      // WHEN
      const errorMessage = await screen.findByText('0 résultat');

      // THEN
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
