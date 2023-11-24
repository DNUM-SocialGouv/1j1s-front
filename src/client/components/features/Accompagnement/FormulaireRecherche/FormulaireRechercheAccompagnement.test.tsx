/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import {
	FormulaireRechercheAccompagnement,
} from '~/client/components/features/Accompagnement/FormulaireRecherche/FormulaireRechercheAccompagnement';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { LocalisationService } from '~/client/services/localisation/localisation.service';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';

describe('FormulaireRechercheAccompagnement', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	describe('lorsqu‘on recherche par commune', () => {
		it('filtre les résultats par localisation',  async() => {
			// GIVEN
			const routerPush = jest.fn();
		
			mockUseRouter({ push: routerPush, query: {
				typeAccompagnement: 'pole_emploi',
			} });
			const localisationServiceMock = aLocalisationService();

			render(
				<DependenciesProvider localisationService={localisationServiceMock}>
					<FormulaireRechercheAccompagnement />
				</DependenciesProvider>,
			);

			const user = userEvent.setup();
			const comboboxCommune = screen.getByRole('combobox', { name: 'Localisation' });
			await user.type(comboboxCommune, 'Pari');
			const resultListCommune = screen.getAllByRole('option');
			await user.click(resultListCommune[0]);
			const submitButton = screen.getByRole('button', { name: 'Rechercher' });

			// WHEN
			await user.click(submitButton);

			// THEN
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('libelleCommune=Paris+%2875006%29&codeCommune=75056') }, undefined, { shallow: true });
		});
	});
	describe('lorsqu‘on recherche par type d‘accompagnement', () => {
		let localisationServiceMock: LocalisationService;
		let routerPush: jest.Mock;

		beforeEach(() => {
			routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			localisationServiceMock = aLocalisationService();
		});
		it('affiche le filtre type d‘accompagnement', () => {
			render(
				<DependenciesProvider localisationService={localisationServiceMock}>
					<FormulaireRechercheAccompagnement />
				</DependenciesProvider>,
			);

			const selectTypeAccompagnement = screen.getByRole('button', { name:'Type d‘accompagnement' });
			expect(selectTypeAccompagnement).toBeVisible();
		});
	});

	it('rempli les champs du formulaire avec les query params', async () => {
		mockUseRouter({ query: {
			codeCommune: '75001',
			libelleCommune: 'Paris (75001)',
			typeAccompagnement: 'pole_emploi',
		} });

		render(
			<DependenciesProvider localisationService={aLocalisationService()}>
				<FormulaireRechercheAccompagnement/>
			</DependenciesProvider>,
		);

		const localisation = screen.getByRole('combobox', { name: /Localisation/i });
		expect(localisation).toHaveValue('Paris (75001)');
		const typeAccompagnement = screen.getByTestId('Select-InputHidden');
		expect(typeAccompagnement).toHaveValue('pole_emploi');
	});
});
