/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';

import {
	FormulaireRechercheAlternancePE,
} from '~/client/components/features/Alternance/FormulaireRecherche/FormulaireRechercheAlternancePE';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';

describe('<FormulaireRechercheAlternancePE />', () => {
	it('initialise le formulaire avec les query params', async () => {
		mockUseRouter({ query: {
			codeLocalisation: '75',
			libelleLocalisation: 'Paris',
			motCle: 'Boulanger',
			typeLocalisation: 'Commune',
		} });

		render(
			<DependenciesProvider localisationService={aLocalisationService()}>
				<FormulaireRechercheAlternancePE />
			</DependenciesProvider>,
		);

		const métier = screen.getByRole('textbox', { name: /Métier, mot-clé/i });
		expect(métier).toHaveValue('Boulanger');
		const localisation = screen.getByRole('textbox', { name: /Localisation/i });
		expect(localisation).toHaveValue('Paris');
	});
});
