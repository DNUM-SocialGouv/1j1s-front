/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { RechercherMission } from '~/client/components/features/Engagement/Rechercher/RechercherMission';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';
import {
	aMissionEngagementService,
	aSingleResultMissionEngagementService,
} from '~/client/services/missionEngagement/missionEngagementService.fixture';
import { EngagementCategory } from '~/client/utils/engagementsCategory.enum';

describe('RechercherMission', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('quand aucune recherche n‘est lancée', () => {
		it('affiche un formulaire de recherche, sans résultat ou message d‘erreur', () => {
			const missionEngagementServiceMock = aMissionEngagementService();
			const localisationServiceMock = aLocalisationService();

			mockUseRouter({});
			render(
				<DependenciesProvider localisationService={localisationServiceMock} missionEngagementService={missionEngagementServiceMock} >
					<RechercherMission category={EngagementCategory.BENEVOLAT} />
				</DependenciesProvider>,
			);

			// WHEN
			const formulaireRechercheMissionEngagement = screen.getByRole('form');
			const résultatRechercheMissionEngagementList = screen.queryAllByTestId('RésultatRechercherSolution');
			const rechercheMissionEngagementNombreRésultats = screen.queryByTestId('NombreRésultatsSolution');
			const errorMessage = screen.queryByText('0 résultat');

			// THEN
			expect(formulaireRechercheMissionEngagement).toBeInTheDocument();
			expect(résultatRechercheMissionEngagementList).toHaveLength(0);
			expect(rechercheMissionEngagementNombreRésultats).not.toBeInTheDocument();
			expect(errorMessage).not.toBeInTheDocument();
		});
	});

	describe('quand on recherche un service civique', () => {
		describe('quand on recherche par domaine', () => {
			it('appelle l‘api service civique avec le domaine séléctionné', async () => {
				const missionEngagementServiceMock = aMissionEngagementService();
				const localisationServiceMock = aLocalisationService();

				mockUseRouter({ query: { domain: 'culture-loisirs', page: '1' } });
				render(
					<DependenciesProvider localisationService={localisationServiceMock} missionEngagementService={missionEngagementServiceMock} >
						<RechercherMission category={EngagementCategory.SERVICE_CIVIQUE} />
					</DependenciesProvider>,
				);

				expect(await screen.findByText('2 missions de service civique pour Culture et Loisirs')).toBeInTheDocument();
				expect(await screen.findAllByTestId('RésultatRechercherSolution')).toHaveLength(2);
				expect(missionEngagementServiceMock.rechercherMission).toHaveBeenCalledWith('domain=culture-loisirs&page=1', 'service-civique');
			});
		});

		describe('quand la recherche n‘a qu‘un seul résultat', () => {
			it('affiche le nombre de résultat au singulier', async () => {
				const missionEngagementServiceMock = aSingleResultMissionEngagementService();
				const localisationServiceMock = aLocalisationService();

				mockUseRouter({ query: { domain: 'environnement', page: '1' } });
				render(
					<DependenciesProvider localisationService={localisationServiceMock} missionEngagementService={missionEngagementServiceMock} >
						<RechercherMission category={EngagementCategory.SERVICE_CIVIQUE}/>
					</DependenciesProvider>,
				);

				expect(await screen.findByText('1 mission de service civique pour Environnement')).toBeInTheDocument();
			});
		});

		describe('quand on recherche par distance', () => {
			it('appelle l‘api service civique avec la distance sélectionnée', async () => {
				const missionEngagementServiceMock = aMissionEngagementService();
				const localisationServiceMock = aLocalisationService();

				mockUseRouter({ query: { distance: '30', page: '1' } });
				render(
					<DependenciesProvider localisationService={localisationServiceMock} missionEngagementService={missionEngagementServiceMock} >
						<RechercherMission category={EngagementCategory.SERVICE_CIVIQUE} />
					</DependenciesProvider>,
				);
				const user = userEvent.setup();
				const inputCommune = screen.getByTestId('InputCommune');
				await user.type(inputCommune, 'Pari');
				const résultatsCommune = await screen.findByTestId('RésultatsCommune');
				const resultListCommune = within(résultatsCommune).getAllByRole('option');
				fireEvent.click(resultListCommune[0]);
				const selectButtonRadius = screen.getByRole('button', { name: 'Rayon' });
				fireEvent.click(selectButtonRadius);

				expect(screen.getByRole('option', { name: '30 km' })).toBeInTheDocument();
				expect(await screen.findByText('2 missions de service civique')).toBeInTheDocument();
				expect(await screen.findAllByTestId('RésultatRechercherSolution')).toHaveLength(2);
				expect(missionEngagementServiceMock.rechercherMission).toHaveBeenCalledWith('distance=30&page=1', 'service-civique');
			});
		});
	});

	describe('quand on recherche un bénévolat', () => {
		describe('quand on recherche par domaine', () => {
			it('appelle l‘api bénévolat avec le domaine sélectionné', async () => {
				const missionEngagementServiceMock = aMissionEngagementService();
				const localisationServiceMock = aLocalisationService();

				mockUseRouter({ query: { domain: 'environnement', page: '1' } });
				render(
					<DependenciesProvider localisationService={localisationServiceMock} missionEngagementService={missionEngagementServiceMock} >
						<RechercherMission category={EngagementCategory.BENEVOLAT}/>
					</DependenciesProvider>,
				);

				expect(await screen.findByText('2 missions de bénévolat pour Environnement')).toBeInTheDocument();
				expect(await screen.findAllByTestId('RésultatRechercherSolution')).toHaveLength(2);
				expect(missionEngagementServiceMock.rechercherMission).toHaveBeenCalledWith('domain=environnement&page=1', 'bénévolat');
			});
		});

		describe('quand la recherche n‘a qu‘un seul résultat', () => {
			it('affiche le nombre de résultat au singulier', async () => {
				const missionEngagementServiceMock = aSingleResultMissionEngagementService();
				const localisationServiceMock = aLocalisationService();

				mockUseRouter({ query: { domain: 'environnement', page: '1' } });
				render(
					<DependenciesProvider localisationService={localisationServiceMock} missionEngagementService={missionEngagementServiceMock} >
						<RechercherMission category={EngagementCategory.BENEVOLAT}/>
					</DependenciesProvider>,
				);

				expect(await screen.findByText('1 mission de bénévolat pour Environnement')).toBeInTheDocument();
			});
		});

		describe('quand on recherche par distance', () => {
			it('appelle l‘api bénévolat avec la distance sélectionnée', async () => {
				const missionEngagementServiceMock = aMissionEngagementService();
				const localisationServiceMock = aLocalisationService();

				mockUseRouter({ query: { distance: '100', page: '1' } });
				render(
					<DependenciesProvider localisationService={localisationServiceMock} missionEngagementService={missionEngagementServiceMock} >
						<RechercherMission category={EngagementCategory.BENEVOLAT} />
					</DependenciesProvider>,
				);

				const user = userEvent.setup();
				const inputCommune = screen.getByTestId('InputCommune');
				await user.type(inputCommune, 'Pari');
				const résultatsCommune = await screen.findByTestId('RésultatsCommune');
				const resultListCommune = within(résultatsCommune).getAllByRole('option');
				fireEvent.click(resultListCommune[0]);
				const selectButtonRadius = screen.getByRole('button', { name: 'Rayon' });
				fireEvent.click(selectButtonRadius);

				expect(screen.getByRole('option', { name: '100 km' })).toBeInTheDocument();
				expect(await screen.findByText('2 missions de bénévolat')).toBeInTheDocument();
				expect(await screen.findAllByTestId('RésultatRechercherSolution')).toHaveLength(2);
				expect(missionEngagementServiceMock.rechercherMission).toHaveBeenCalledWith('distance=100&page=1', 'bénévolat');
			});
		});
	});
});
