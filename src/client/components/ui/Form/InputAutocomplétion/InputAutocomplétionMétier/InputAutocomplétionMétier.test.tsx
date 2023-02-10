/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { KeyBoard } from '~/client/components/keyboard.fixture';
import {
	InputAutocomplétionMétier,
} from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionMétier/InputAutocomplétionMétier';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import {
	anAlternanceService,
	anAlternanceServiceWithEmptyResultat,
} from '~/client/services/alternance/alternance.service.fixture';

describe('InputAutocomplétionMétier', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	describe('quand la recherche le correspond a aucun métier', () => {
		it('affiche un message vide et ne propose pas de métier', async () => {
			const alternanceServiceMock = anAlternanceServiceWithEmptyResultat();
			const user = userEvent.setup();
			mockUseRouter({});

			render(<DependenciesProvider alternanceService={alternanceServiceMock}>
				<InputAutocomplétionMétier name={'métier'} label={'Rechercher un métier'}/>
			</DependenciesProvider>);
			const inputAutocomplétionMétier = screen.getByLabelText('Rechercher un métier');
			await waitFor(() => user.type(inputAutocomplétionMétier, 'dddddd'));
			const emptyResultText = await screen.findByText('Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un métier. Exemple : boulangerie, ...');

			expect(emptyResultText).toBeInTheDocument();
			expect(screen.queryByRole('option')).not.toBeInTheDocument();
		});
	});
	describe('quand la recherche correspond à des métiers', () => {
		it('affiche les métiers possibles', async () => {
			const alternanceServiceMock = anAlternanceService();
			const user = userEvent.setup();
			mockUseRouter({});

			render(<DependenciesProvider alternanceService={alternanceServiceMock}>
				<InputAutocomplétionMétier name={'métier'} label={'Rechercher un métier'}/>
			</DependenciesProvider>);
			const inputAutocomplétionMétier = screen.getByLabelText('Rechercher un métier');
			await waitFor(() => user.type(inputAutocomplétionMétier, 'boulang'));

			expect(await screen.findAllByRole('option')).toHaveLength(3);
			expect(screen.getByRole('option', { name: 'Transport aérien' })).toBeInTheDocument();
			expect(screen.getByRole('option', { name: 'Transport ferroviaire' })).toBeInTheDocument();
			expect(screen.getByRole('option', { name: 'Vente, transaction, gestion immobilière' })).toBeInTheDocument();
		});
		describe('quand je click sur un métier', () => {
			it('affiche le métier séléctionné', async () => {
				const alternanceServiceMock = anAlternanceService();
				const user = userEvent.setup();
				mockUseRouter({});

				render(
					<form role="form">
						<DependenciesProvider alternanceService={alternanceServiceMock}>
							<InputAutocomplétionMétier name={'métier'} label={'Rechercher un métier'}/>
						</DependenciesProvider>
					</form>,
				);
				const inputAutocomplétionMétier = screen.getByLabelText('Rechercher un métier');
				await waitFor(() => user.type(inputAutocomplétionMétier, 'boulang'));
				await waitFor(() => user.click(screen.getByRole('option', { name: 'Transport aérien' })));

				expect(inputAutocomplétionMétier).toHaveValue('Transport aérien');
				expect(screen.getByRole('form')).toHaveFormValues({ codeRomes: 'N2101,N2102,N2203,N2204' });
			});
		});
		describe('quand je choisi un métier avec le clavier', () => {
			it('affiche le métier séléctionné', async () => {
				const alternanceServiceMock = anAlternanceService();
				const user = userEvent.setup();
				mockUseRouter({});

				render(
					<form role="form">
						<DependenciesProvider alternanceService={alternanceServiceMock}>
							<InputAutocomplétionMétier name={'métier'} label={'Rechercher un métier'}/>
						</DependenciesProvider>
					</form>,
				);
				const inputAutocomplétionMétier = screen.getByLabelText('Rechercher un métier');
				await user.type(inputAutocomplétionMétier, 'boulang');
				await screen.findByRole('option', { name: 'Vente, transaction, gestion immobilière' });
				await user.keyboard(KeyBoard.ARROW_DOWN);
				await user.keyboard(KeyBoard.ENTER);

				await waitFor(() => expect(inputAutocomplétionMétier).toHaveValue('Transport aérien'));
			});
		});
	});
});
