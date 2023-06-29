/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import {
	FormulaireRechercheFormationInitiale,
} from '~/client/components/features/FormationInitiale/FormulaireRecherche/FormulaireRechercheFormationInitiale';
import { mockUseRouter } from '~/client/components/useRouter.mock';

describe('FormulaireRechercheFormationInitiale', () => {
	it('Je vois les champs du formulaire de recherche', () => {
		mockUseRouter({});

		render(<FormulaireRechercheFormationInitiale/>);
		const inputRechercheMotCle = screen.getByRole('textbox', { name: 'Domaine, mot-clé...' });
		expect(inputRechercheMotCle).toBeVisible();

		const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
		expect(buttonRechercher).toBeVisible();
	});
	describe('lorsque je fais une recherche', () => {
		it('ajoute le mot clé au query params', async () => {
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });

			render(<FormulaireRechercheFormationInitiale/>);
			const inputRechercheMotCle = screen.getByRole('textbox', { name: 'Domaine, mot-clé...' });
			fireEvent.change(inputRechercheMotCle, { target: { value: 'boulanger' } });

			const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
			fireEvent.click(buttonRechercher);

			expect(routerPush).toHaveBeenCalledWith({ query: 'motCle=boulanger' }, undefined, { shallow: true });
		});
	});
	it('rempli automatiquement les champs avec les query params', () => {
		mockUseRouter({
			query: {
				motCle: 'boulanger',
			},
		});

		render(<FormulaireRechercheFormationInitiale/>);

		const inputRechercheMotCle = screen.getByRole('textbox', { name: 'Domaine, mot-clé...' });
		expect(inputRechercheMotCle).toHaveValue('boulanger');
	});
});
