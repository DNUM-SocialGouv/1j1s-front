/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import React from 'react';

import { Combobox } from './Combobox';

describe('<Combobox />', () => {
	it('affiche un input', () => {
		render(<Combobox />);

		const input = screen.getByRole('textbox');

		expect(input).toBeVisible();
	});

	describe('default props', () => {
		it('accepte un ref', () => {
			const ref = jest.fn();

			render(<Combobox ref={ref} />);

			const input = screen.getByRole('textbox');
			expect(ref).toHaveBeenLastCalledWith(input);
		});
		it('accepte les props d’un input', () => {
			render(<Combobox disabled />);

			const input = screen.getByRole('textbox');
			expect(input).toHaveAttribute('disabled');
		});
	});

	it('affiche un liste de suggestions', () => {
		render(
			<Combobox>
				<Combobox.Option>Option 1</Combobox.Option>
				<Combobox.Option>Option 2</Combobox.Option>
				<Combobox.Option>Option 3</Combobox.Option>
			</Combobox>,
		);

		const suggestionsList = screen.getByRole('listbox');
		expect(suggestionsList).toBeVisible();
		const suggestions = within(suggestionsList).getAllByRole('option');
		expect(suggestions).toHaveLength(3);
	});
});
