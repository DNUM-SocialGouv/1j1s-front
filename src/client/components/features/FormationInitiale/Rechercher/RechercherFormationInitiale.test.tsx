/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import {
	RechercherFormationInitiale,
} from '~/client/components/features/FormationInitiale/Rechercher/RechercherFormationInitiale';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import {
	aFormationInitiale,
	aFormationInitialeService,
	aResultatFormationInitiale,
} from '~/client/services/formationInitiale/formationInitiale.service.fixture';
import { createSuccess } from '~/server/errors/either';

describe('RechercherFormationInitiale', () => {
	beforeEach(() => {
		mockSmallScreen();
	});
	describe('Lorsque je fais une recherche de formation initiale avec une query non vide', () => {
		beforeEach(() => {
			mockUseRouter({
				query: {
					motCle: 'boulanger',
					page: '1',
				},
			});
		});
		it('appelle le service concerné', async () => {
			const aFormationService = aFormationInitialeService();
			const formationsInitiales = [aFormationInitiale({ libelle: 'boulanger' })];
			const resultatFormationInitiales = aResultatFormationInitiale({
				formationsInitiales: formationsInitiales,
			});
			const resultatFormationInitiale = createSuccess(resultatFormationInitiales);
			jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultatFormationInitiale);

			render(<DependenciesProvider formationInitialeService={aFormationService}>
				<RechercherFormationInitiale/>
			</DependenciesProvider>);

			await screen.findByText(/150 formations pour boulanger/);
			expect(aFormationService.rechercherFormationInitiale).toHaveBeenCalledTimes(1);
			expect(aFormationService.rechercherFormationInitiale).toHaveBeenCalledWith({ motCle: 'boulanger', page: '1' });
		});

		describe('lorsqu‘il y a au moins un résultat', () => {
			it('la carte redirige vers la bonne url', async () => {
				const aFormationService = aFormationInitialeService();
				const identifiant = 'FOR.1234';
				const formationsInitiales = [aFormationInitiale({ identifiant: identifiant, libelle: 'boulanger' })];
				const resultatFormationInitiale = aResultatFormationInitiale({
					formationsInitiales: formationsInitiales,
				});
				const resultRechercheFormation = createSuccess(resultatFormationInitiale);
				jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultRechercheFormation);

				render(<DependenciesProvider formationInitialeService={aFormationService}>
					<RechercherFormationInitiale/>
				</DependenciesProvider>,
				);

				const carteList = await screen.findByRole('list', { name: 'Formations Initiales' });
				const cartes = within(carteList).getAllByRole('listitem');
				expect(within(cartes[0]).getByRole('link')).toHaveAttribute('href', `/formations-initiales/${encodeURIComponent(identifiant)}`);
			});

			describe('le nombre de résultat', () => {
				it('lorsqu‘il y a un résultat je vois le nombre de résultats affiché au singulier', async () => {
					const aFormationService = aFormationInitialeService();
					const formationsInitiales = [aFormationInitiale({ libelle: 'boulanger' })];
					const resultFormationInitiale = aResultatFormationInitiale({
						formationsInitiales: formationsInitiales,
						nombreDeResultat: 1,
					});
					const resultatFormationInitiale = createSuccess(resultFormationInitiale);
					jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultatFormationInitiale);

					render(<DependenciesProvider formationInitialeService={aFormationService}>
						<RechercherFormationInitiale/>
					</DependenciesProvider>,
					);

					expect(await screen.findByText(/1 formation/)).toBeVisible();
				});

				it('lorsqu‘il y a plusieurs résultats je vois le nombre de résultats affiché', async () => {
					const aFormationService = aFormationInitialeService();

					const formationsInitiales = [aFormationInitiale({ libelle: 'boulanger' }),
						aFormationInitiale({ libelle: 'patissier' })];
					const resultRechercheFormation = createSuccess(aResultatFormationInitiale({
						formationsInitiales: formationsInitiales,
						nombreDeResultat: 2,
					}));
					jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultRechercheFormation);

					render(<DependenciesProvider formationInitialeService={aFormationService}>
						<RechercherFormationInitiale/>
					</DependenciesProvider>,
					);

					expect(await screen.findByText(/2 formations pour boulanger/)).toBeVisible();
				});
			});

			it('lorsqu‘il n‘y a pas de résultat je ne vois pas le nombre de résultats affiché', async () => {
				const aFormationService = aFormationInitialeService();
				const resultatFormationInitiale = createSuccess(aResultatFormationInitiale({  nombreDeResultat: 0 }));
				jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultatFormationInitiale);

				render(<DependenciesProvider formationInitialeService={aFormationService}>
					<RechercherFormationInitiale/>
				</DependenciesProvider>,
				);

				expect(await screen.findByText(/0 formation pour boulanger/)).toBeVisible();
			});

			describe('les cartes', () => {
				it('lorsqu‘il y a des résultats doit affiché le bon nombre de cards', async () => {
					const aFormationService = aFormationInitialeService();
					const formationsInitiales = [aFormationInitiale({ libelle: 'boulanger' }), aFormationInitiale({ libelle: 'patissier' })];
					const resultatFormationInitiale = createSuccess(aResultatFormationInitiale({
						formationsInitiales: formationsInitiales,
					}));
					jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValueOnce(resultatFormationInitiale);
					render(<DependenciesProvider formationInitialeService={aFormationService}> <RechercherFormationInitiale/>
					</DependenciesProvider>);
					const listeCards = await screen.findByRole('list', { name: 'Formations Initiales' });
					const cardTitles = within(listeCards).getAllByRole('heading', { level: 3 });
					expect(cardTitles).toHaveLength(2);
					expect(cardTitles[0]).toBeVisible();
					expect(cardTitles[0]).toHaveTextContent('boulanger');
					expect(cardTitles[1]).toBeVisible();
					expect(cardTitles[1]).toHaveTextContent('patissier');
				});

				it('je vois les tags', async () => {
					const aFormationService = aFormationInitialeService();
					const formationsInitiales = [aFormationInitiale({ tags: ['Certifiante', 'Bac + 2', '1 ans'] })];
					const resultatFormationInitiale = createSuccess(aResultatFormationInitiale({ formationsInitiales: formationsInitiales }));
					jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValueOnce(resultatFormationInitiale);
					render(<DependenciesProvider formationInitialeService={aFormationService}>
						<RechercherFormationInitiale/>
					</DependenciesProvider>);
					const listeCards = await screen.findByRole('list', { name: 'Caractéristiques de l‘offre' });
					const tags = within(listeCards).getAllByRole('listitem');
					expect(tags).toHaveLength(3);
					expect(tags[0]).toBeVisible();
					expect(tags[0]).toHaveTextContent('Certifiante');
					expect(tags[1]).toBeVisible();
					expect(tags[1]).toHaveTextContent('Bac + 2');
					expect(tags[2]).toBeVisible();
					expect(tags[2]).toHaveTextContent('1 ans');
				});
			});
		});


	});

	describe('Lorsque je fais une recherche de formation initiale avec une query vide', () => {
		beforeEach(() => {
			mockUseRouter({
				query: {
					page: '1',
				},
			});
		});
		it('appelle le service concerné', async () => {
			const aFormationService = aFormationInitialeService();
			const formationsInitiales = [aFormationInitiale({ libelle: 'boulanger' }), aFormationInitiale({ libelle: 'patissier' })];
			const resultatRechercheFormation = createSuccess(aResultatFormationInitiale({ formationsInitiales: formationsInitiales }));
			jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultatRechercheFormation);

			render(<DependenciesProvider formationInitialeService={aFormationService}>
				<RechercherFormationInitiale/>
			</DependenciesProvider>);

			await screen.findByText(/[0-9]+ formations/);
			expect(aFormationService.rechercherFormationInitiale).toHaveBeenCalledTimes(1);
			expect(aFormationService.rechercherFormationInitiale).toHaveBeenCalledWith({ motCle: undefined, page: '1' });
		});

		it('lorsqu‘il y a plusieurs résultats je vois le nombre de résultats affiché sans précision sur le mot clé recherché', async () => {
			const aFormationService = aFormationInitialeService();
			const formationsInitiales = [aFormationInitiale({ libelle: 'boulanger' }), aFormationInitiale({ libelle: 'patissier' })];
			const resultatFormationsInitiales = aResultatFormationInitiale({
				formationsInitiales: formationsInitiales,
				nombreDeResultat: 2,
			});
			const resultatFormationInitiale = createSuccess(resultatFormationsInitiales);
			jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultatFormationInitiale);
			render(<DependenciesProvider formationInitialeService={aFormationService}>
				<RechercherFormationInitiale/>
			</DependenciesProvider>,
			);

			expect(await screen.findByText(/[0-9]+ formations$/)).toBeVisible();
		});
	});
});
