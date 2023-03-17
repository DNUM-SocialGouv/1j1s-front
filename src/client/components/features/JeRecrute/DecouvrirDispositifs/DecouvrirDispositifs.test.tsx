/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';

import { DécouvrirDispositifs } from './DecouvrirDispositifs';

describe('DecouvrirDispositifs', () => {
	describe('quand on clique sur Déposer une offre d‘emploi ou d‘alternance', () => {
		it('renvoie vers le formulaire du dépot de stage', () => {
			// Given
			const deposerOffreEmploiAlternance = 'Déposer une offre d‘emploi';

			render(<DécouvrirDispositifs />);

			// Then
			const link = screen.getByRole('link', { name: deposerOffreEmploiAlternance });
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute('href', expect.stringContaining('/emplois/deposer-offre'));
		});
	});
	describe('quand on clique sur Déposer une offre d’alternance', () => {
		it('renvoie vers le formulaire du dépot d’alternance', () => {
			// Given
			const deposerOffreAlternance = 'Déposer une offre d’alternance';

			render(<DécouvrirDispositifs />);

			// Then
			const link = screen.getByRole('link', { name: deposerOffreAlternance });
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute('href', expect.stringContaining('/apprentissage/deposer-offre'));
		});
	});
	describe('quand on clique sur Déposer une offre de stage', () => {
		it('renvoie vers le formulaire du dépot de stage', () => {
			// Given
			const deposerOffreStage = 'Déposer une offre de stage';

			render(<DécouvrirDispositifs />);

			// Then
			const link = screen.getByRole('link', { name: deposerOffreStage });
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute('href', expect.stringContaining('/stages/deposer-offre'));
		});
	});
});
