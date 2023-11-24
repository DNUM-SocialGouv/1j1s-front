/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import {
	FormulaireRechercheMissionEngagement,
} from '~/client/components/features/Engagement/Rechercher/FormulaireRecherche/FormulaireRechercheMissionEngagement';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { aMissionEngagementDomainList } from '~/server/engagement/domain/missionEngagement.fixture';

describe('FormulaireRechercheMissionEngagement', () => {
	describe('quand on recherche par domaine', () => {
		it('ajoute les domaines aux query params', async () => {
			// GIVEN
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			const domainList = aMissionEngagementDomainList();
			const localisationServiceMock = aLocalisationService();

			render(
				<DependenciesProvider localisationService={localisationServiceMock}>
					<FormulaireRechercheMissionEngagement domainList={domainList}/>
				</DependenciesProvider>,
			);
			const user = userEvent.setup();
			await user.type(screen.getByRole('combobox', { name: 'Localisation' }), 'Pari');
			await user.click(screen.getAllByRole('option')[0]);

			const sélectionnerUnDomaineButton = screen.getByRole('button', { name: 'Domaine' });
			await user.click(sélectionnerUnDomaineButton);
			const domaineÉducationOption = screen.getByRole('radio', { name: 'Éducation' });
			await user.click(domaineÉducationOption);
			const rechercherMissionButton = screen.getByRole('button', { name: 'Rechercher' });

			// WHEN
			await user.click(rechercherMissionButton);

			// THEN
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('domain=education') }, undefined, { shallow: true });
		});
	});

	describe('quand on filtre avec ouverts aux mineurs', () => {
		it('ajoute le filtre aux query params', async () => {
			// GIVEN
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			const domainList = aMissionEngagementDomainList();
			const localisationServiceMock = aLocalisationService();

			render(
				<DependenciesProvider localisationService={localisationServiceMock}>
					<FormulaireRechercheMissionEngagement domainList={domainList}/>
				</DependenciesProvider>,
			);
			const user = userEvent.setup();
			await user.type(screen.getByRole('combobox', { name: 'Localisation' }), 'Pari');
			await user.click(screen.getAllByRole('option')[0]);

			const ouvertsAuxMineursCheckbox = screen.getByRole('checkbox', { name: 'Dès 16 ans' });
			await user.click(ouvertsAuxMineursCheckbox);
			const rechercherMissionButton = screen.getByRole('button', { name: 'Rechercher' });

			// WHEN
			await user.click(rechercherMissionButton);

			// THEN
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('ouvertsAuxMineurs=true') }, undefined, { shallow: true });
		});
	});

	describe('quand on recherche par localisation', () => {
		it('ajoute les distances aux query params', async () => {
			// GIVEN
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			const domainList = aMissionEngagementDomainList();
			const localisationServiceMock = aLocalisationService();

			render(
				<DependenciesProvider localisationService={localisationServiceMock}>
					<FormulaireRechercheMissionEngagement domainList={domainList}/>
				</DependenciesProvider>,
			);

			const user = userEvent.setup();
			const comboboxCommune = screen.getByRole('combobox', { name: 'Localisation' });
			await user.type(comboboxCommune, 'Pari');
			const resultListCommune = screen.getAllByRole('option');
			await user.click(resultListCommune[0]);
			const selectButtonRadius = screen.getByRole('button', { name: 'Rayon' });
			await user.click(selectButtonRadius);

			const rayon30kmOption = screen.getByRole('radio', { name: '30 km' });
			await user.click(rayon30kmOption);
			const rechercherMissionButton = screen.getByRole('button', { name: 'Rechercher' });

			// WHEN
			await user.click(rechercherMissionButton);

			// THEN
			expect(routerPush).toHaveBeenCalledWith({ query: 'libelleCommune=Paris+%2875006%29&codeCommune=75056&latitudeCommune=48.859&longitudeCommune=2.347&distanceCommune=30&page=1' }, undefined, { shallow: true });
		});
	});
});
