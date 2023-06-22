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
		const inputRechercheDomaine = screen.getByRole('textbox', { name: 'Domaine, mot-clé...' });
		expect(inputRechercheDomaine).toBeVisible();

		const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
		expect(buttonRechercher).toBeVisible();
	});
	describe('lorsque je fais une recherche', () => {
		it('ajoute le domaine au query params', async () => {
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });

			render(<FormulaireRechercheFormationInitiale/>);
			const inputRechercheDomaine = screen.getByRole('textbox', { name: 'Domaine, mot-clé...' });
			fireEvent.change(inputRechercheDomaine, { target: { value: 'boulanger' } });

			const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
			fireEvent.click(buttonRechercher);

			expect(routerPush).toHaveBeenCalledWith({ query: 'domaine=boulanger&page=1' }, undefined, { shallow: true });
		});
	});
	it('rempli automatiquement les champs avec les query params', () => {
		mockUseRouter({
			query: {
				domaine: 'boulanger',
			},
		});

		render(<FormulaireRechercheFormationInitiale/>);

		const inputRechercheDomaine = screen.getByRole('textbox', { name: 'Domaine, mot-clé...' });
		expect(inputRechercheDomaine).toHaveValue('boulanger');
	});
});
