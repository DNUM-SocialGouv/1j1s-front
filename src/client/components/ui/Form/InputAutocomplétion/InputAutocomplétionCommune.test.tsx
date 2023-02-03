/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import InputAutocomplétionCommune from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionCommune';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import {
	aLocalisationService,
} from '~/client/services/localisation/localisationService.fixture';

describe('InputAutocomplétionCommune', function () {
	afterEach(() => {
		jest.clearAllMocks();
	});


	it('doit afficher une proposition de commune quand on tape une recherche', async function () {
		// Given
		const localisationService = aLocalisationService();

		const labelText = 'Ma super autocomplétion';
		const texteRecherché = 'Par';

		render(<DependenciesProvider localisationService={localisationService}>
			<InputAutocomplétionCommune label={labelText} debounce={1}/>
		</DependenciesProvider>);
		const inputAutocomplétion = screen.getByRole('textbox');

		// When
		await userEvent.type(inputAutocomplétion, texteRecherché);

		// Then
		await waitFor(() => {
			expect(screen.getByText('Paris 15e Arrondissement (75015)')).toBeInTheDocument();
		});
		await waitFor(() => {
			expect(localisationService.rechercherCommune).toHaveBeenCalled();
		});
	});

	describe('quand l‘input a moins de 3 caractères' , () => {
		it('ne lance pas la recherche', async () => {
			// GIVEN
			const localisationService = aLocalisationService();

			const labelText = 'Ma super autocomplétion';
			const texteRecherché = 'Ba';

			mockUseRouter({});
			render(
				<DependenciesProvider localisationService={localisationService}>
					<InputAutocomplétionCommune label={labelText} debounce={1}/>
				</DependenciesProvider>,
			);
			const inputAutocomplétion = screen.getByRole('textbox');

			// WHEN
			await userEvent.type(inputAutocomplétion, texteRecherché);

			// THEN
			await waitFor(() => {
				expect(localisationService.rechercherCommune).not.toHaveBeenCalled();
			});
		});
	});
});
