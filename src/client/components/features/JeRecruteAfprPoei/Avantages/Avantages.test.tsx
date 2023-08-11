/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import Avantages from '~/client/components/features/JeRecruteAfprPoei/Avantages/Avantages';

describe('<Avantages />', () => {
	it('affiche un titre et un sous-titre', () => {
		// When
		render(<Avantages />);
		
		// Then
		expect(screen.getByRole('heading', { level: 2, name: 'Les avantages' })).toBeVisible();
		expect(screen.getByRole('heading', { level: 3, name: 'Faites monter en compétences votre candidat' })).toBeVisible();
	});

	it('affiche une liste de 5 avantages', () => {
		// When
		render(<Avantages />);

		// Then
		expect(screen.getByRole('list')).toBeVisible();

		const items = screen.getAllByRole('listitem');
		expect(items).toHaveLength(5);
	});
});
