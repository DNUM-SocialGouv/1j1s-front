/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import {
	FormulaireRechercheEmploisEurope,
} from '~/client/components/features/EmploisEurope/FormulaireRecherche/FormulaireRechercheEmploisEurope';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockLargeScreen, mockSmallScreen } from '~/client/components/window.mock';

describe('FormulaireRechercheEmploisEurope', () => {
	beforeEach(() => {
		mockSmallScreen();
	});
	describe('en version mobile', () => {
		beforeEach(() => {
			mockSmallScreen();
		});
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
				const inputRechercheMotCle = screen.getByRole('textbox', { name: 'Métier, mot-clé ou entreprise' });
				await user.type(inputRechercheMotCle, 'boulanger');
				const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
				await user.click(buttonRechercher);

				// THEN
				expect(routerPush).toHaveBeenCalledWith({ query: 'motCle=boulanger&page=1' }, undefined, { shallow: true });
			});
		});
		describe('quand on recherche par localisation', () => {
			it('ajoute la localisation aux query params', async () => {
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
		describe('quand on recherche par type de contrat', () => {
			it('ajoute les types de contrat aux query params', async () => {
				// GIVEN
				const routerPush = jest.fn();
				const user = userEvent.setup();
				mockUseRouter({ push: routerPush });

				render(
					<FormulaireRechercheEmploisEurope />,
				);

				const buttonFiltresAvances = screen.getByRole('button', { name: 'Filtrer ma recherche' });

				// WHEN
				await user.click(buttonFiltresAvances);
				const modalComponent = screen.getByRole('dialog');
				const checkboxApprentissage = within(modalComponent).getByRole('checkbox', { name: 'Apprentissage' });
				await user.click(checkboxApprentissage);
				const buttonAppliquerFiltres = within(modalComponent).getByRole('button', { name: 'Appliquer les filtres' });
				await user.click(buttonAppliquerFiltres);
				const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
				await user.click(buttonRechercher);

				// THEN
				expect(routerPush).toHaveBeenCalledWith({ query: 'typeContrat=apprenticeship&page=1' }, undefined, { shallow: true });
			});
		});
	});

	describe('en version desktop', () => {
		beforeEach(() => {
			mockLargeScreen();
		});

		it('affiche les filtres avancés sans modale', async () => {
			render(
				<FormulaireRechercheEmploisEurope />,
			);

			expect(screen.getByRole('button', { name: 'Type de contrat' })).toBeInTheDocument();
		});

		describe('quand on recherche par type de contrat', () => {
			it('ajoute les types de contrat aux query params', async () => {
				// GIVEN
				const routerPush = jest.fn();
				const user = userEvent.setup();
				mockUseRouter({ push: routerPush });

				render(
					<FormulaireRechercheEmploisEurope />,
				);

				// WHEN
				const button = screen.getByRole('button', { name: 'Type de contrat' });
				await user.click(button);

				const checkboxApprentissage = screen.getByRole('checkbox', { name: 'Apprentissage' });
				await user.click(checkboxApprentissage);

				const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
				await user.click(buttonRechercher);

				// THEN
				expect(routerPush).toHaveBeenCalledWith({ query: 'typeContrat=apprenticeship&page=1' }, undefined, { shallow: true });
			});
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
