/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import RechercherStages3eme from './RechercherStages3eme';

describe('La recherche des stages de 3ème', () => {
	it('affiche un titre', () => {
		// WHEN
		render(<RechercherStages3eme/>);

		// THEN
		const titre = screen.getByRole('heading', { level: 1, name: 'Des milliers d’entreprises prêtes à vous accueillir pour votre stage de 3ème' });
		expect(titre).toBeVisible();
	});
});
