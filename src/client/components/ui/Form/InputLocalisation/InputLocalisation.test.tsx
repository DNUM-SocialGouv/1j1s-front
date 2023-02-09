/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { InputLocalisation } from '~/client/components/ui/Form/InputLocalisation/InputLocalisation';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import {
	aLocalisationService,
	aLocalisationServiceWithEmptyRésultat,
} from '~/client/services/localisation/localisationService.fixture';
import { aLocalisationListWithCommuneAndDépartement } from '~/server/localisations/domain/localisation.fixture';

describe('InputLocalisation', () => {
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
					<InputLocalisation code="" libellé="" type="" />
				</DependenciesProvider>,
			);
			const inputLocalisation = screen.getByRole('textbox', { name: 'Localisation' });

			// WHEN
			await user.type(inputLocalisation, 'no result');

			// THEN
			await waitFor(() => {
				expect(screen.getByTestId('LocalisationNoResultMessage')).toBeInTheDocument();
			});
		});
	});

	describe('quand la recherche retourne des résultats', () => {
		it('appelle l‘api avec la localisation sélectionnée ayant plusieurs code postaux', async () => {
			// GIVEN
			const localisationServiceMock = aLocalisationService(aLocalisationListWithCommuneAndDépartement());
			const user = userEvent.setup();

			render(
				<DependenciesProvider localisationService={localisationServiceMock}>
					<InputLocalisation code="" libellé="" type="" />
				</DependenciesProvider>,
			);

			const inputLocalisation = screen.getByRole('textbox', { name: 'Localisation' });

			// WHEN
			await user.type(inputLocalisation, 'Par');
			let résultatsLocalisation = screen.queryByTestId('RésultatsLocalisation');

			// THEN
			// FIXME (GAFI 09-02-2023): Plutôt injecter le setTimeout
			await waitFor(() => {
				expect(localisationServiceMock.rechercherLocalisation).toHaveBeenCalledWith('Par');
			});
			expect(résultatsLocalisation).not.toBeInTheDocument();

			// WHEN
			await user.type(inputLocalisation, 'is');
			résultatsLocalisation = await screen.findByTestId('RésultatsLocalisation');

			// THEN
			expect(localisationServiceMock.rechercherLocalisation).toHaveBeenCalledWith('Paris');
			expect(résultatsLocalisation).toBeInTheDocument();

			const résultatLocalisationList = within(résultatsLocalisation).getAllByRole('option');
			fireEvent.click(résultatLocalisationList[1]);

			// THEN
			expect(screen.getByRole('textbox', { name: 'Localisation' })).toHaveValue('Paris (75001)');
			expect(screen.getByTestId('typeLocalisation')).toHaveValue('COMMUNE');
			expect(screen.getByTestId('codeLocalisation')).toHaveValue('75101');
		});
	});

	describe('quand l‘input contient déjà une valeur', () => {
		it('affiche la localisation pré-sélectionnée', () => {
			// GIVEN
			const localisationServiceMock = aLocalisationService();

			render(
				<DependenciesProvider localisationService={localisationServiceMock}>
					<InputLocalisation code="75001" libellé="Paris (75001)" type="COMMUNE" />
				</DependenciesProvider>,
			);

			// THEN
			expect(screen.getByRole('textbox', { name: 'Localisation' })).toHaveValue('Paris (75001)');
			expect(screen.getByTestId('typeLocalisation')).toHaveValue('COMMUNE');
			expect(screen.getByTestId('codeLocalisation')).toHaveValue('75001');
		});
	});

	it("n'appelle pas le usecase pour moins de 3 lettres", async () => {
		const localisationServiceMock = aLocalisationService();
		render(
			<DependenciesProvider localisationService={localisationServiceMock}>
				<InputLocalisation code="" libellé="" type="COMMUNE" timeout={0} />
			</DependenciesProvider>,
		);

		const input = screen.getByRole('textbox');
		await userEvent.type(input, 'Pa');

		expect(localisationServiceMock.rechercherCommune).not.toHaveBeenCalled();
		expect(localisationServiceMock.rechercherLocalisation).not.toHaveBeenCalled();
	});
	it("n'appelle pas le usecase pour moins de 3 lettres finissant par un espace", async () => {
		const localisationServiceMock = aLocalisationService();
		render(
			<DependenciesProvider localisationService={localisationServiceMock}>
				<InputLocalisation code="" libellé="" type="COMMUNE" timeout={0} />
			</DependenciesProvider>,
		);

		const input = screen.getByRole('textbox');
		await userEvent.type(input, 'Pa ');

		expect(localisationServiceMock.rechercherCommune).not.toHaveBeenCalled();
		expect(localisationServiceMock.rechercherLocalisation).not.toHaveBeenCalled();
	});
	it('appelle le usecase pour un numéro de département', async () => {
		const localisationServiceMock = aLocalisationService();
		render(
			<DependenciesProvider localisationService={localisationServiceMock}>
				<InputLocalisation code="" libellé="" type="COMMUNE" timeout={0} />
			</DependenciesProvider>,
		);

		const input = screen.getByRole('textbox');
		await userEvent.type(input, '94');

		expect(localisationServiceMock.rechercherLocalisation).toHaveBeenCalledTimes(1);
		expect(localisationServiceMock.rechercherLocalisation).toHaveBeenCalledWith('94');
	});
});
