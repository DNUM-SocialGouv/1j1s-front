/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import MaintenanceFranceTravail from '~/client/components/features/MaintenanceFranceTravail/MaintenanceFranceTravail';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';

describe('MaintenanceFranceTravail', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	function renderComponent () {
		render(
			<DependenciesProvider>
				<MaintenanceFranceTravail />
			</DependenciesProvider>,
		);

	}

	describe('quand on arrive sur la page de maintenance France Travail', () => {
		it('affiche le titre de la page',  () => {
			renderComponent();

			const titre = screen.getByRole('heading', { level: 1, name: /Le formulaire pour déposer une offre d’emploi est actuellement en maintenance. Merci de réessayer plus tard./i } );
			expect(titre).toBeVisible();
		});
	});

	describe('quand on clique sur Je découvre les dispositifs', () => {
		it('redirige vers la page Mesures Employeurs', () => {
			// Given
			const jeDécouvreLesDispositifs = 'Je découvre les dispositifs';

			renderComponent();

			// Then
			const link = screen.getByRole('link', { name: jeDécouvreLesDispositifs });
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute('href', expect.stringContaining('/mesures-employeurs'));
		});
	});
});
