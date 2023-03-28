/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';

describe('<Checkbox />', () => {
	it('affiche une checkbox', () => {
		render(<Checkbox label={'Ma checkbox'} />);

		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).toBeVisible();
	});

	it('affiche un label', () => {
		render(<Checkbox label={'Ma checkbox'} />);

		const label = screen.getByText('Ma checkbox');
		expect(label).toBeVisible();
		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).toHaveAccessibleName('Ma checkbox');
	});

	it('accepte les props par défaut', () => {
		render(<Checkbox label="Ma checkbox" disabled aria-label="Test" />);

		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).toHaveAttribute('disabled', '');
		expect(checkbox).toHaveAttribute('aria-label', 'Test');
	});

	it('garde son nom accessible lorsqu’un id est renseigné', () => {
		render(<Checkbox label="Ma checkbox" id="mon-id" />);

		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).toHaveAttribute('id', 'mon-id');
		expect(checkbox).toHaveAccessibleName('Ma checkbox');
	});
});
