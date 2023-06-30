/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';

import {
	RechercherFormationInitiale,
} from '~/client/components/features/FormationInitiale/Rechercher/RechercherFormationInitiale';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import {
	aFormationInitialeService,
	aResultatListFormationInitiale,
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
				},
			});
		});
		it('appelle le service concerné', async () => {
			const aFormationService = aFormationInitialeService();

			const resultRechercheFormation = createSuccess([aResultatListFormationInitiale({ libelle: 'boulanger' }),
				aResultatListFormationInitiale({ libelle: 'patissier' })]);
			jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultRechercheFormation);

			render(<DependenciesProvider formationInitialeService={aFormationService}>
				<RechercherFormationInitiale/>
			</DependenciesProvider>);

			await screen.findByText(/[0-9]+ formations pour boulanger/);
			expect(aFormationService.rechercherFormationInitiale).toHaveBeenCalledTimes(1);
			expect(aFormationService.rechercherFormationInitiale).toHaveBeenCalledWith({ motCle: 'boulanger' });
		});

		it('lorsqu‘il y a plusieurs résultats je vois le nombre de résultats affiché', async () => {
			const aFormationService = aFormationInitialeService();

			const resultRechercheFormation = createSuccess([aResultatListFormationInitiale({ libelle: 'boulanger' }),
				aResultatListFormationInitiale({ libelle: 'patissier' })]);
			jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultRechercheFormation);

			render(<DependenciesProvider formationInitialeService={aFormationService}>
				<RechercherFormationInitiale/>
			</DependenciesProvider>,
			);

			expect(await screen.findByText(/[0-9]+ formations pour boulanger/)).toBeVisible();
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

		it('lorsqu‘il y a un résultat je vois le nombre de résultats affiché au singulier', async () => {
			const aFormationService = aFormationInitialeService();
			const resultRechercheFormation = createSuccess([aResultatListFormationInitiale({ libelle: 'boulanger' })]);
			jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultRechercheFormation);

			render(<DependenciesProvider formationInitialeService={aFormationService}>
				<RechercherFormationInitiale/>
			</DependenciesProvider>,
			);

			expect(await screen.findByText(/1 formation/)).toBeVisible();
		});
	});
	describe('Lorsque je fais une recherche de formation initiale avec une query vide', () => {
		beforeEach(() => {
			mockUseRouter({
				query: {
					motCle: '',
				},
			});
		});
		it('appelle le service concerné', async () => {
			const aFormationService = aFormationInitialeService();

			const resultRechercheFormation = createSuccess([aResultatListFormationInitiale({ libelle: 'boulanger' }),
				aResultatListFormationInitiale({ libelle: 'patissier' })]);
			jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultRechercheFormation);

			render(<DependenciesProvider formationInitialeService={aFormationService}>
				<RechercherFormationInitiale/>
			</DependenciesProvider>);

			await screen.findByText(/[0-9]+ formations$/);
			expect(aFormationService.rechercherFormationInitiale).toHaveBeenCalledTimes(1);
			expect(aFormationService.rechercherFormationInitiale).toHaveBeenCalledWith({ motCle: '' });
		});

		it('lorsqu‘il y a plusieurs résultats je vois le nombre de résultats affiché avec le bon libellé', async () => {
			const aFormationService = aFormationInitialeService();

			const resultRechercheFormation = createSuccess([aResultatListFormationInitiale({ libelle: 'boulanger' }),
				aResultatListFormationInitiale({ libelle: 'patissier' })]);
			jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultRechercheFormation);

			render(<DependenciesProvider formationInitialeService={aFormationService}>
				<RechercherFormationInitiale/>
			</DependenciesProvider>,
			);

			expect(await screen.findByText(/[0-9]+ formations$/)).toBeVisible();
		});

	});
});
