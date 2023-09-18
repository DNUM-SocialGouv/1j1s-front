/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import React from 'react';

import { RechercherMission } from '~/client/components/features/Engagement/Rechercher/RechercherMission';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';
import {
	aMissionEngagementService,
} from '~/client/services/missionEngagement/missionEngagementService.fixture';
import { EngagementCategory } from '~/client/utils/engagementsCategory.enum';

describe('RechercherMission', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('quand aucune recherche n‘est lancée', () => {
		it('affiche un formulaire de recherche, sans résultat ou message d‘erreur', () => {
			const missionEngagementServiceMock = aMissionEngagementService();
			const localisationServiceMock = aLocalisationService();

			mockUseRouter({});
			render(
				<DependenciesProvider
					localisationService={localisationServiceMock}
					missionEngagementService={missionEngagementServiceMock}
				>
					<RechercherMission category={EngagementCategory.BENEVOLAT}/>
				</DependenciesProvider>,
			);

			// WHEN
			const formulaireRechercheMissionEngagement = screen.getByRole('form');
			const résultatRechercheMissionEngagementList = screen.queryAllByTestId('RésultatRechercherSolution');
			const rechercheMissionEngagementNombreRésultats = screen.queryByTestId('NombreRésultatsSolution');
			const errorMessage = screen.queryByText('0 résultat');

			// THEN
			expect(formulaireRechercheMissionEngagement).toBeInTheDocument();
			expect(résultatRechercheMissionEngagementList).toHaveLength(0);
			expect(rechercheMissionEngagementNombreRésultats).not.toBeInTheDocument();
			expect(errorMessage).not.toBeInTheDocument();
		});
	});

	it('n’appelle pas le service quand aucun query params approprié n’est renseigné', () => {
		mockUseRouter({
			query: {
				test: 'test',
			},
		});
		const missionService = aMissionEngagementService();

		render(
			<DependenciesProvider missionEngagementService={missionService} localisationService={aLocalisationService()}>
				<RechercherMission category={EngagementCategory.BENEVOLAT}/>
			</DependenciesProvider>,
		);

		expect(missionService.rechercherMission).not.toHaveBeenCalled();
	});
});
