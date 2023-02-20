/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
	FormulaireRechercheAlternance,
} from '~/client/components/features/Alternance/FormulaireRecherche/FormulaireRechercheAlternance';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAlternanceService } from '~/client/services/alternance/alternance.service.fixture';
import {
	aListeDeMetierLaBonneAlternance,
	aRésultatRechercherMultipleAlternance,
} from '~/server/alternances/domain/alternance.fixture';

jest.mock('lodash/debounce', () =>
	jest.fn((fn) => {
		fn.cancel = jest.fn();
		return fn;
	}));

describe('FormulaireRechercheAlternance', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	describe('lorsqu‘on recherche par commune', () => {
		it('filtre les résultats par localisation', async () => {
			// Given
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			const métierFixture = [{ label: 'Conduite de travaux, direction de chantier', romes: ['F1201', 'F1202', 'I1101'] }];
			const expectedLibelle = 'Conduite+de+travaux%2C+direction+de+chantier';
			const expectedCodeRomes = 'F1201%2CF1202%2CI1101';
			const alternanceService = anAlternanceService(aRésultatRechercherMultipleAlternance(), métierFixture);
			// When
			render(
				<DependenciesProvider alternanceService={alternanceService}>
					<FormulaireRechercheAlternance/>
				</DependenciesProvider>,
			);

			const user = userEvent.setup();
			const inputMétiers = screen.getByLabelText('Sélectionnez un métier, domaine');
			await user.type(inputMétiers, 'boulang');
			await user.click(screen.getByRole('option', { name: aListeDeMetierLaBonneAlternance()[0].label }));

			const submitButton = screen.getByRole('button', { name: 'Rechercher' });
			await user.click(submitButton);

			// Then
			expect(routerPush).toHaveBeenCalledWith({ query: `libelle=${expectedLibelle}&codeRomes=${expectedCodeRomes}` }, undefined, { shallow: true });
		});
	});
});
