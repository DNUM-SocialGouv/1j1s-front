/**
 * @jest-environment jsdom
 */


import { render, screen } from '@testing-library/react';

import { InputWithUnit } from '~/client/components/ui/Form/InputWithUnit/InputWithUnit';

describe('<InputWithUnit', () => {
	it('affiche un input avec une unité', () => {
		render(<InputWithUnit unite={'€'} nomDeLUnite={'Euro'} />);
		const inputWithUnit = screen.getByRole('textbox');

		expect(inputWithUnit).toBeVisible();
		expect(inputWithUnit).toHaveAccessibleDescription('€');
	});

	it('place l‘unité dans une abbréviation', () => {
		render(<InputWithUnit unite={'€'} nomDeLUnite={'Euro'} />);
		const abbreviationUnit = screen.getByTitle('Euro');

		expect(abbreviationUnit).toBeVisible();
		expect(abbreviationUnit).toHaveTextContent('€');
	});

	it('accepte une ref', () => {
		const ref = jest.fn();
		render(<InputWithUnit unite={'€'} nomDeLUnite={'Euro'} ref={ref} />);

		expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
	});

	it('merge la description accessible avec celle donnée en props', () => {
		render(<>
			<div id={'id'}>test</div>
			<InputWithUnit unite={'€'} nomDeLUnite={'Euro'} aria-describedby={'id'} />
		</>);

		expect(screen.getByRole('textbox')).toHaveAccessibleDescription('€ test');
	});
});
