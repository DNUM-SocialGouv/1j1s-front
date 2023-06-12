/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

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
		await user.keyboard('{DownArrow}');

		const suggestionsList = screen.getByRole('listbox');
		expect(suggestionsList).toBeVisible();
		const suggestions = within(suggestionsList).getAllByRole('option');
		expect(suggestions).toHaveLength(3);
	});
});
