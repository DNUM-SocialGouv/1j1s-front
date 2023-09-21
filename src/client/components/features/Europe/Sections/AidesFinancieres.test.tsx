/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { AidesFinancieres } from '~/client/components/features/Europe/Sections/AidesFinancieres';

describe('<AidesFinancieres />', () => {
	it('affiche le titre de la section', () => {
		render(<AidesFinancieres />);

		const titre = screen.getByRole('heading', {
			level: 2,
			name: /Je cherche des aides financières pour vivre une expérience en Europe/i,
		});
		expect(titre).toBeVisible();
	});
	it('affiche un lien vers le simulateur d’aides', () => {
		render(<AidesFinancieres />);

		const lienSimulateur = screen.getByRole('link', {
			name: /Faire une simulation d’aides/i,
		});
		expect(lienSimulateur).toBeVisible();
		expect(lienSimulateur).toHaveAttribute('href', '/mes-aides');
	});
});
