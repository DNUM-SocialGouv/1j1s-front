/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import InputAutocomplétionPays
	from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionPays/InputAutocomplétionPays';

const codePays = 'FR';

describe('InputAutocomplétionPays', () => {
	describe('quand un code pays est fourni', () => {
		it('affiche le pays dans le formulaire', () => {
			render(<InputAutocomplétionPays codePays={codePays}/>);

			const selectedPays = screen.getByDisplayValue('France');

			expect(selectedPays).toBeInTheDocument();
		});

		it('le formulaire doit contenir le code du pays', async () => {
			render(
				<form role="form">
					<InputAutocomplétionPays name={'pays'} codePays={codePays}/>
				</form>,
			);

			expect(screen.getByRole('form')).toHaveFormValues({ pays: 'FR' });
		});
	});

	describe('quand un pays est suggérer', () => {
		it('le code du formulaire est mise à jour', async () => {
			render(<form role="form">
				<InputAutocomplétionPays name={'pays'}/>
			</form>);

			await userEvent.type(screen.getByRole('textbox'), 'france');
			await userEvent.click(screen.getByRole('option'));

			const selectedPays = screen.getByDisplayValue('France');
			const form = screen.getByRole('form');
			expect(selectedPays).toBeInTheDocument();
			expect(form).toHaveFormValues({ pays: 'FR' });
		});
	});
});
