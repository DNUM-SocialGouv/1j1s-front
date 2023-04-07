/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { CampagneApprentissage } from '~/client/components/features/CampagneApprentissage/CampagneApprentissage';

describe('CampagneApprentissage', () => {
	it('affiche une section principale avec ancre pour le lien d‘évitement', () => {
		// WHEN
		render(<CampagneApprentissage />);

		// THEN
		const main = screen.getByRole('main');
		expect(main).toBeVisible();
		expect(main).toHaveAttribute('id', 'contenu');
	});

	it('affiche les titres de la page', () => {
		// WHEN
		render(<CampagneApprentissage />);
		const titre = screen.getByRole('heading', { level:1, name: /L’apprentissage : pour moi c’est le bon choix/i });
		const description = screen.getByText(/Avant de démarrer la simulation de vos aides,/i);

		// THEN
		expect(titre).toBeVisible();
		expect(description).toBeVisible();
	});

	it('affiche un lien vers la simulation', () => {
		// WHEN
		render(<CampagneApprentissage />);

		// THEN
		const simulation = screen.getByRole('link', { name: /Simuler ma rémunération/i });
		expect(simulation).toBeVisible();
		expect(simulation).toHaveAttribute('href', '/apprentissage/simulation');
	});
});
