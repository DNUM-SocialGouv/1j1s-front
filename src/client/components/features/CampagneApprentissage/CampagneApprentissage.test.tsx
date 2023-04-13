/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { CampagneApprentissage } from '~/client/components/features/CampagneApprentissage/CampagneApprentissage';
import { mockSmallScreen } from '~/client/components/window.mock';

describe('CampagneApprentissage', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('affiche le titre de la page', () => {
		// WHEN
		render(<CampagneApprentissage />);
		const titre = screen.getByRole('heading', { level:1, name: /L’apprentissage : pour moi c’est le bon choix/i });

		// THEN
		expect(titre).toBeVisible();
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
