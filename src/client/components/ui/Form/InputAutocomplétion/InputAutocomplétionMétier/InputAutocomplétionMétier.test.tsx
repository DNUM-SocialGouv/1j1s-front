/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { KeyBoard } from '~/client/components/keyboard.fixture';
import {
	InputAutocomplétionMétier,
} from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionMétier/InputAutocomplétionMétier';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockScrollIntoView } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aMétierService } from '~/client/services/métiers/métier.fixture';
import { MétierService } from '~/client/services/métiers/métier.service';
import { createFailure, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { Métier } from '~/server/metiers/domain/métier';

jest.mock('lodash/debounce', () =>
	jest.fn((fn) => {
		fn.cancel = jest.fn();
		return fn;
	}));


describe('InputAutocomplétionMétier', () => {
	beforeAll(() => {
		mockScrollIntoView();
		mockUseRouter({});
	});
	describe('quand la recherche le correspond a aucun métier', () => {
		it('affiche un message vide et ne propose pas de métier', async () => {
			const métierServiceMock = aMétierService([]);
			const user = userEvent.setup();

			render(<DependenciesProvider métierService={métierServiceMock}>
				<InputAutocomplétionMétier name={'métier'} label={'Rechercher un métier'}/>
			</DependenciesProvider>);
			const inputAutocomplétionMétier = screen.getByRole('combobox', { name: 'Rechercher un métier' });
			await user.type(inputAutocomplétionMétier, 'dddddd');
			const emptyResultText = await screen.findByText('Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un métier. Exemple : boulanger, ...');

			expect(emptyResultText).toBeVisible();
			expect(screen.queryByRole('option')).not.toBeInTheDocument();
		});
	});

	describe('quand la recherche correspond à des métiers', () => {
		it('affiche les métiers possibles', async () => {
			const métierServiceMock = aMétierService();
			const user = userEvent.setup();

			render(<DependenciesProvider métierService={métierServiceMock}>
				<InputAutocomplétionMétier name={'métier'} label={'Rechercher un métier'}/>
			</DependenciesProvider>);
			const inputAutocomplétionMétier = screen.getByRole('combobox', { name: 'Rechercher un métier' });
			await user.type(inputAutocomplétionMétier, 'boulang');

			expect(await screen.findAllByRole('option')).toHaveLength(11);
			expect(screen.getByRole('option', { name: 'Conduite de travaux, direction de chantier' })).toBeVisible();
			expect(screen.getByRole('option', { name: 'Génie électrique' })).toBeVisible();
			expect(screen.getByRole('option', { name: 'Aéronautique' })).toBeVisible();
		});

		describe('quand je click sur un métier', () => {
			it('affiche le métier sélectionné', async () => {
				const métierServiceMock = aMétierService();
				const user = userEvent.setup();

				render(
					<form aria-label="Métier">
						<DependenciesProvider métierService={métierServiceMock}>
							<InputAutocomplétionMétier name={'métier'} label={'Rechercher un métier'}/>
						</DependenciesProvider>
					</form>,
				);
				const inputAutocomplétionMétier = screen.getByRole('combobox', { name: 'Rechercher un métier' });
				await user.type(inputAutocomplétionMétier, 'boulang');
				await user.click(screen.getByRole('option', { name: 'Conduite de travaux, direction de chantier' }));

				expect(inputAutocomplétionMétier).toHaveValue('Conduite de travaux, direction de chantier');
				expect(screen.getByRole('form')).toHaveFormValues({ codeRomes: 'F1201,F1202,I1101' });
			});
		});
		describe('quand je choisi un métier avec le clavier', () => {
			it('affiche le métier sélectionné', async () => {
				const métierServiceMock = aMétierService([
					{ label: 'Ingénierie en BTP', romes: ['F1106'] },
				]);
				const user = userEvent.setup();

				render(
					<DependenciesProvider métierService={métierServiceMock}>
						<InputAutocomplétionMétier name={'métier'} label={'Rechercher un métier'}/>
					</DependenciesProvider>,
				);
				const inputAutocomplétionMétier = screen.getByRole('combobox', { name: 'Rechercher un métier' });
				await user.type(inputAutocomplétionMétier, 'Ingé');
				await user.keyboard(KeyBoard.ARROW_DOWN);
				await user.keyboard(KeyBoard.ENTER);

				expect(inputAutocomplétionMétier).toHaveValue('Ingénierie en BTP');
			});
		});
	});

	it('accepte une valeur par défaut', () => {
		const métierServiceMock = aMétierService([]);

		render(
			<DependenciesProvider métierService={métierServiceMock}>
				<form aria-label="form">
					<InputAutocomplétionMétier
						name='métier'
						label='Rechercher un métier'
						libellé='Ingénieur en ingénierie'
						codeRomes='I1234, J5678'/>
				</form>
			</DependenciesProvider>,
		);

		const form = screen.getByRole('form');
		expect(form).toHaveFormValues({
			codeRomes: 'I1234, J5678',
			métier: 'Ingénieur en ingénierie',
		});
	});

	it('affiche un message quand l’appel au service est en échec', async () => {
		const user = userEvent.setup();
		const métierServiceMock = {
			rechercherMétier: jest.fn(async () => createFailure(ErreurMétier.CONTENU_INDISPONIBLE)),
		} as unknown as MétierService;
		render(
			<DependenciesProvider métierService={métierServiceMock}>
				<form aria-label="form">
					<InputAutocomplétionMétier
						name='métier'
						label='Rechercher un métier'
					/>
				</form>
			</DependenciesProvider>,
		);

		await user.type(screen.getByRole('combobox'), 'test');

		const message = screen.getByRole('status');
		expect(message).toBeVisible();
		expect(message).toHaveTextContent('Une erreur est survenue lors de la récupération des métiers.');
	});

	it('affiche un message quand la liste de suggestions est en train de charger des résultats', async () => {
		const user = userEvent.setup();
		const métierServiceMock = {
			rechercherMétier: jest.fn(() => new Promise<Either<Métier[]>>(() => {
			})),
			// FIXME (GAFI 18-07-2023): Faire la version avec interface
		} as unknown as MétierService;
		render(
			<DependenciesProvider métierService={métierServiceMock}>
				<form aria-label="form">
					<InputAutocomplétionMétier
						name='métier'
						label='Rechercher un métier'
					/>
				</form>
			</DependenciesProvider>,
		);

		await user.type(screen.getByRole('combobox'), 'test');

		const message = screen.getByRole('status');
		expect(message).toBeVisible();
		expect(message).toHaveTextContent('Chargement ...');
	});

	it.todo('message avec nombre de résultats');
	it.todo('pas de test sur la valeur qui est submit pour le libellé ?');
	it.todo('aria-describedby pour le message d’erreur');
});
