/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { Banniere } from '~/client/components/features/ContratEngagementJeune/Banniere/Banniere';

describe('Banniere', () => {
	it('je vois le titre de la page', () => {
		render(<Banniere />);

		expect(screen.getByRole('heading', {
			level: 1,
			name: 'Le Contrat d’Engagement Jeune, la solution pour vous\xa0!',
		})).toBeVisible();
	});

	it('affiche le lien avec le bon intitulé', () => {
		// GIVEN
		// WHEN
		render(<Banniere />);

		// THEN
		const lien = screen.getByRole('link', { name: 'Trouver son accompagnement CEJ' });

		expect(lien).toBeVisible();
		expect(lien).toHaveAttribute('href', '#accompagnement');
	});
});
