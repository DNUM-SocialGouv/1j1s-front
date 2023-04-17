/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import {
	CampagneApprentissageEntreprises,
} from '~/client/components/features/CampagneApprentissage/CampagneApprentissageEntreprises/CampagneApprentissageEntreprises';
import { mockSmallScreen } from '~/client/components/window.mock';

describe('CampagneApprentissageEntreprises', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('affiche le titre de la page', () => {
		// WHEN
		render(<CampagneApprentissageEntreprises />);
		const titre = screen.getByRole('heading', { level:1, name: /L’apprentissage : le bon choix pour votre entreprise/i });

		// THEN
		expect(titre).toBeVisible();
	});

	it('affiche un lien vers la simulation', () => {
		// WHEN
		render(<CampagneApprentissageEntreprises />);

		// THEN
		const simulation = screen.getByRole('link', { name: /Simuler le coût d’embauche/i });
		expect(simulation).toBeVisible();
		expect(simulation).toHaveAttribute('href', '/apprentissage/simulation');
	});

	describe('affiche une section tout savoir sur l’embauche d’un apprenti', () => {
		it('comprenant un titre', () => {
			// WHEN
			render(<CampagneApprentissageEntreprises />);

			// THEN
			const section = screen.getByRole('region', { name: 'Tout savoir sur l’embauche d’un apprenti' });
			const titre = within(section).getByRole('heading', { level: 2, name: 'Tout savoir sur l’embauche d’un apprenti' });
			expect(titre).toBeVisible();
		});

		it('comprenant une description', () => {
			// WHEN
			render(<CampagneApprentissageEntreprises />);

			// THEN
			const section = screen.getByRole('region', { name: 'Tout savoir sur l’embauche d’un apprenti' });
			const description = within(section).getByText('Des conseils pour bien recruter votre apprenti, le point sur les aides à l’embauche d’un apprenti… Le site “Embaucher un apprenti” met à disposition un ensemble de conseils pratiques à destination des employeurs');
			expect(description).toBeVisible();
		});

		it('comprenant un lien externe vers des conseils pratiques', () => {
			// WHEN
			render(<CampagneApprentissageEntreprises />);

			// THEN
			const section = screen.getByRole('region', { name: 'Tout savoir sur l’embauche d’un apprenti' });
			const link = within(section).getByRole('link', { name: 'Découvrir les conseils pratiques' });
			expect(link).toBeVisible();
			expect(link).toHaveAttribute('href', 'https://travail-emploi.gouv.fr/formation-professionnelle/formation-en-alternance-10751/apprentissage/embaucher-un-apprenti/' );
		});
	});
});
