/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import {
	FormulaireRechercheStages3eme,
} from '~/client/components/features/Stages3eme/Rechercher/FormulaireRecherche/FormulaireRechercheStages3eme';
import { MetierCodeAppellation } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/MetierCode';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aMetierService } from '~/client/services/metiers/metier.fixture';
import { aStage3emeService } from '~/client/services/stage3eme/stage3eme.service.fixture';
import { createSuccess } from '~/server/errors/either';

describe('FormulaireRechercheStages3eme', () => {
	beforeEach(() => {
		mockSmallScreen();
	});
	describe('quand on recherche par métier', () => {
		it('ajoute le métier recherché aux query params', async () => {
			// GIVEN
			const routerPush = jest.fn();
			const user = userEvent.setup();
			mockUseRouter({ push: routerPush });
			const metierService = aMetierService();
			jest.spyOn(metierService, 'rechercherMetier').mockResolvedValue(createSuccess([
				{ code: [new MetierCodeAppellation('codeMetier')], label: 'boulanger' },
			]));

			render(
				<DependenciesProvider
					stage3emeService={aStage3emeService()}
					metierStage3emeService={metierService}
				>
					<FormulaireRechercheStages3eme />
				</DependenciesProvider>,
			);

			// WHEN
			const inputRechercheMetier = screen.getByRole('combobox', { name: 'Métier (facultatif)' });
			await user.type(inputRechercheMetier, 'boulanger');
			const boulangerOption = await screen.findByRole('option', { name: 'boulanger' });
			await user.click(boulangerOption);
			const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
			await user.click(buttonRechercher);

			// THEN
			// NOTE (DORO 22-11-2023): Query params "location=here" temporaire pour afficher les résultats de recherche (à remplacer par les vrais query params quand la recherche par localisation sera implémentée)
			expect(routerPush).toHaveBeenCalledWith({ query: 'location=here&libelleMetier=boulanger&codeMetier=codeMetier' }, undefined, { shallow: true });
		});
	});
});
