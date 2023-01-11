/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';

import { DécouvrirDispositifs } from './DecouvrirDispositifs';

describe('DecouvrirDispositifs', () => {

	function renderComponent () {
		render(
			<DependenciesProvider>
				<DécouvrirDispositifs />
			</DependenciesProvider>,
		);
	}

	describe('quand on clique sur Déposer une offre d‘emploi ou d‘alternance', () => {
		it('ça te renvoie vers le formulaire du dépot de stage', () => {
			// Given
			const deposerOffreEmploiAlternance = 'Déposer une offre d‘emploi ou d‘alternance';

			renderComponent();

			// Then
			const link = screen.getByRole('link', { name: deposerOffreEmploiAlternance });
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute('href', expect.stringContaining('/je-recrute/deposer-une-offre-d-emploi'));
		});
	});

	describe('quand on clique sur Déposer une offre de stage', () => {
		it('ça te renvoie vers le formulaire du dépot de stage', () => {
			// Given
			const deposerOffreStage = 'Déposer une offre de stage';

			renderComponent();

			// Then
			const link = screen.getByRole('link', { name: deposerOffreStage });
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute('href', expect.stringContaining('/stages/deposer-offre'));
		});
	});
});
