/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
	FormulaireRechercherFormation,
} from '~/client/components/features/Formation/FormulaireRecherche/FormulaireRechercherFormation';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aFormationService, aRésultatFormation } from '~/client/services/formation/formation.service.fixture';
import { aMétierService } from '~/client/services/métiers/métier.fixture';
import { aListeDeMetierLaBonneAlternance } from '~/server/metiers/domain/métier.fixture';

jest.mock('lodash/debounce', () =>
	jest.fn((fn) => {
		fn.cancel = jest.fn();
		return fn;
	}));

describe('FormulaireRechercherFormation', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	describe('lorsqu‘on recherche par métier', () => {
		it('filtre les résultats par métier', async () => {
			// Given
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			const métierFixture = [{ label: 'Conduite de travaux, direction de chantier', romes: ['F1201', 'F1202', 'I1101'] }];
			const expectedLibelle = 'Conduite+de+travaux%2C+direction+de+chantier';
			const expectedCodeRomes = 'F1201%2CF1202%2CI1101';
			const formationService = aFormationService(aRésultatFormation());
			const métierServiceMock = aMétierService(métierFixture);
			// When
			render(
				<DependenciesProvider formationService={formationService} métierService={métierServiceMock}>
					<FormulaireRechercherFormation/>
				</DependenciesProvider>,
			);

			const user = userEvent.setup();
			const inputMétiers = screen.getByLabelText('Sélectionnez un métier, domaine');
			await user.type(inputMétiers, 'boulang');
			await user.click(screen.getByRole('option', { name: aListeDeMetierLaBonneAlternance()[0].label }));

			const submitButton = screen.getByRole('button', { name: 'Rechercher' });
			await user.click(submitButton);

			// Then
			expect(routerPush).toHaveBeenCalledWith({ query: `libelleMetier=${expectedLibelle}&codeRomes=${expectedCodeRomes}` }, undefined, { shallow: true });
		});
	});
});
