/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor, within } from '@testing-library/react';

import {
	RechercherFormationInitiale,
} from '~/client/components/features/FormationInitiale/Rechercher/RechercherFormationInitiale';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import {
	aFormationInitialeService,
	aResultatFormationInitiale,
} from '~/client/services/formationInitiale/formationInitiale.service.fixture';
import { createSuccess } from '~/server/errors/either';
import { aFormationInitiale } from '~/server/formations-initiales/domain/formationInitiale.fixture';

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

			const resultRechercheFormation = createSuccess([aResultatFormationInitiale({ libelle: 'boulanger' }),
				aResultatFormationInitiale({ libelle: 'patissier' })]);
			jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultRechercheFormation);

			render(<DependenciesProvider formationInitialeService={aFormationService}>
				<RechercherFormationInitiale/>
			</DependenciesProvider>);

			await screen.findByText(/[0-9]+ formations pour boulanger/);
			expect(aFormationService.rechercherFormationInitiale).toHaveBeenCalledTimes(1);
			expect(aFormationService.rechercherFormationInitiale).toHaveBeenCalledWith({ motCle: 'boulanger' });
		});

		describe('lorsqu‘il y a au moins un résultat', () => {
			describe('le nombre de résultat', () => {
				it('lorsqu‘il y a un résultat je vois le nombre de résultats affiché au singulier', async () => {
					const aFormationService = aFormationInitialeService();
					const resultRechercheFormation = createSuccess([aResultatFormationInitiale({ libelle: 'boulanger' })]);
					jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultRechercheFormation);

					render(<DependenciesProvider formationInitialeService={aFormationService}>
						<RechercherFormationInitiale/>
					</DependenciesProvider>,
					);

					expect(await screen.findByText(/1 formation/)).toBeVisible();
				});
				it('lorsqu‘il y a plusieurs résultats je vois le nombre de résultats affiché', async () => {
					const aFormationService = aFormationInitialeService();

					const resultRechercheFormation = createSuccess([aResultatFormationInitiale({ libelle: 'boulanger' }),
						aResultatFormationInitiale({ libelle: 'patissier' })]);
					jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultRechercheFormation);

					render(<DependenciesProvider formationInitialeService={aFormationService}>
						<RechercherFormationInitiale/>
					</DependenciesProvider>,
					);

					expect(await screen.findByText(/2 formations pour boulanger/)).toBeVisible();
				});
			});
			describe('les cartes', () => {
				it('lorsqu‘il y a des résultats doit affiché le bon nombre de cards', async () => {
					const aFormationService = aFormationInitialeService();
					const resultRechercheFormation = createSuccess([aFormationInitiale({ libelle: 'boulanger' }), aFormationInitiale({ libelle: 'patissier' })]);
					jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValueOnce(resultRechercheFormation);
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
					const resultRechercheFormation = createSuccess([aResultatFormationInitiale({ tags: ['Certifiante', 'Bac + 2', '1 ans'] })]);
					jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValueOnce(resultRechercheFormation);
					render(<DependenciesProvider formationInitialeService={aFormationService}>
						<RechercherFormationInitiale/>
					</DependenciesProvider>,
					);
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

		it('lorsqu‘il n‘y a pas de résultat je ne vois pas le nombre de résultats affiché', async () => {
			const aFormationService = aFormationInitialeService();
			const resultRechercheFormation = createSuccess([]);
			jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultRechercheFormation);

			render(<DependenciesProvider formationInitialeService={aFormationService}>
				<RechercherFormationInitiale/>
			</DependenciesProvider>,
			);

			await waitFor(() => {
				expect(screen.queryByText(/[0-9]+ formation(s)?/)).not.toBeInTheDocument();
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

			const resultRechercheFormation = createSuccess([aResultatFormationInitiale({ libelle: 'boulanger' }),
				aResultatFormationInitiale({ libelle: 'patissier' })]);
			jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultRechercheFormation);

			render(<DependenciesProvider formationInitialeService={aFormationService}>
				<RechercherFormationInitiale/>
			</DependenciesProvider>);

			await screen.findByText(/[0-9]+ formations$/);
			expect(aFormationService.rechercherFormationInitiale).toHaveBeenCalledTimes(1);
			expect(aFormationService.rechercherFormationInitiale).toHaveBeenCalledWith({ motCle: undefined });
		});

		it('lorsqu‘il y a plusieurs résultats je vois le nombre de résultats affiché sans précision sur le mot clé recherché', async () => {
			const aFormationService = aFormationInitialeService();

			const resultRechercheFormation = createSuccess([aResultatFormationInitiale({ libelle: 'boulanger' }),
				aResultatFormationInitiale({ libelle: 'patissier' })]);
			jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultRechercheFormation);

			render(<DependenciesProvider formationInitialeService={aFormationService}>
				<RechercherFormationInitiale/>
			</DependenciesProvider>,
			);

			expect(await screen.findByText(/[0-9]+ formations$/)).toBeVisible();
		});
	});
});
