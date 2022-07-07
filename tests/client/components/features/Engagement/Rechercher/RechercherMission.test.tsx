/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockSmallScreen } from '@tests/client/window.mock';
import {
  aMissionEngagementService,
  aSingleResultMissionEngagementService,
} from '@tests/fixtures/client/services/missionEngagementService.fixture';
import React from 'react';

import { RechercherMission } from '~/client/components/features/Engagement/Rechercher/RechercherMission';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';

describe('RechercherMission', () => {
  beforeEach(() => {
    mockSmallScreen();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('quand aucune recherche n\'est lancée', () => {
    it('affiche un formulaire de recherche, sans résultat ou message d\'erreur', () => {
      const missionEngagementServiceMock = aMissionEngagementService();
      mockUseRouter({});
      render(
        <DependenciesProvider missionEngagementService={missionEngagementServiceMock} >
          <RechercherMission category="bénévolat" />
        </DependenciesProvider>,
      );

      // WHEN
      const formulaireRechercheMissionEngagement = screen.getByRole('form');
      const résultatRechercheMissionEngagementList = screen.queryAllByTestId('RésultatRechercherSolution');
      const errorMessage = screen.queryByText('0 résultat');

      // THEN
      expect(formulaireRechercheMissionEngagement).toBeInTheDocument();
      expect(résultatRechercheMissionEngagementList).toHaveLength(0);
      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  describe('quand on recherche un service civique', () => {
    describe('quand on recherche par domaine', () => {
      it('appelle l\'api service civique avec le domaine sélectionné', async () => {
        const missionEngagementServiceMock = aMissionEngagementService();
        mockUseRouter({ query: { domain: 'culture-loisirs', page: '1' } });
        render(
          <DependenciesProvider missionEngagementService={missionEngagementServiceMock} >
            <RechercherMission category="service-civique" />
          </DependenciesProvider>,
        );

        expect(await screen.findByText('2 missions de service civique pour Culture et Loisirs')).toBeInTheDocument();
        expect(await screen.findAllByTestId('RésultatRechercherSolution')).toHaveLength(2);
        expect(missionEngagementServiceMock.rechercherMission).toHaveBeenCalledWith('domain=culture-loisirs&page=1', 'service-civique');
      });
    });

    describe('quand la recherche n\'a qu\'un seul résultat', () => {
      it('affiche le nombre de résultat au singulier', async () => {
        const missionEngagementServiceMock = aSingleResultMissionEngagementService();
        mockUseRouter({ query: { domain: 'environnement', page: '1' } });
        render(
          <DependenciesProvider missionEngagementService={missionEngagementServiceMock} >
            <RechercherMission category="service-civique"/>
          </DependenciesProvider>,
        );

        expect(await screen.findByText('1 mission de service civique pour Environnement')).toBeInTheDocument();
      });
    });

    describe('quand on recherche par distance', () => {
      it('appelle l\'api service civique avec la distance sélectionnée', async () => {
        const missionEngagementServiceMock = aMissionEngagementService();
        mockUseRouter({ query: { distance: '30', page: '1' } });
        render(
          <DependenciesProvider missionEngagementService={missionEngagementServiceMock} >
            <RechercherMission category="service-civique" />
          </DependenciesProvider>,
        );

        expect(screen.getByRole('button', { name: '30 km' })).toBeInTheDocument();
        expect(await screen.findByText('2 missions de service civique')).toBeInTheDocument();
        expect(await screen.findAllByTestId('RésultatRechercherSolution')).toHaveLength(2);
        expect(missionEngagementServiceMock.rechercherMission).toHaveBeenCalledWith('distance=30&page=1', 'service-civique');
      });
    });
  });

  describe('quand on recherche un bénévolat', () => {
    describe('quand on recherche par domaine', () => {
      it('appelle l\'api bénévolat avec le domaine sélectionné', async () => {
        const missionEngagementServiceMock = aMissionEngagementService();
        mockUseRouter({ query: { domain: 'environnement', page: '1' } });
        render(
          <DependenciesProvider missionEngagementService={missionEngagementServiceMock} >
            <RechercherMission category="bénévolat"/>
          </DependenciesProvider>,
        );

        expect(await screen.findByText('2 missions de bénévolat pour Environnement')).toBeInTheDocument();
        expect(await screen.findAllByTestId('RésultatRechercherSolution')).toHaveLength(2);
        expect(missionEngagementServiceMock.rechercherMission).toHaveBeenCalledWith('domain=environnement&page=1', 'bénévolat');
      });
    });

    describe('quand la recherche n\'a qu\'un seul résultat', () => {
      it('affiche le nombre de résultat au singulier', async () => {
        const missionEngagementServiceMock = aSingleResultMissionEngagementService();
        mockUseRouter({ query: { domain: 'environnement', page: '1' } });
        render(
          <DependenciesProvider missionEngagementService={missionEngagementServiceMock} >
            <RechercherMission category="bénévolat"/>
          </DependenciesProvider>,
        );

        expect(await screen.findByText('1 mission de bénévolat pour Environnement')).toBeInTheDocument();
      });
    });

    describe('quand on recherche par distance', () => {
      it('appelle l\'api bénévolat avec la distance sélectionnée', async () => {
        const missionEngagementServiceMock = aMissionEngagementService();
        mockUseRouter({ query: { distance: '100', page: '1' } });
        render(
          <DependenciesProvider missionEngagementService={missionEngagementServiceMock} >
            <RechercherMission category="bénévolat" />
          </DependenciesProvider>,
        );

        expect(screen.getByRole('button', { name: '100 km' })).toBeInTheDocument();
        expect(await screen.findByText('2 missions de bénévolat')).toBeInTheDocument();
        expect(await screen.findAllByTestId('RésultatRechercherSolution')).toHaveLength(2);
        expect(missionEngagementServiceMock.rechercherMission).toHaveBeenCalledWith('distance=100&page=1', 'bénévolat');
      });
    });
  });
});
