/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

	describe('<label />', () => {
		it('affiche le label lorsque indiqué', () => {
			render(<InputArea label={'Mon input'} />);

			const label = screen.getByText('Mon input');
			const input = screen.getByRole('textbox');

			expect(label).toBeVisible();
			expect(input).toHaveAccessibleName('Mon input');
		});
		it('génère un id unique pour chaque composant', () => {
			render(
				<>
					<InputArea label={'Mon input 1'} />
					<InputArea label={'Mon input 2'} />
				</>,
			);

			const [input1, input2] = screen.getAllByRole('textbox');

			expect(input1.id).not.toEqual(input2.id);
		});
	});
});
