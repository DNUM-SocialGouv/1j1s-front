/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { Error } from '~/client/components/ui/Form/InputText/Error/Error';

describe('<Error/>', () => {
	it('Je vois l‘erreur', () => {
		render(<Error>Je suis une erreur</Error>);
		expect(screen.getByText('Je suis une erreur')).toBeVisible();
	});

	it('accepte une classe', () => {
		render(<Error className="className">Je suis une erreur</Error>);
		expect(screen.getByText('Je suis une erreur')).toHaveAttribute('class', expect.stringContaining('className'));
	});
});
