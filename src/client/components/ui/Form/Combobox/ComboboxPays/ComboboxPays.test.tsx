/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { KeyBoard } from '~/client/components/keyboard.fixture';
import { ComboboxPays } from '~/client/components/ui/Form/Combobox/ComboboxPays';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockScrollIntoView } from '~/client/components/window.mock';
import { Pays } from '~/client/domain/pays';

describe('<ComboboxPays />', () => {
	beforeAll(() => {
		mockScrollIntoView();
		mockUseRouter({});
	});

	describe('props', () => {
		it('nécessite une liste de pays', () => {
			const paysList: Pays[] = [
				{
					code: 'ES',
					libellé: 'Espagne',
				},
			];

			render(
				<ComboboxPays paysList={paysList} name={'pays'} label={'Rechercher un pays'} />,
			);

			expect(screen.getByRole('combobox', { name: /Rechercher un pays/i })).toBeVisible();
		});
		it('accepte une ref', () => {
			const ref = jest.fn();

			render(
				<ComboboxPays paysList={[]} name={'pays'} label={'Rechercher un pays'} ref={ref} />,
			);

			expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
		});
		it('accepte un id', () => {
			const id = 'id';

			render(
				<ComboboxPays paysList={[]} name='pays' label='Rechercher un pays' id={id} />,
			);

			const combobox = screen.getByRole('combobox', { name: /Rechercher un pays/i });
			expect(combobox).toHaveAttribute('id', id);
		});
		it('accepte un onInvalid', async () => {
			const user = userEvent.setup();
			const onInvalid = jest.fn();
			render(
				<ComboboxPays paysList={[]} name='pays' label='Rechercher un pays' onInvalid={onInvalid}/>,
			);

			const combobox = screen.getByRole('combobox', { name: /Rechercher un pays/i });
			await user.type(combobox, 'A');
			await user.tab();

			expect(onInvalid).toHaveBeenCalled();
		});
		it('merge le aria-describedby en props avec celui du message d’erreur', async () => {
			const user = userEvent.setup();
			const messageErreur = 'Veuillez sélectionner une option dans la liste';
			const aideSaisie = 'Commencez à taper pour voir des suggestions';
			render(
				<>
					<ComboboxPays paysList={[]} name='pays' label='Rechercher un pays' aria-describedby="aide-saisie" />
					<p id="aide-saisie">{aideSaisie}</p>
				</>,
			);

			const combobox = screen.getByRole('combobox', { name: /Rechercher un pays/i });
			await user.type(combobox, 'A');
			await user.tab();

			expect(combobox).toHaveAccessibleDescription(expect.stringContaining(aideSaisie));
			expect(combobox).toHaveAccessibleDescription(expect.stringContaining(messageErreur));
		});
		it('utilise le label "Pays" par défaut', () => {
			const id = 'id';

			render(
				<ComboboxPays paysList={[]} name='pays' id={id} />,
			);

			const combobox = screen.getByRole('combobox');
			expect(combobox).toHaveAccessibleName('Localisation (pays)');
		});
	});

	describe('quand la recherche ne correspond à aucune pays', () => {
		it('affiche un message et ne propose pas de pays', async () => {
			const user = userEvent.setup();

			render(
				<ComboboxPays paysList={[]} name={'pays'} label={'Rechercher un pays'} />,
			);
			const comboboxPays = screen.getByRole('combobox', { name: 'Rechercher un pays' });
			await user.type(comboboxPays, 'dddddd');
			const emptyResultText = await screen.findByText('Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un pays. Exemple : Belgique, …');

			expect(emptyResultText).toBeVisible();
			expect(screen.queryByRole('option')).not.toBeInTheDocument();
		});
	});

	describe('quand la recherche correspond à des pays', () => {
		it('affiche les pays possibles', async () => {
			const user = userEvent.setup();
			const paysList: Pays[] = [
				{
					code: 'ES',
					libellé: 'Espagne',
				},
				{
					code: 'FR',
					libellé: 'France',
				},
			];

			render(
				<ComboboxPays paysList={paysList} name={'pays'} label={'Rechercher un pays'} />,
			);
			const comboboxPays = screen.getByRole('combobox', { name: 'Rechercher un pays' });
			await user.type(comboboxPays, 'esp');

			expect(await screen.findAllByRole('option')).toHaveLength(1);
			expect(screen.getByRole('option', { name: 'Espagne' })).toBeVisible();
		});

		describe('affiche un message du nombre de résultat', () => {
			it('le message est au pluriel quand plusieurs résultats sont trouvés', async () => {
				const user = userEvent.setup();
				const paysList: Pays[] = [
					{
						code: 'ES',
						libellé: 'test 1',
					},
					{
						code: 'FR',
						libellé: 'test 2',
					},
				];

				render(
					<ComboboxPays
						paysList={paysList}
						name='pays'
						label='Rechercher un pays'
					/>,
				);

				await user.type(screen.getByRole('combobox'), 'test');

				const message = screen.getByRole('status');
				expect(message).toBeVisible();
				expect(message).toHaveTextContent('2 pays trouvés');
			});
			it('le message est au singulier quand un seul résultat est trouvé', async () => {
				const user = userEvent.setup();
				const paysList: Pays[] = [
					{
						code: 'ES',
						libellé: 'test 1',
					},
					{
						code: 'FR',
						libellé: 'France',
					},
				];
				render(
					<ComboboxPays
						paysList={paysList}
						name='pays'
						label='Rechercher un pays'
					/>,
				);

				await user.type(screen.getByRole('combobox'), 'test');

				const message = screen.getByRole('status');
				expect(message).toBeVisible();
				expect(message).toHaveTextContent('1 pays trouvé');
			});
		});

		describe('quand je clique sur un pays', () => {
			it('affiche le pays sélectionné', async () => {
				const user = userEvent.setup();
				const paysList: Pays[] = [
					{
						code: 'FR',
						libellé: 'France',
					},
				];

				render(
					<form aria-label="Pays">
						<ComboboxPays paysList={paysList} name={'pays'} label={'Rechercher un pays'} />
					</form>,
				);
				const comboboxPays = screen.getByRole('combobox', { name: 'Rechercher un pays' });
				await user.type(comboboxPays, 'fra');
				await user.click(screen.getByRole('option', { name: 'France' }));

				expect(comboboxPays).toHaveValue('France');
				expect(screen.getByRole('form')).toHaveFormValues({ codePays: 'FR' });
			});
		});
		describe('quand je choisi un pays avec le clavier', () => {
			it('affiche le pays sélectionné', async () => {
				const user = userEvent.setup();
				const paysList: Pays[] = [
					{
						code: 'FR',
						libellé: 'France',
					},
				];

				render(
					<ComboboxPays paysList={paysList} name={'pays'} label={'Rechercher un pays'} />,
				);
				const comboboxPays = screen.getByRole('combobox', { name: 'Rechercher un pays' });
				await user.type(comboboxPays, 'fra');
				await user.keyboard(KeyBoard.ARROW_DOWN);
				await user.keyboard(KeyBoard.ENTER);

				expect(comboboxPays).toHaveValue('France');
			});
		});
	});

	it('accepte une valeur par défaut', () => {
		render(
			<form aria-label="form">
				<ComboboxPays
					paysList={[]}
					name='pays'
					label='Rechercher un pays'
					defaultValue={{
						code: 'ES',
						label: 'Espagne',
					}} />
			</form>,
		);

		const form = screen.getByRole('form');
		expect(form).toHaveFormValues({
			codePays: 'ES',
		});
	});

	it('affiche un message dans les suggestions quand le champ est vide et que l’utilisateur déplie les suggestions', async () => {
		const user = userEvent.setup();
		const paysList: Pays[] = [
			{
				code: 'FR',
				libellé: 'France',
			},
		];

		render(
			<ComboboxPays
				paysList={paysList}
				name='pays'
				label='Rechercher un pays'
			/>,
		);

		const deplierSuggestions = screen.getByRole('button', { name: 'Rechercher un pays' });
		await user.click(deplierSuggestions);

		const message = screen.getByRole('status');
		expect(message).toBeVisible();
		expect(message).toHaveTextContent('Commencez à taper pour rechercher un pays');
	});

	describe('quand le champ est vidé', () => {
		it('affiche un message dans les suggestions', async () => {
			const user = userEvent.setup();
			render(
				<ComboboxPays
					paysList={[]}
					name='pays'
					label='Rechercher un pays'
						
				/>,
			);

			const combobox = screen.getByRole('combobox');
			await user.type(combobox, 'Test');
			await user.clear(combobox);

			const message = screen.getByRole('status');
			expect(message).toBeVisible();
			expect(message).toHaveTextContent('Commencez à taper pour rechercher un pays');
		});

		it('n’affiche aucune suggestion', async () => {
			const user = userEvent.setup();
			render(
				<ComboboxPays
					paysList={[]}
					name='pays'
					label='Rechercher un pays'
				/>,
			);

			const combobox = screen.getByRole('combobox');
			await user.type(combobox, 'Test');
			await user.clear(combobox);

			const option = screen.queryByRole('option');
			expect(option).not.toBeInTheDocument();
		});
	});
});
