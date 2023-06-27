/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';

import { Combobox } from './Combobox';

describe('<Combobox />', () => {
	beforeAll(() => {
		window.HTMLElement.prototype.scrollIntoView = jest.fn();
	});

	it('affiche un input', () => {
		render(
			<Combobox aria-label="Test">
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const input = screen.getByRole('combobox');

		expect(input).toBeVisible();
	});

	describe('default props', () => {
		it('accepte un ref', () => {
			const ref = jest.fn();

			render(
				<Combobox aria-label='Test' ref={ref}>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			expect(ref).toHaveBeenLastCalledWith(input);
		});
		it('accepte les props d’un input', () => {
			render(
				<Combobox aria-label='Test' disabled>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			expect(input).toHaveAttribute('disabled');
		});
		it('appelle onKeyDown quand une touche est pressée', async () => {
			const onKeyDown = jest.fn();
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test' onKeyDown={onKeyDown}>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			await user.type(input, 'A');

			expect(onKeyDown).toHaveBeenCalledTimes(1);
			expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({ key: 'A' }));
		});
		it('appelle onChange et onInput quand on sélectionne une valeur au clavier', async () => {
			const user = userEvent.setup();
			const onChange = jest.fn();
			const onInput = jest.fn();
			render(
				<Combobox aria-label='Test' onChange={onChange} onInput={onInput}>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
			await user.keyboard(`{${KeyBoard.ENTER}}`);

			expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ currentTarget: expect.objectContaining({ value: 'Option 1' }) }));
			expect(onInput).toHaveBeenCalledWith(expect.objectContaining({ currentTarget: expect.objectContaining({ value: 'Option 1' }) }));
		});
		it('appelle onChange et onInput quand on sélectionne une valeur à la souris', async () => {
			const user = userEvent.setup();
			const onChange = jest.fn();
			const onInput = jest.fn();
			render(
				<Combobox aria-label='Test' onChange={onChange} onInput={onInput}>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			await user.type(input, 'Option');
			await user.click(screen.getByRole('option', { name: /Option 2/i }));

			expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ currentTarget: expect.objectContaining({ value: 'Option 2' }) }));
			expect(onInput).toHaveBeenLastCalledWith(expect.objectContaining({ currentTarget: expect.objectContaining({ value: 'Option 2' }) }));
		});
		it('accepte une value', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test' value="test" onChange={() => null}>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			await user.click(input);
			await user.type(input, 'Salut');
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
			await user.keyboard(`{${KeyBoard.ENTER}}`);

			expect(input).toHaveValue('test');
		});
		it('accepte une defaultValue', () => {
			render(
				<Combobox aria-label='Test' defaultValue="test">
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			expect(input).toHaveValue('test');
		});
		it('accepte du JSX en children des options', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option <strong>1</strong></Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
			await user.keyboard(`{${KeyBoard.ENTER}}`);

			expect(input).toHaveValue('Option 1');
		});
		it('accepte un classname pour styliser tout le composant', () => {
			const { container } = render(
				<Combobox aria-label='Test' className="test">
					<Combobox.Option>Option</Combobox.Option>
				</Combobox>,
			);

			// NOTE (GAFI 26-06-2023): Test explicitement qu'on place la classe sur le premier élément pour pouvoir tout styliser
			// eslint-disable-next-line testing-library/no-node-access
			expect(container.firstChild).toHaveAttribute('class', expect.stringContaining('test'));
		});
		it('merge la valeur pour aria-controls donné en props avec celle requise pour la liste', () => {
			render(
				<Combobox aria-label='Test' aria-controls="test">
					<Combobox.Option>Option 1</Combobox.Option>
				</Combobox>,
			);

			const combobox = screen.getByRole('combobox');
			const liste = screen.getByRole('listbox', { hidden: true });
			expect(combobox).toHaveAttribute('aria-controls', expect.stringContaining('test'));
			expect(combobox).toHaveAttribute('aria-controls', expect.stringContaining(liste.id));
		});
		it('n’ajoute pas undefined à la liste des aria-controls quand pas passé en props', () => {
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
				</Combobox>,
			);

			const combobox = screen.getByRole('combobox');
			expect(combobox).not.toHaveAttribute('aria-controls', expect.stringContaining('undefined'));
		});
		it('accepte un role', () => {
			render(
				<Combobox aria-label='Test' role="textbox">
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			expect(input).toHaveAttribute('role', 'textbox');
		});
		it('accepte un aria-expanded', () => {
			render(
				<Combobox aria-label='Test' aria-expanded="true">
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			expect(input).toHaveAttribute('aria-expanded', 'true');
		});
		it('accepte un aria-autocomplete', () => {
			render(
				<Combobox aria-label='Test' aria-autocomplete="both">
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			expect(input).toHaveAttribute('aria-autocomplete', 'both');
		});
		it('accepte un aria-activedescendant', () => {
			render(
				<Combobox aria-label='Test' aria-activedescendant="test">
					<Combobox.Option id="test">Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			expect(input).toHaveAttribute('aria-activedescendant', 'test');
		});
		describe('<Combobox.Option />', () => {
			it('accepte un role', () => {
				render(
					<Combobox aria-label='Test'>
						<Combobox.Option role="listitem">Option 1</Combobox.Option>
					</Combobox>,
				);

				const option = screen.getByRole('listitem', { hidden: true });
				expect(option).toHaveAttribute('role', 'listitem');
			});
			it('accepte un aria-selected', () => {
				render(
					<Combobox aria-label='Test'>
						<Combobox.Option aria-selected="true">Option 1</Combobox.Option>
					</Combobox>,
				);

				const option = screen.getByRole('option', { hidden: true });
				expect(option).toHaveAttribute('aria-selected', 'true');
			});
			it('accepte un hidden', () => {
				render(
					<Combobox aria-label='Test'>
						<Combobox.Option hidden={false}>Option 1</Combobox.Option>
					</Combobox>,
				);

				const option = screen.getByRole('option', { hidden: true });
				expect(option).not.toHaveAttribute('hidden');
			});
			it('accepte un id', () => {
				render(
					<Combobox aria-label='Test'>
						<Combobox.Option id="test">Option 1</Combobox.Option>
					</Combobox>,
				);

				const option = screen.getByRole('option', { hidden: true });
				expect(option).toHaveAttribute('id', 'test');
			});
			it('appelle onClick quand on clique sur une option', async () => {
				const user = userEvent.setup();
				const onClick = jest.fn();
				render(
					<Combobox aria-label='Test'>
						<Combobox.Option id="test" onClick={onClick}>Option 1</Combobox.Option>
					</Combobox>,
				);

				const button = screen.getByRole('button');
				await user.click(button);
				const option = screen.getByRole('option');
				await user.click(option);

				expect(onClick).toHaveBeenCalledTimes(1);
				expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ target: option }));
			});
		});
	});

	it('masque la liste de suggestions par défaut', () => {
		render(
			<Combobox aria-label='Test'>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const suggestionsList = screen.getByRole('listbox', { hidden: true });
		expect(suggestionsList).not.toBeVisible();
	});

	describe('Navigation au clavier', () => {
		it('affiche la liste de suggestions quand on appuie sur la flèche du bas', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);

			const suggestionsList = screen.getByRole('listbox');
			expect(suggestionsList).toBeVisible();
			const suggestions = within(suggestionsList).getAllByRole('option');
			expect(suggestions).toHaveLength(3);
		});
		it('focus le premier élément de la liste quand on appuie sur la flèche du bas et que la liste est fermée', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);

			const suggestions = screen.getAllByRole('option');
			expect(input).toHaveAttribute('aria-activedescendant', suggestions[0].id);
			expect(suggestions[0]).toHaveAttribute('aria-selected', 'true');
		});
		it('focus l’élément suivant de la liste quand on appuie sur la flèche du bas', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);

			const suggestions = screen.getAllByRole('option');
			expect(input).toHaveAttribute('aria-activedescendant', suggestions[1].id);
			expect(suggestions[1]).toHaveAttribute('aria-selected', 'true');
		});
		it('revient au début de la liste quand on appuie sur la flèche du bas sur le dernier élément', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);

			const suggestions = screen.getAllByRole('option');
			expect(input).toHaveAttribute('aria-activedescendant', suggestions[0].id);
			expect(suggestions[0]).toHaveAttribute('aria-selected', 'true');
		});
		it('affiche la liste de suggestions quand on appuie sur la flèche du haut', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_UP}}`);

			const suggestionsList = screen.getByRole('listbox');
			expect(suggestionsList).toBeVisible();
			const suggestions = within(suggestionsList).getAllByRole('option');
			expect(suggestions).toHaveLength(3);
		});
		it('focus le dernier élément de la liste quand on appuie sur la flèche du haut et que la liste est fermée', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_UP}}`);

			const suggestions = screen.getAllByRole('option');
			expect(input).toHaveAttribute('aria-activedescendant', suggestions[2].id);
			expect(suggestions[2]).toHaveAttribute('aria-selected', 'true');
		});
		it('focus l’élément précédent de la liste quand on appuie sur la flèche du haut', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_UP}}`);
			await user.keyboard(`{${KeyBoard.ARROW_UP}}`);

			const suggestions = screen.getAllByRole('option');
			expect(input).toHaveAttribute('aria-activedescendant', suggestions[1].id);
			expect(suggestions[1]).toHaveAttribute('aria-selected', 'true');
		});
		it('revient à la fin de la liste quand on appuie sur la flèche du haut sur le premier élément', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
			await user.keyboard(`{${KeyBoard.ARROW_UP}}`);

			const suggestions = screen.getAllByRole('option');
			expect(input).toHaveAttribute('aria-activedescendant', suggestions[2].id);
			expect(suggestions[2]).toHaveAttribute('aria-selected', 'true');
		});
		it('masque la liste quand on appuie sur Escape', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_UP}}`);
			await user.keyboard(`{${KeyBoard.ESCAPE}}`);

			const suggestionsList = screen.getByRole('listbox', { hidden: true });
			expect(suggestionsList).not.toBeVisible();
		});
		it('reset la selection quand on appuie sur Escape', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_UP}}`);
			await user.keyboard(`{${KeyBoard.ESCAPE}}`);

			const suggestions = screen.getAllByRole('option', { hidden: true });
			expect(input).not.toHaveAttribute('aria-activedescendant');
			suggestions.forEach((suggestion) => {
				expect(suggestion).toHaveAttribute('aria-selected', 'false');
			});
		});
		it('ouvre la liste sans focus le premier élément quand on appuie sur Alt et flèche du bas', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ALT}>}{${KeyBoard.ARROW_DOWN}}{/${KeyBoard.ALT}}`);

			const suggestionsList = screen.getByRole('listbox');
			expect(suggestionsList).toBeVisible();
			const suggestions = screen.getAllByRole('option', { hidden: true });
			expect(input).not.toHaveAttribute('aria-activedescendant');
			expect(suggestions[0]).toHaveAttribute('aria-selected', 'false');
		});
		it('conserve la position du curseur quand on appuie sur la flèche du bas', async () => {
			// NOTE (GAFI 13-06-2023): Impossible de reproduire le problème avec testing-library,
			//	Pour éviter de laisser du code non testé, test sur le détail d'implémentation
			const user = userEvent.setup();
			const onKeyDown = jest.fn();
			render(
				<Combobox aria-label='Test' onKeyDown={onKeyDown}>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);
			const input = screen.getByRole<HTMLInputElement>('combobox');
			await user.type(input, 'test');
			await user.keyboard(`{${KeyBoard.ARROW_LEFT}}`);

			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);

			expect(onKeyDown).toHaveBeenLastCalledWith(expect.objectContaining({ defaultPrevented: true }));
		});
		it('conserve la position du curseur quand on appuie sur la flèche du haut', async () => {
			// NOTE (GAFI 13-06-2023): Impossible de reproduire le problème avec testing-library,
			//	Pour éviter de laisser du code non testé, test sur le détail d'implémentation
			const user = userEvent.setup();
			const onKeyDown = jest.fn();
			render(
				<Combobox aria-label='Test' onKeyDown={onKeyDown}>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);
			const input = screen.getByRole<HTMLInputElement>('combobox');
			await user.type(input, 'test');
			await user.keyboard(`{${KeyBoard.ARROW_LEFT}}`);

			await user.keyboard(`{${KeyBoard.ARROW_UP}}`);

			expect(onKeyDown).toHaveBeenLastCalledWith(expect.objectContaining({ defaultPrevented: true }));
		});
		it('change la valeur de l’input quand on appuie sur Enter avec le focus sur un élément', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
			await user.keyboard(`{${KeyBoard.ENTER}}`);

			expect(input).toHaveValue('Option 1');
		});
		it('ferme la liste quand on sélectionne une valeur', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
			await user.keyboard(`{${KeyBoard.ENTER}}`);

			const suggestions = screen.getByRole('listbox', { hidden : true });
			expect(suggestions).not.toBeVisible();
		});
		it('submit le formulaire quand on appuie sur Enter sans sélectionner d’option', async () => {
			const user = userEvent.setup();
			const onSubmit = jest.fn((event) => event.preventDefault());
			render(
				<form onSubmit={onSubmit}>
					<Combobox aria-label='Test'>
						<Combobox.Option>Option 1</Combobox.Option>
						<Combobox.Option>Option 2</Combobox.Option>
						<Combobox.Option>Option 3</Combobox.Option>
					</Combobox>
				</form>,
			);

			const input = screen.getByRole('combobox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ENTER}}`);

			expect(onSubmit).toHaveBeenCalledTimes(1);
		});
		it('ne submit pas le formulaire quand on appuie sur Enter pour sélectionner un option', async () => {
			const user = userEvent.setup();
			const onSubmit = jest.fn();
			render(
				<form onSubmit={onSubmit}>
					<Combobox aria-label='Test'>
						<Combobox.Option>Option 1</Combobox.Option>
						<Combobox.Option>Option 2</Combobox.Option>
						<Combobox.Option>Option 3</Combobox.Option>
					</Combobox>
				</form>,
			);

			const input = screen.getByRole('combobox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
			await user.keyboard(`{${KeyBoard.ENTER}}`);

			expect(onSubmit).not.toHaveBeenCalled();
		});
		it('scroll jusqu’à l’option active à la flèche du bas/haut', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);
			const option = screen.getByRole('option', { hidden: true, name: /Option 3/i });
			// NOTE (GAFI 26-06-2023): viewport pas implémenté dans RTL, test sur le détail d'implémentation :(
			option.scrollIntoView = jest.fn();

			const input = screen.getByRole('combobox');
			await user.click(input);
			await user.keyboard(`{${KeyBoard.ARROW_UP}}`);

			expect(option.scrollIntoView).toHaveBeenCalledWith(expect.objectContaining({ block: 'nearest' }));
		});
	});

	it('marque les éléments pas sélectionnés comme tel', async () => {
		render(
			<Combobox aria-label='Test'>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const input = screen.getByRole('combobox');
		expect(input).not.toHaveAttribute('aria-activedescendant');
		const suggestions = screen.getAllByRole('option', { hidden: true });
		expect(suggestions[0]).toHaveAttribute('aria-selected', 'false');
		expect(suggestions[1]).toHaveAttribute('aria-selected', 'false');
		expect(suggestions[2]).toHaveAttribute('aria-selected', 'false');
	});

	describe('Filtre', () => {
		it('ouvre la liste quand on commence à taper dans le champ', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			await user.type(input, 'Opt');

			const suggestions = screen.getByRole('listbox');
			expect(suggestions).toBeVisible();
		});
		it('filtre la liste quand on tape dans le champ', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			await user.type(input, '1');

			const option1 = screen.getByRole('option', { name: 'Option 1' });
			expect(option1).toBeVisible();
			const option2 = screen.getByText('Option 2');
			expect(option2).not.toBeVisible();
		});
		it('skip les options masquées quand on passe à l’option suivante', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			await user.type(input, '2');
			await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);

			const option = screen.getByRole('option', { name: 'Option 2' });
			expect(input).toHaveAttribute('aria-activedescendant', option.id);
			expect(option).toHaveAttribute('aria-selected', 'true');
		});
		it('skip les options masquées quand on passe à l’option précédente', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			await user.type(input, '2');
			await user.keyboard(`{${KeyBoard.ARROW_UP}}`);

			const option = screen.getByRole('option', { name: 'Option 2' });
			expect(input).toHaveAttribute('aria-activedescendant', option.id);
			expect(option).toHaveAttribute('aria-selected', 'true');
		});
		it('ignore la casse quand les options sont filtrées', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>ABC</Combobox.Option>
					<Combobox.Option>abc</Combobox.Option>
					<Combobox.Option>Abc</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('combobox');
			await user.type(input, 'a');

			const options = screen.getAllByRole('option');
			expect(options).toHaveLength(3);
		});
	});

	it('change la valeur de l’input quand on clique sur une option', async () => {
		const user = userEvent.setup();
		render(
			<Combobox aria-label='Test'>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const input = screen.getByRole('combobox');
		await user.type(input, 'Option');
		const option = screen.getByRole('option', { name: /Option 2/i });
		await user.click(option);

		expect(input).toHaveValue('Option 2');
	});
	it('ferme la liste quand on clique sur une option', async () => {
		const user = userEvent.setup();
		render(
			<Combobox aria-label='Test'>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const input = screen.getByRole('combobox');
		await user.type(input, 'Option');
		const option = screen.getByRole('option', { name: /Option 2/i });
		await user.click(option);

		const suggestions = screen.getByRole('listbox', { hidden : true });
		expect(suggestions).not.toBeVisible();
	});
	it('affiche un bouton qui déplie le menu', async () => {
		const user = userEvent.setup();
		render(
			<Combobox aria-label='Test'>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const button = screen.getByRole('button');
		await user.click(button);

		const suggestions = screen.getByRole('listbox');
		expect(suggestions).toBeVisible();
	});
	it('affiche un bouton qui replie le menu quand le menu est déplié', async () => {
		const user = userEvent.setup();
		render(
			<Combobox aria-label='Test'>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const button = screen.getByRole('button');
		await user.click(button);
		await user.click(button);

		const suggestions = screen.getByRole('listbox', { hidden: true });
		expect(suggestions).not.toBeVisible();
	});
	it('enlève le bouton qui déplie la liste du tab order', async () => {
		const user = userEvent.setup();
		render(
			<Combobox aria-label='Test'>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const input = screen.getByRole('combobox');
		await user.click(input);
		await user.tab();

		const button = screen.getByRole('button');
		expect(button).not.toHaveFocus();
	});
	it('génère un id unique pour la liste', () => {
		render(
			<>
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
				</Combobox>
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
				</Combobox>
			</>,
		);

		const listes = screen.getAllByRole('listbox', { hidden: true });
		expect(listes[0].id).not.toEqual(listes[1].id);
	});

	describe('attributs ARIA', () => {
		it('marque le combobox comme étendu lorsque la liste est affichée', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const button = screen.getByRole('button');
			await user.click(button);

			const combobox = screen.getByRole('combobox');
			expect(combobox).toHaveAttribute('aria-expanded', 'true');
		});
		it('marque le combobox comme replié lorsque la liste est masquée', async () => {
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const combobox = screen.getByRole('combobox');
			expect(combobox).toHaveAttribute('aria-expanded', 'false');
		});
		it('marque le combobox comme contrôleur de la liste', async () => {
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const combobox = screen.getByRole('combobox');
			const liste = screen.getByRole('listbox', { hidden: true });
			expect(combobox).toHaveAttribute('aria-controls', expect.stringContaining(liste.id));
		});
		it('marque le combobox comme autocomplété par une liste', () => {
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const combobox = screen.getByRole('combobox');
			expect(combobox).toHaveAttribute('aria-autocomplete', 'list');
		});
		it('marque le bouton comme étendu lorsque la liste est affichée', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const button = screen.getByRole('button');
			await user.click(button);

			expect(button).toHaveAttribute('aria-expanded', 'true');
		});
		it('marque le bouton comme replié lorsque la liste est masquée', async () => {
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const button = screen.getByRole('button');
			expect(button).toHaveAttribute('aria-expanded', 'false');
		});
		it('marque le bouton comme contrôleur de la liste', async () => {
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const button = screen.getByRole('button');
			const liste = screen.getByRole('listbox', { hidden: true });
			expect(button).toHaveAttribute('aria-controls', expect.stringContaining(liste.id));
		});

		// NOTE (GAFI 26-06-2023): Force la présence d'un aria-label(ledby), voir si on peut le déduire du label de l'input ?
		it('ajoute un label à la liste de suggestions avec aria-label', async () => {
			const user = userEvent.setup();
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const button = screen.getByRole('button');
			await user.click(button);

			const liste = screen.getByRole('listbox', { hidden: true });
			expect(liste).toHaveAccessibleName('Test');
		});
		it('ajoute un label à la liste de suggestions avec aria-labelledby', async () => {
			const user = userEvent.setup();
			render(
				<>
					<label htmlFor="combobox" id="label-combobox">Test</label>
					<Combobox id="combobox" aria-labelledby='label-combobox'>
						<Combobox.Option>Option 1</Combobox.Option>
						<Combobox.Option>Option 2</Combobox.Option>
						<Combobox.Option>Option 3</Combobox.Option>
					</Combobox>
				</>,
			);

			const button = screen.getByRole('button');
			await user.click(button);

			const liste = screen.getByRole('listbox', { hidden: true });
			expect(liste).toHaveAccessibleName('Test');
		});
		it('ajoute un label au bouton avec aria-label', () => {
			render(
				<Combobox aria-label='Test'>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const button = screen.getByRole('button');
			expect(button).toHaveAccessibleName('Test');
		});
		it('ajoute un label au bouton avec aria-labelledby', async () => {
			render(
				<>
					<label htmlFor="combobox" id="label-combobox">Test</label>
					<Combobox id="combobox" aria-labelledby='label-combobox'>
						<Combobox.Option>Option 1</Combobox.Option>
						<Combobox.Option>Option 2</Combobox.Option>
						<Combobox.Option>Option 3</Combobox.Option>
					</Combobox>
				</>,
			);

			const button = screen.getByRole('button');
			expect(button).toHaveAccessibleName('Test');
		});
	});

	it.todo('retourne le focus sur l’input quand on clique sur le bouton');

	it.todo('calculer automatiquement le label de la liste et du bouton avec le label de l’input');
	it.todo('handle value != label on option');
	it.todo('gérer les children qui ne sont pas des Option (devrait être automatique ?)');
	it.todo('validation de la valeur avec liste des options');
	it.todo('gérer les catégories');
});
