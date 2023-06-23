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
import { aFormationService } from '~/client/services/formation/formation.service.fixture';
import { aFormationInitialeService } from '~/client/services/formationInitiale/formationInitiale.service.fixture';

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

			render(<DependenciesProvider formationInitialeService={aFormationService}>
				<RechercherFormationInitiale/>
			</DependenciesProvider>,
			);

			expect(screen.getByText(/[0-9]+ formations/)).toBeVisible();
		});
		it('lorsqu‘il n‘y a pas de résultat je ne vois le nombre de résultats affiché', async () => {
			mockUseRouter({
				query: {
					domaine: 'boulanger',
				},
			});

			const aFormationService = aFormationInitialeService();

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

			render(<DependenciesProvider formationInitialeService={aFormationService}>
				<RechercherFormationInitiale/>
			</DependenciesProvider>,
			);

			expect(screen.queryByText(/1 formation/)).toBeVisible();
		});
	});
});
