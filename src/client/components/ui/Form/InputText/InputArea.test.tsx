/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ref } from 'joi';

import { InputArea } from '~/client/components/ui/Form/InputText/InputArea';

describe('<InputArea />', () => {
	it('affiche un input', () => {
		render(<InputArea />);

		const input = screen.getByRole('textbox');

		expect(input).toBeVisible();
	});
	it('passe toutes les props au textarea sous-jacent', () => {
		render(<InputArea disabled aria-label={'Mon input'} />);

		const input = screen.getByRole('textbox');

		expect(input).toHaveAttribute('disabled');
		expect(input).toHaveAttribute('aria-label', 'Mon input');
	});
	it('accepte une ref', () => {
		const ref = jest.fn();
		render(<InputArea ref={ref} />);

		expect(ref).toHaveBeenCalledTimes(1);
		expect(ref).toHaveBeenCalledWith(expect.any(Element));
	});
});
