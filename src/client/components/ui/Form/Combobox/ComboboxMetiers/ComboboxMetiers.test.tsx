/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { KeyBoard } from '~/client/components/keyboard.fixture';
import {
	ComboboxMetiers,
} from '~/client/components/ui/Form/Combobox/ComboboxMetiers/ComboboxMetiers';
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


describe('<ComboboxMetiers />', () => {
	beforeAll(() => {
		mockScrollIntoView();
		mockUseRouter({});
	});
	describe('quand la recherche ne correspond a aucun métier', () => {
		it('affiche un message vide et ne propose pas de métier', async () => {
			const métierServiceMock = aMétierService([]);
			const user = userEvent.setup();

			render(<DependenciesProvider métierService={métierServiceMock}>
				<ComboboxMetiers name={'métier'} label={'Rechercher un métier'}/>
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
				<ComboboxMetiers name={'métier'} label={'Rechercher un métier'}/>
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
							<ComboboxMetiers name={'métier'} label={'Rechercher un métier'}/>
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
						<ComboboxMetiers name={'métier'} label={'Rechercher un métier'}/>
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
					<ComboboxMetiers
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
				<ComboboxMetiers
					name='métier'
					label='Rechercher un métier'
				/>
			</DependenciesProvider>,
		);

		await user.type(screen.getByRole('combobox'), 'test');

		const message = screen.getByRole('status');
		expect(message).toBeVisible();
		expect(message).toHaveTextContent('Une erreur est survenue lors de la récupération des métiers. Veuillez réessayer plus tard.');
	});

	it('affiche un message quand la liste de suggestions est en train de charger des résultats', async () => {
		const user = userEvent.setup();
		const métierServiceMock = {
			rechercherMétier: jest.fn(() => new Promise<Either<Métier[]>>(() => {})),
			// FIXME (GAFI 18-07-2023): Faire la version avec interface
		} as unknown as MétierService;
		render(
			<DependenciesProvider métierService={métierServiceMock}>
				<ComboboxMetiers
					name='métier'
					label='Rechercher un métier'
				/>
			</DependenciesProvider>,
		);

		await user.type(screen.getByRole('combobox'), 'test');

		const message = screen.getByRole('status');
		expect(message).toBeVisible();
		expect(message).toHaveTextContent('Chargement ...');
	});

	it('affiche un message avec le nombre de résultats quand la liste de suggestions est chargée', async () => {
		const user = userEvent.setup();
		const métierServiceMock = aMétierService([
			{ label: 'Génie électrique', romes: ['H1209', 'H1504'] },
			{ label: 'Aéronautique', romes: ['I1304', 'I1602'] },
			{ label: 'Chimie', romes: ['H1201', 'H1505', 'H2301'] },
		]);
		render(
			<DependenciesProvider métierService={métierServiceMock}>
				<ComboboxMetiers
					name='métier'
					label='Rechercher un métier'
				/>
			</DependenciesProvider>,
		);

		await user.type(screen.getByRole('combobox'), 'test');

		const message = screen.getByRole('status');
		expect(message).toBeVisible();
		expect(message).toHaveTextContent('3 métiers trouvés');
	});
	it('conjugue le message du nombre de résultats quand un seul résultat est trouvé', async () => {
		const user = userEvent.setup();
		const métierServiceMock = aMétierService([
			{ label: 'Génie électrique', romes: ['H1209', 'H1504'] },
		]);
		render(
			<DependenciesProvider métierService={métierServiceMock}>
				<ComboboxMetiers
					name='métier'
					label='Rechercher un métier'
				/>
			</DependenciesProvider>,
		);

		await user.type(screen.getByRole('combobox'), 'test');

		const message = screen.getByRole('status');
		expect(message).toBeVisible();
		expect(message).toHaveTextContent('1 métier trouvé');
	});

	it('affiche un message d’erreur quand le champ est en erreur', async () => {
		const user = userEvent.setup();
		const métierServiceMock = aMétierService([]);
		render(
			<DependenciesProvider métierService={métierServiceMock}>
				<ComboboxMetiers
					name='métier'
					label='Rechercher un métier'
				/>
			</DependenciesProvider>,
		);

		await user.type(screen.getByRole('combobox'), 'test');
		await user.tab();

		const erreur = screen.getByText('Veuillez sélectionner une option dans la liste');
		expect(erreur).toBeVisible();
		const combobox = screen.getByRole('combobox');
		expect(combobox).toHaveAccessibleDescription('Veuillez sélectionner une option dans la liste');
	});

	it('affiche un message quand rien n’est entré dans le champ', async () => {
		const user = userEvent.setup();
		const métierServiceMock = aMétierService([]);
		render(
			<DependenciesProvider métierService={métierServiceMock}>
				<ComboboxMetiers
					name='métier'
					label='Rechercher un métier'
				/>
			</DependenciesProvider>,
		);

		await user.click(screen.getByRole('button', { name: 'Rechercher un métier' }));

		const message = screen.getByRole('status');
		expect(message).toBeVisible();
		expect(message).toHaveTextContent('Commencez à taper pour rechercher un métier');
	});
});
