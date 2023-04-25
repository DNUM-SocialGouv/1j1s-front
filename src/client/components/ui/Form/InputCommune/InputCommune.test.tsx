/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { InputCommune } from '~/client/components/ui/Form/InputCommune/InputCommune';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import {
	aLocalisationService,
	aLocalisationServiceWithEmptyRésultat,
} from '~/client/services/localisation/localisationService.fixture';

describe('InputCommune', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('quand aucun résultat n‘est trouvé', () => {
		it('affiche un message d‘information', async () => {
			// GIVEN
			const localisationServiceMock = aLocalisationServiceWithEmptyRésultat();
			const user = userEvent.setup();

			mockUseRouter({});
			render(
				<DependenciesProvider localisationService={localisationServiceMock}>
					<InputCommune code="" libellé="" latitude="" longitude="" distance=""/>
				</DependenciesProvider>,
			);
			const inputCommune = screen.getByTestId('InputCommune');

			// WHEN
			await user.type(inputCommune, 'abgfjs');

			// THEN
			await waitFor(() => {
				expect(screen.getByTestId('CommuneNoResultMessage')).toBeInTheDocument();
			});
		});
	});

	describe('quand l‘input a moins de 3 caractères' , () => {
		it('ne lance pas la recherche', async () => {
			// GIVEN
			const localisationServiceMock = aLocalisationServiceWithEmptyRésultat();
			const user = userEvent.setup();

			mockUseRouter({});
			render(
				<DependenciesProvider localisationService={localisationServiceMock}>
					<InputCommune code="" libellé="" latitude="" longitude="" distance=""/>
				</DependenciesProvider>,
			);
			const inputCommune = screen.getByTestId('InputCommune');

			// WHEN
			await user.type(inputCommune, 'ab');

			// THEN
			await waitFor(() => {
				expect(localisationServiceMock.rechercherCommune).not.toHaveBeenCalled();
			});
		});
	});

	describe('quand la recherche retourne des résultats', () => {
		it('appelle l‘api avec la valeur de la commune sélectionnée', async () => {
			// GIVEN
			const localisationServiceMock = aLocalisationService();
			const user = userEvent.setup();

			render(
				<DependenciesProvider localisationService={localisationServiceMock}>
					<InputCommune code="" libellé="" latitude="" longitude="" distance=""/>
				</DependenciesProvider>,
			);

			const inputCommune = screen.getByTestId('InputCommune');

			// WHEN
			await user.type(inputCommune, 'pari');

			// THEN
			await waitFor(() => {
				expect(localisationServiceMock.rechercherCommune).toHaveBeenCalledWith('pari');
			});


			const résultatsCommune = await screen.findByTestId('RésultatsCommune');

			// WHEN
			const résultatCommuneList = within(résultatsCommune).getAllByRole('option');
			await user.click(résultatCommuneList[0]);

			// THEN

			const localisation = screen.getByRole('textbox', { name: 'Localisation' });
			expect(localisation).toHaveValue('Paris (75006)');
			const codeCommune = screen.getByDisplayValue('75056', {});
			expect(codeCommune).toBeInTheDocument();
			const latitude = screen.getByDisplayValue('48.859');
			expect(latitude).toBeInTheDocument();
			const longitude = screen.getByDisplayValue('2.347');
			expect(longitude).toBeInTheDocument();
			// FIXME (GAFI 25-04-2023): À fixer après avoir mis le nez dans <Select />
			const rayon = screen.getAllByDisplayValue<HTMLInputElement>('10').find((element) => element.name != null);
			expect(rayon).toBeInTheDocument();
		});
	});

	describe('quand l‘input contient déjà une valeur', () => {
		it('affiche la commune pré-sélectionnée', () => {
			// GIVEN
			const localisationServiceMock = aLocalisationService();

			render(
				<DependenciesProvider localisationService={localisationServiceMock}>
					<InputCommune code="75056" libellé="Paris" latitude="48.859" longitude="2.347" distance="20"/>
				</DependenciesProvider>,
			);

			// THEN
			expect(screen.getByRole('textbox', { name: 'Localisation' })).toHaveValue('Paris');
			expect(screen.getByDisplayValue('75056')).toBeInTheDocument();
			expect(screen.getByDisplayValue('48.859')).toBeInTheDocument();
			expect(screen.getByDisplayValue('2.347')).toBeInTheDocument();
			expect(screen.getByDisplayValue('20')).toHaveValue('20');
		});
	});

	describe('quand le rayon doit être masqué', () => {
		it('n‘affiche pas le select sur le rayon', () => {
			// GIVEN
			const localisationServiceMock = aLocalisationService();

			render(
				<DependenciesProvider localisationService={localisationServiceMock}>
					<InputCommune code="46100" libellé="Figeac" showRadius={false}/>
				</DependenciesProvider>,
			);

			// THEN
			const selectRayon = screen.queryByRole('button', { name: 'Rayon' });
			expect(selectRayon).not.toBeInTheDocument();
		});
	});
});
