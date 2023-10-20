/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import {
	FormulaireRechercheEmploisEurope,
} from '~/client/components/features/EmploisEurope/FormulaireRecherche/FormulaireRechercheEmploisEurope';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';

describe('FormulaireRechercheEmploisEurope', () => {
	beforeEach(() => {
		mockSmallScreen();
	});
	describe('quand on recherche par mot clé', () => {
		it('filtre les résultats par mot clé', async () => {
			// GIVEN
			const routerPush = jest.fn();
			const user = userEvent.setup();
			mockUseRouter({ push: routerPush });

			render(
				<FormulaireRechercheEmploisEurope />,
			);

			// WHEN
			const inputRechercheMotCle = screen.getByRole('textbox', { name: 'Métier, mot-clé ou entreprise' });
			await user.type(inputRechercheMotCle, 'boulanger');
			const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
			await user.click(buttonRechercher);

			// THEN
			expect(routerPush).toHaveBeenCalledWith({ query: 'motCle=boulanger&page=1' }, undefined, { shallow: true });
		});
	});
	describe('quand on recherche par localisation', () => {
		it('filtre les résultats par localisation', async () => {
			// GIVEN
			const routerPush = jest.fn();
			const user = userEvent.setup();
			mockUseRouter({ push: routerPush });

			render(
				<FormulaireRechercheEmploisEurope />,
			);

			// WHEN
			const inputRechercheLocalisation = screen.getByRole('combobox', { name: 'Localisation (pays)' });
			await user.type(inputRechercheLocalisation, 'Espagne');
			const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
			await user.click(buttonRechercher);

			// THEN
			expect(routerPush).toHaveBeenCalledWith({ query: 'libellePays=Espagne&codePays=ES&page=1' }, undefined, { shallow: true });
		});
	});
	it('rempli automatiquement les champs lorsque les query params sont présents', async () => {
		mockUseRouter({ query: {
			codePays: 'ES',
			libellePays: 'Espagne',
			motCle: 'boulanger',
		} });

		render(
			<FormulaireRechercheEmploisEurope />,
		);

		const inputRechercheMotCle = screen.getByRole('textbox', { name: 'Métier, mot-clé ou entreprise' });
		expect(inputRechercheMotCle).toHaveValue('boulanger');
		const inputRechercheLocalisation = screen.getByRole('combobox', { name: 'Localisation (pays)' });
		expect(inputRechercheLocalisation).toHaveValue('Espagne');
	});
	it('laisse le champ localisation vide si il manque le code pays dans les query params', async () => {
		mockUseRouter({ query: {
			libellePays: 'Pays inconnu',
			motCle: 'boulanger',
		} });

		render(
			<FormulaireRechercheEmploisEurope />,
		);

		const inputRechercheMotCle = screen.getByRole('textbox', { name: 'Métier, mot-clé ou entreprise' });
		expect(inputRechercheMotCle).toHaveValue('boulanger');
		const inputRechercheLocalisation = screen.getByRole('combobox', { name: 'Localisation (pays)' });
		expect(inputRechercheLocalisation).toHaveValue('');
	});
	it('laisse le champ localisation vide si il manque le libellé pays dans les query params', async () => {
		mockUseRouter({ query: {
			codePays: 'ES',
			motCle: 'boulanger',
		} });

		render(
			<FormulaireRechercheEmploisEurope />,
		);

		const inputRechercheMotCle = screen.getByRole('textbox', { name: 'Métier, mot-clé ou entreprise' });
		expect(inputRechercheMotCle).toHaveValue('boulanger');
		const inputRechercheLocalisation = screen.getByRole('combobox', { name: 'Localisation (pays)' });
		expect(inputRechercheLocalisation).toHaveValue('');
	});
});
