/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
	FormulaireRechercheAlternanceLBA,
} from '~/client/components/features/Alternance/FormulaireRecherche/FormulaireRechercheAlternanceLBA';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAlternanceService } from '~/client/services/alternance/alternance.service.fixture';

describe('FormulaireRechercheAlternance', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	describe('lorsqu‘on recherche par commune', () => {
		it('filtre les résultats par localisation',  async() => {
			// Given
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			const alternanceService = anAlternanceService();

			// When
			render(
				<DependenciesProvider alternanceService={alternanceService}>
					<FormulaireRechercheAlternanceLBA/>
				</DependenciesProvider>,
			);

			const user = userEvent.setup();
			const inputMétiers = screen.getByLabelText('Sélectionnez un métier, domaine');
			await waitFor(() => user.type(inputMétiers, 'boulang'));
			await waitFor(() => user.click(screen.getByRole('option', { name: 'Transport aérien' })));

			const submitButton = screen.getByRole('button', { name: 'Rechercher' });
			await waitFor(() => user.click(submitButton));

			// Then
			expect(routerPush).toHaveBeenCalledWith({ query: 'libelle=Transport+a%C3%A9rien&codeRomes=N2101%2CN2102%2CN2203%2CN2204' }, undefined, { shallow: true });
		});
	});
});
