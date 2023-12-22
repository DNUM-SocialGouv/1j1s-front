/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { Hint } from './Hint';

describe('<Hint/>', () => {
	it('Je vois l‘indication', () => {
		render(<Hint>Je suis une indication</Hint>);
		expect(screen.getByText('Je suis une indication')).toBeVisible();
	});

	it('accepte une classe', () => {
		render(<Hint className="className">Je suis une indication</Hint>);
		expect(screen.getByText('Je suis une indication')).toHaveAttribute('class', expect.stringContaining('className'));
	});
});
