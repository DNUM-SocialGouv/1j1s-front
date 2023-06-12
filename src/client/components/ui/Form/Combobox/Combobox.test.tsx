/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';

import { Combobox } from './Combobox';

describe('<Combobox />', () => {
	it('affiche un input', () => {
		render(
			<Combobox>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const input = screen.getByRole('textbox');

		expect(input).toBeVisible();
	});

	describe('default props', () => {
		it('accepte un ref', () => {
			const ref = jest.fn();

			render(
				<Combobox ref={ref}>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			expect(ref).toHaveBeenLastCalledWith(input);
		});
		it('accepte les props d’un input', () => {
			render(
				<Combobox disabled>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			expect(input).toHaveAttribute('disabled');
		});
		it('appelle onKeyDown quand une touche est pressée', async () => {
			const onKeyDown = jest.fn();
			const user = userEvent.setup();
			render(
				<Combobox onKeyDown={onKeyDown}>
					<Combobox.Option>Option 1</Combobox.Option>
					<Combobox.Option>Option 2</Combobox.Option>
					<Combobox.Option>Option 3</Combobox.Option>
				</Combobox>,
			);

			const input = screen.getByRole('textbox');
			await user.click(input);
			await user.keyboard('A');

			expect(onKeyDown).toHaveBeenCalledTimes(1);
			expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({ key: 'A' }));
		});
	});

	it('masque la liste de suggestions par défaut', () => {
		render(
			<Combobox>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const suggestionsList = screen.getByRole('listbox', { hidden: true });
		expect(suggestionsList).not.toBeVisible();
	});
	it('affiche la liste de suggestions quand on appuie sur la flèche du bas', async () => {
		const user = userEvent.setup();
		render(
			<Combobox>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const input = screen.getByRole('textbox');
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
			<Combobox>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const input = screen.getByRole('textbox');
		await user.click(input);
		await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);

		const suggestions = screen.getAllByRole('option');
		expect(input).toHaveAttribute('aria-activedescendant', suggestions[0].id);
		expect(suggestions[0]).toHaveAttribute('aria-selected', 'true');
	});
	it('focus l’élément suivant de la liste quand on appuie sur la flèche du bas', async () => {
		const user = userEvent.setup();
		render(
			<Combobox>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const input = screen.getByRole('textbox');
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
			<Combobox>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const input = screen.getByRole('textbox');
		await user.click(input);
		await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
		await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
		await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);
		await user.keyboard(`{${KeyBoard.ARROW_DOWN}}`);

		const suggestions = screen.getAllByRole('option');
		expect(input).toHaveAttribute('aria-activedescendant', suggestions[0].id);
		expect(suggestions[0]).toHaveAttribute('aria-selected', 'true');
	});
	it('déselectionne les éléments pas selectionnés', async () => {
		render(
			<Combobox>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const input = screen.getByRole('textbox');
		expect(input).not.toHaveAttribute('aria-activedescendant');
		const suggestions = screen.getAllByRole('option', { hidden: true });
		expect(suggestions[0]).toHaveAttribute('aria-selected', 'false');
		expect(suggestions[1]).toHaveAttribute('aria-selected', 'false');
		expect(suggestions[2]).toHaveAttribute('aria-selected', 'false');
	});
	it('affiche la liste de suggestions quand on appuie sur la flèche du haut', async () => {
		const user = userEvent.setup();
		render(
			<Combobox>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const input = screen.getByRole('textbox');
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
			<Combobox>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const input = screen.getByRole('textbox');
		await user.click(input);
		await user.keyboard(`{${KeyBoard.ARROW_UP}}`);

		const suggestions = screen.getAllByRole('option');
		expect(input).toHaveAttribute('aria-activedescendant', suggestions[2].id);
		expect(suggestions[2]).toHaveAttribute('aria-selected', 'true');
	});
	it('focus l’élément précédent de la liste quand on appuie sur la flèche du haut', async () => {
		const user = userEvent.setup();
		render(
			<Combobox>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const input = screen.getByRole('textbox');
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
			<Combobox>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const input = screen.getByRole('textbox');
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
			<Combobox>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const input = screen.getByRole('textbox');
		await user.click(input);
		await user.keyboard(`{${KeyBoard.ARROW_UP}}`);
		await user.keyboard(`{${KeyBoard.ESCAPE}}`);

		const suggestionsList = screen.getByRole('listbox', { hidden: true });
		expect(suggestionsList).not.toBeVisible();
	});
	it('reset la selection quand on appuie sur Escape', async () => {
		const user = userEvent.setup();
		render(
			<Combobox>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const input = screen.getByRole('textbox');
		await user.click(input);
		await user.keyboard(`{${KeyBoard.ARROW_UP}}`);
		await user.keyboard(`{${KeyBoard.ESCAPE}}`);

		const suggestions = screen.getAllByRole('option', { hidden: true });
		expect(input).not.toHaveAttribute('aria-activedescendant');
		suggestions.forEach((suggestion) => {
			expect(suggestion).toHaveAttribute('aria-selected', 'false');
		});
	});
	it('ouvre la liste quand on appuie sur Alt et flèche du bas sans focus le premier élément', async () => {
		const user = userEvent.setup();
		render(
			<Combobox>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const input = screen.getByRole('textbox');
		await user.click(input);
		await user.keyboard(`{${KeyBoard.ALT}>}{${KeyBoard.ARROW_DOWN}}{/${KeyBoard.ALT}}`);

		const suggestionsList = screen.getByRole('listbox');
		expect(suggestionsList).toBeVisible();
		const suggestions = screen.getAllByRole('option', { hidden: true });
		expect(input).not.toHaveAttribute('aria-activedescendant');
		expect(suggestions[0]).toHaveAttribute('aria-selected', 'false');
	});
});
