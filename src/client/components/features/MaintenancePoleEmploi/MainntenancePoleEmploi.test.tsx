/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import MaintenancePoleEmploi from '~/client/components/features/MaintenancePoleEmploi/MaintenancePoleEmploi';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';

describe('MaintenancePoleEmploi', () => {

	function renderComponent () {
		render(
			<DependenciesProvider>
				<MaintenancePoleEmploi />
			</DependenciesProvider>,
		);

	}

	describe('quand on clique sur Je découvre les dispositifs', () => {
		it('ça te renvoie vers la page Mesures Employeurs', () => {
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
