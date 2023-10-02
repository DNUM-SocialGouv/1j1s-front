/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import {
	FormulaireRechercheEmploisEurope,
} from '~/client/components/features/EmploisEurope/FormulaireRecherche/FormulaireRechercheEmploisEurope';
import { mockUseRouter } from '~/client/components/useRouter.mock';

describe('FormulaireRechercheEmploisEurope', () => {
	describe('quand on recherche par mot clé', () => {
		it('ajoute le mot clé recherché aux query params', async () => {
			// GIVEN
			const routerPush = jest.fn();
			const user = userEvent.setup();
			mockUseRouter({ push: routerPush });

			render(
				<FormulaireRechercheEmploisEurope />,
			);

			// WHEN
			const inputRechercheMotClé = screen.getByRole('textbox', { name: 'Métier, mot-clé ou entreprise' });
			await user.type(inputRechercheMotClé, 'boulanger');
			const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
			await user.click(buttonRechercher);

			// THEN
			expect(routerPush).toHaveBeenCalledWith({ query: 'motCle=boulanger&page=1' }, undefined, { shallow: true });
		});
	});
});
