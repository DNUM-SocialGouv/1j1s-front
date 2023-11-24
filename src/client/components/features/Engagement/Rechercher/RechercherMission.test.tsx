/**
 * @jest-environment jsdom
 */
import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { RechercherMission } from '~/client/components/features/Engagement/Rechercher/RechercherMission';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
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
				<DependenciesProvider
					localisationService={localisationServiceMock}
					missionEngagementService={missionEngagementServiceMock}
				>
					<RechercherMission category={EngagementCategory.BENEVOLAT}/>
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
					<DependenciesProvider
						localisationService={localisationServiceMock}
						missionEngagementService={missionEngagementServiceMock}
					>
						<RechercherMission category={EngagementCategory.SERVICE_CIVIQUE}/>
					</DependenciesProvider>,
				);

				expect(await screen.findByText('2 missions de service civique pour Culture et Loisirs')).toBeInTheDocument();
				expect(await screen.findAllByTestId('RésultatRechercherSolution')).toHaveLength(2);
				expect(missionEngagementServiceMock.rechercherMission).toHaveBeenCalledWith(expect.objectContaining({
					domain: 'culture-loisirs',
					page: '1',
				}), 'service-civique');
			});
		});

		describe('quand la recherche n‘a qu‘un seul résultat', () => {
			it('affiche le nombre de résultat au singulier', async () => {
				const missionEngagementServiceMock = aSingleResultMissionEngagementService();
				const localisationServiceMock = aLocalisationService();

				mockUseRouter({ query: { domain: 'environnement', page: '1' } });
				render(
					<DependenciesProvider
						localisationService={localisationServiceMock}
						missionEngagementService={missionEngagementServiceMock}
					>
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

				mockUseRouter({ query: { distanceCommune: '30', page: '1' } });
				render(
					<DependenciesProvider
						localisationService={localisationServiceMock}
						missionEngagementService={missionEngagementServiceMock}
					>
						<RechercherMission category={EngagementCategory.SERVICE_CIVIQUE}/>
					</DependenciesProvider>,
				);
				const user = userEvent.setup();
				const comboboxCommune = screen.getByRole('combobox', { name: 'Localisation' });
				await user.type(comboboxCommune, 'Pari');
				const resultListCommune = screen.getAllByRole('option');
				await user.click(resultListCommune[0]);
				const selectButtonRadius = screen.getByRole('button', { name: 'Rayon' });
				await user.click(selectButtonRadius);

				expect(screen.getByRole('option', { name: '30 km' })).toBeInTheDocument();
				expect(await screen.findByText('2 missions de service civique')).toBeInTheDocument();
				expect(await screen.findAllByTestId('RésultatRechercherSolution')).toHaveLength(2);
				expect(missionEngagementServiceMock.rechercherMission).toHaveBeenCalledWith({
					distanceCommune: '30',
					page: '1',
				}, 'service-civique');
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
					<DependenciesProvider
						localisationService={localisationServiceMock}
						missionEngagementService={missionEngagementServiceMock}
					>
						<RechercherMission category={EngagementCategory.BENEVOLAT}/>
					</DependenciesProvider>,
				);

				expect(await screen.findByText('2 missions de bénévolat pour Environnement')).toBeInTheDocument();
				expect(await screen.findAllByTestId('RésultatRechercherSolution')).toHaveLength(2);
				expect(missionEngagementServiceMock.rechercherMission).toHaveBeenCalledWith({
					domain: 'environnement',
					page: '1',
				}, 'bénévolat');
			});
		});

		describe('quand la recherche n‘a qu‘un seul résultat', () => {
			it('affiche le nombre de résultat au singulier', async () => {
				const missionEngagementServiceMock = aSingleResultMissionEngagementService();
				const localisationServiceMock = aLocalisationService();

				mockUseRouter({ query: { domain: 'environnement', page: '1' } });
				render(
					<DependenciesProvider
						localisationService={localisationServiceMock}
						missionEngagementService={missionEngagementServiceMock}
					>
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

				mockUseRouter({ query: { distanceCommune: '100', page: '1' } });
				render(
					<DependenciesProvider
						localisationService={localisationServiceMock}
						missionEngagementService={missionEngagementServiceMock}
					>
						<RechercherMission category={EngagementCategory.BENEVOLAT}/>
					</DependenciesProvider>,
				);

				const user = userEvent.setup();
				const comboboxCommune = screen.getByRole('combobox', { name: 'Localisation' });
				await user.type(comboboxCommune, 'Pari');
				const resultListCommune = screen.getAllByRole('option');
				await user.click(resultListCommune[0]);
				const selectButtonRadius = screen.getByRole('button', { name: 'Rayon' });
				await user.click(selectButtonRadius);

				expect(screen.getByRole('option', { name: '100 km' })).toBeInTheDocument();
				expect(await screen.findByText('2 missions de bénévolat')).toBeInTheDocument();
				expect(await screen.findAllByTestId('RésultatRechercherSolution')).toHaveLength(2);
				expect(missionEngagementServiceMock.rechercherMission).toHaveBeenCalledWith({
					distanceCommune: '100',
					page: '1',
				}, 'bénévolat');
			});
		});
	});

	it('filtre les query params envoyés au service', async () => {
		mockUseRouter({
			query: {
				codeCommune: '75056',
				distanceCommune: '10',
				domain: 'environnement',
				latitudeCommune: '48.859',
				libelleCommune: 'Paris (75001)',
				longitudeCommune: '2.347',
				page: '1',
				test: 'test',
			},
		});
		const missionService = aMissionEngagementService();

		render(
			<DependenciesProvider missionEngagementService={missionService} localisationService={aLocalisationService()}>
				<RechercherMission category={EngagementCategory.BENEVOLAT}/>
			</DependenciesProvider>,
		);

		await screen.findByText('2 missions de bénévolat pour Environnement');

		expect(missionService.rechercherMission).not.toHaveBeenCalledWith(expect.objectContaining({
			test: 'test',
		}));
	});

	it('n’appelle pas le service quand aucun query params approprié n’est renseigné', () => {
		mockUseRouter({
			query: {
				test: 'test',
			},
		});
		const missionService = aMissionEngagementService();

		render(
			<DependenciesProvider missionEngagementService={missionService} localisationService={aLocalisationService()}>
				<RechercherMission category={EngagementCategory.BENEVOLAT}/>
			</DependenciesProvider>,
		);

		expect(missionService.rechercherMission).not.toHaveBeenCalled();
	});

	describe('quand une recherche contient des résultats', () => {
		it('affiche une note de pied de page sur le message du nombre de résultats', async () => {
			// GIVEN
			const missionEngagementServiceMock = aMissionEngagementService();
			const localisationServiceMock = aLocalisationService();
			mockUseRouter({ query: { domain: 'environnement', page: '1' } });

			// WHEN
			render(
				<DependenciesProvider
					localisationService={localisationServiceMock}
					missionEngagementService={missionEngagementServiceMock}
				>
					<RechercherMission category={EngagementCategory.SERVICE_CIVIQUE}/>
				</DependenciesProvider>,
			);

			// THEN
			const messageNombreResultats = await screen.findByRole('heading', { level: 2, name: /2 missions/i });
			const referenceVersFootnote = within(messageNombreResultats).getByRole('link', { name: 'note de pied de page' });
			expect(referenceVersFootnote).toHaveAttribute('href', '#partenaires');
		});
		it('la note de pied de page redirige vers la liste des partenaires dans les CGU', async () => {
			// GIVEN
			const missionEngagementServiceMock = aMissionEngagementService();
			const localisationServiceMock = aLocalisationService();
			mockUseRouter({ query: { domain: 'environnement', page: '1' } });

			// WHEN
			render(
				<DependenciesProvider
					localisationService={localisationServiceMock}
					missionEngagementService={missionEngagementServiceMock}
				>
					<RechercherMission category={EngagementCategory.SERVICE_CIVIQUE}/>
				</DependenciesProvider>,
			);

			// THEN
			const footnote = await screen.findByText(/les annonces listées ci-dessus nous sont fournies par nos partenaires/);
			const redirectionVersCGU = within(footnote).getByRole('link', { name: /liste disponible dans les CGU/i });
			expect(redirectionVersCGU).toHaveAttribute('href', '/cgu#3-services');
		});
		it('la note de pied de page permet de revenir sur la bonne référence', async () => {
			// GIVEN
			const missionEngagementServiceMock = aMissionEngagementService();
			const localisationServiceMock = aLocalisationService();
			mockUseRouter({ query: { domain: 'environnement', page: '1' } });

			// WHEN
			render(
				<DependenciesProvider
					localisationService={localisationServiceMock}
					missionEngagementService={missionEngagementServiceMock}
				>
					<RechercherMission category={EngagementCategory.SERVICE_CIVIQUE}/>
				</DependenciesProvider>,
			);

			// THEN
			const footnote = await screen.findByText(/les annonces listées ci-dessus nous sont fournies par nos partenaires/i);
			const retourALaReference = within(footnote).getByRole('link', { name: /retour à la référence/i });
			expect(retourALaReference).toHaveAttribute('href', '#partenaires-reference');
		});
	});
});
