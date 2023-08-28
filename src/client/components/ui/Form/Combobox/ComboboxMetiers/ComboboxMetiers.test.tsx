/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { KeyBoard } from '~/client/components/keyboard.fixture';
import { ComboboxMetiers } from '~/client/components/ui/Form/Combobox/ComboboxMetiers';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockScrollIntoView } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aMetierService } from '~/client/services/metiers/metier.fixture';
import { MetierService } from '~/client/services/metiers/metier.service';
import { createFailure, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { Metier } from '~/server/metiers/domain/metier';

describe('<ComboboxMetiers />', () => {
	beforeAll(() => {
		mockScrollIntoView();
		mockUseRouter({});
	});

	describe('props', () => {
		it('accepte une ref', () => {
			const ref = jest.fn();

			render(
				<DependenciesProvider metierService={aMetierService()}>
					<ComboboxMetiers name={'métier'} label={'Rechercher un métier'} debounceTimeout={0} ref={ref} />
				</DependenciesProvider>,
			);

			expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
		});
	});

	describe('quand la recherche ne correspond a aucun métier', () => {
		it('affiche un message vide et ne propose pas de métier', async () => {
			const metierServiceMock = aMetierService([]);
			const user = userEvent.setup();

			render(<DependenciesProvider metierService={metierServiceMock}>
				<ComboboxMetiers name={'métier'} label={'Rechercher un métier'} debounceTimeout={0}/>
			</DependenciesProvider>);
			const comboboxMetiers = screen.getByRole('combobox', { name: 'Rechercher un métier' });
			await user.type(comboboxMetiers, 'dddddd');
			const emptyResultText = await screen.findByText('Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un métier. Exemple : boulanger, ...');

			expect(emptyResultText).toBeVisible();
			expect(screen.queryByRole('option')).not.toBeInTheDocument();
		});
	});

	describe('quand la recherche correspond à des métiers', () => {
		it('affiche les métiers possibles', async () => {
			const metierServiceMock = aMetierService();
			const user = userEvent.setup();

			render(<DependenciesProvider metierService={metierServiceMock}>
				<ComboboxMetiers name={'métier'} label={'Rechercher un métier'} debounceTimeout={0}/>
			</DependenciesProvider>);
			const comboboxMetiers = screen.getByRole('combobox', { name: 'Rechercher un métier' });
			await user.type(comboboxMetiers, 'boulang');

			expect(await screen.findAllByRole('option')).toHaveLength(11);
			expect(screen.getByRole('option', { name: 'Conduite de travaux, direction de chantier' })).toBeVisible();
			expect(screen.getByRole('option', { name: 'Génie électrique' })).toBeVisible();
			expect(screen.getByRole('option', { name: 'Aéronautique' })).toBeVisible();
		});

		describe('quand je clique sur un métier', () => {
			it('affiche le métier sélectionné', async () => {
				const metierServiceMock = aMetierService();
				const user = userEvent.setup();

				render(
					<form aria-label="Métier">
						<DependenciesProvider metierService={metierServiceMock}>
							<ComboboxMetiers name={'métier'} label={'Rechercher un métier'} debounceTimeout={0}/>
						</DependenciesProvider>
					</form>,
				);
				const comboboxMetiers = screen.getByRole('combobox', { name: 'Rechercher un métier' });
				await user.type(comboboxMetiers, 'boulang');
				await user.click(screen.getByRole('option', { name: 'Conduite de travaux, direction de chantier' }));

				expect(comboboxMetiers).toHaveValue('Conduite de travaux, direction de chantier');
				expect(screen.getByRole('form')).toHaveFormValues({ codeRomes: 'F1201,F1202,I1101' });
			});
		});
		describe('quand je choisi un métier avec le clavier', () => {
			it('affiche le métier sélectionné', async () => {
				const metierServiceMock = aMetierService([
					{ label: 'Ingénierie en BTP', romes: ['F1106'] },
				]);
				const user = userEvent.setup();

				render(
					<DependenciesProvider metierService={metierServiceMock}>
						<ComboboxMetiers name={'métier'} label={'Rechercher un métier'} debounceTimeout={0}/>
					</DependenciesProvider>,
				);
				const comboboxMetiers = screen.getByRole('combobox', { name: 'Rechercher un métier' });
				await user.type(comboboxMetiers, 'Ingé');
				await user.keyboard(KeyBoard.ARROW_DOWN);
				await user.keyboard(KeyBoard.ENTER);

				expect(comboboxMetiers).toHaveValue('Ingénierie en BTP');
			});
		});
	});

	it('par défaut, la recherche n’est lancée qu’au bout d’un certain temps après le dernier input utilisateur', async() => {
		// GIVEN
		const user = userEvent.setup();
		const metierServiceMock= aMetierService();
		render(
			<DependenciesProvider metierService={metierServiceMock}>
				<ComboboxMetiers
					name='métier'
					label='Rechercher un métier'
				/>
			</DependenciesProvider>,
		);

		// WHEN
		await user.type(screen.getByRole('combobox'), 'infor');
		await user.type(screen.getByRole('combobox'), 'ma');

		// THEN
		await screen.findAllByRole('option');
		expect(metierServiceMock.rechercherMetier).toHaveBeenCalledTimes(1);
	});

	it('accepte une valeur par défaut', () => {
		const metierServiceMock = aMetierService([]);

		render(
			<DependenciesProvider metierService={metierServiceMock}>
				<form aria-label="form">
					<ComboboxMetiers
						name='métier'
						label='Rechercher un métier'
						defaultValue={{
							label: 'Ingénieur en ingénierie',
							romes: ['I1234', 'J5678'],
						}} debounceTimeout={0}/>
				</form>
			</DependenciesProvider>,
		);

		const form = screen.getByRole('form');
		expect(form).toHaveFormValues({
			codeRomes: 'I1234,J5678',
			métier: 'Ingénieur en ingénierie',
		});
	});

	it('affiche un message quand l’appel au service est en échec', async () => {
		const user = userEvent.setup();
		const metierServiceMock = {
			rechercherMetier: jest.fn(async () => createFailure(ErreurMétier.CONTENU_INDISPONIBLE)),
		} as unknown as MetierService;
		render(
			<DependenciesProvider metierService={metierServiceMock}>
				<ComboboxMetiers
					name='métier'
					label='Rechercher un métier'
					debounceTimeout={0}
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
		const metierServiceMock = {
			rechercherMetier: jest.fn(() => new Promise<Either<Metier[]>>(() => {})),
			// FIXME (GAFI 18-07-2023): Faire la version avec interface
		} as unknown as MetierService;
		render(
			<DependenciesProvider metierService={metierServiceMock}>
				<ComboboxMetiers
					name='métier'
					label='Rechercher un métier'
					debounceTimeout={0}
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
		const metierServiceMock = aMetierService([
			{ label: 'Génie électrique', romes: ['H1209', 'H1504'] },
			{ label: 'Aéronautique', romes: ['I1304', 'I1602'] },
			{ label: 'Chimie', romes: ['H1201', 'H1505', 'H2301'] },
		]);
		render(
			<DependenciesProvider metierService={metierServiceMock}>
				<ComboboxMetiers
					name='métier'
					label='Rechercher un métier'
					debounceTimeout={0}
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
		const metierServiceMock = aMetierService([
			{ label: 'Génie électrique', romes: ['H1209', 'H1504'] },
		]);
		render(
			<DependenciesProvider metierService={metierServiceMock}>
				<ComboboxMetiers
					name='métier'
					label='Rechercher un métier'
					debounceTimeout={0}
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
		const metierServiceMock = aMetierService([]);
		render(
			<DependenciesProvider metierService={metierServiceMock}>
				<ComboboxMetiers
					name='métier'
					label='Rechercher un métier'
					debounceTimeout={0}
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

	it('affiche un message quand le champ est vide', async () => {
		const user = userEvent.setup();
		const metierServiceMock = aMetierService();
		render(
			<DependenciesProvider metierService={metierServiceMock}>
				<ComboboxMetiers
					name='métier'
					label='Rechercher un métier'
					debounceTimeout={0}
				/>
			</DependenciesProvider>,
		);

		const deplierSuggestions = screen.getByRole('button', { name: 'Rechercher un métier' });
		await user.click(deplierSuggestions);

		const message = screen.getByRole('status');
		expect(message).toBeVisible();
		expect(message).toHaveTextContent('Commencez à taper pour rechercher un métier');
	});

	it('affiche uniquement le message quand le champ est vidé avec des résultats déjà présents', async () => {
		const user = userEvent.setup();
		const metierServiceMock = aMetierService([
			{ label: 'Génie électrique', romes: ['H1209', 'H1504'] },
		]);
		render(
			<DependenciesProvider metierService={metierServiceMock}>
				<ComboboxMetiers
					name='métier'
					label='Rechercher un métier'
					debounceTimeout={0}
				/>
			</DependenciesProvider>,
		);

		const combobox = screen.getByRole('combobox');
		await user.type(combobox, 'Test');
		await user.clear(combobox);

		const message = screen.getByRole('status');
		expect(message).toBeVisible();
		expect(message).toHaveTextContent('Commencez à taper pour rechercher un métier');
		const options = screen.queryByRole('option', { name: /Génie électrique/i });
		expect(options).not.toBeInTheDocument();
	});
});
