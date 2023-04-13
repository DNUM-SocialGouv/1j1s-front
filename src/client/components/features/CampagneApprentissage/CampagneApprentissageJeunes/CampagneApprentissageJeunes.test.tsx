/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import {
	CampagneApprentissageJeunes,
} from '~/client/components/features/CampagneApprentissage/CampagneApprentissageJeunes/CampagneApprentissageJeunes';
import { mockSmallScreen } from '~/client/components/window.mock';

describe('CampagneApprentissageJeunes', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('affiche le titre de la page', () => {
		// WHEN
		render(<CampagneApprentissageJeunes/>);
		const titre = screen.getByRole('heading', { level: 1, name: /L’apprentissage : pour moi c’est le bon choix/i });

		// THEN
		expect(titre).toBeVisible();
	});

	it('affiche un lien vers la simulation', () => {
		// WHEN
		render(<CampagneApprentissageJeunes/>);

		// THEN
		const simulation = screen.getByRole('link', { name: /Simuler ma rémunération/i });
		expect(simulation).toBeVisible();
		expect(simulation).toHaveAttribute('href', '/apprentissage/simulation');
	});

	describe('EnSavoirPlusApprentissage', () => {
		it('je vois les informations pour accéder à la FAQ parents-enfants', () => {
			render(<CampagneApprentissageJeunes/>);
			expect(screen.getByRole('heading', {
				level: 2,
				name: 'Parents : l’apprentissage, le bon choix pour votre enfant. On répond à toutes vos questions',
			})).toBeVisible();
			expect(screen.getByRole('link', { name: 'Accéder à la FAQ Parents-Enfants' })).toHaveAttribute('href', '/faq/apprentissage-parents-enfants');
		});
		it('je vois les informations pour accéder à la page d‘apprentissage pour les employeurs', () => {
			render(<CampagneApprentissageJeunes/>);
			expect(screen.getByRole('heading', {
				level: 2,
				name: 'Employeurs : tout ce qu’il y a à savoir sur l’apprentissage pour votre entreprise',
			})).toBeVisible();
			expect(screen.getByRole('link', { name: 'Découvrir l’apprentissage' })).toHaveAttribute('href', '/apprentissage-entreprises');
		});
	});
});
