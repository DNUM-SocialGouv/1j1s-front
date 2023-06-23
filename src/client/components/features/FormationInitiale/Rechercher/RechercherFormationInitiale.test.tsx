/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

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
	describe('le nombre de résultat', () => {
		it('lorsqu‘il y a plusieurs résultats je vois le nombre de résultats affiché', async () => {
			mockUseRouter({
				query: {
					domaine: 'boulanger',
				},
			});
			const aFormationService = aFormationInitialeService();

			const resultRechercheFormation = createSuccess([aResultatListFormationInitiale({ libelle: 'boulanger' }),
				aResultatListFormationInitiale({ libelle: 'patissier' })]);
			jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultRechercheFormation);

			render(<DependenciesProvider formationInitialeService={aFormationService}>
				<RechercherFormationInitiale/>
			</DependenciesProvider>,
			);

			expect(aFormationService.rechercherFormationInitiale).toHaveBeenCalledTimes(1);

			expect(screen.getByText(/[0-9]+ formations/)).toBeVisible();
		});
		it('lorsqu‘il n‘y a pas de résultat je ne vois le nombre de résultats affiché', async () => {
			mockUseRouter({
				query: {
					domaine: 'boulanger',
				},
			});

			const aFormationService = aFormationInitialeService();
			const resultRechercheFormation = createSuccess([]);
			jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultRechercheFormation);

			render(<DependenciesProvider formationInitialeService={aFormationService}>
				<RechercherFormationInitiale/>
			</DependenciesProvider>,
			);

			expect(screen.queryByText(/[0-9]+ formation(s)?/)).not.toBeInTheDocument();
		});
		it('lorsqu‘il y a un résultat je vois le nombre de résultats affiché au singulier', async () => {
			mockUseRouter({
				query: {
					domaine: 'boulanger',
				},
			});
			const aFormationService = aFormationInitialeService();
			const resultRechercheFormation = createSuccess([aResultatListFormationInitiale({ libelle: 'boulanger' })]);
			jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultRechercheFormation);

			render(<DependenciesProvider formationInitialeService={aFormationService}>
				<RechercherFormationInitiale/>
			</DependenciesProvider>,
			);

			expect(screen.getByText(/1 formation/)).toBeVisible();
		});
	});
});
