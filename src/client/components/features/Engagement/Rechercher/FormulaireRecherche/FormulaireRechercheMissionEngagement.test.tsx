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
		it('ajoute les données d’une commune aux query params', async () => {
			// GIVEN
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			const localisationServiceMock = aLocalisationService();

			render(
				<DependenciesProvider localisationService={localisationServiceMock}>
					<FormulaireRechercheMissionEngagement domainList={aMissionEngagementDomainList()}/>
				</DependenciesProvider>,
			);

			const user = userEvent.setup();
			const comboboxCommune = screen.getByRole('combobox', { name: 'Localisation' });
			await user.type(comboboxCommune, 'Pari');

			const listeSuggestions = screen.getByRole('listbox');
			await user.selectOptions(listeSuggestions, 'Paris (75006)');

			const rechercherMissionButton = screen.getByRole('button', { name: 'Rechercher' });

			// WHEN
			await user.click(rechercherMissionButton);

			// THEN
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('libelleCommune=Paris+%2875006%29' ) }, undefined, { shallow: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('codeCommune=75056' ) }, undefined, { shallow: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('latitudeCommune=48.859' ) }, undefined, { shallow: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('longitudeCommune=2.347' ) }, undefined, { shallow: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('codePostal=75006' ) }, undefined, { shallow: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('ville=Paris' ) }, undefined, { shallow: true });
		});
		describe('le rayon', () => {
		  it('de 10km par défaut est ajouté aux query params', async () => {
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

			  const listeSuggestions = screen.getByRole('listbox');
			  await user.selectOptions(listeSuggestions, 'Paris (75006)');

			  const rechercherMissionButton = screen.getByRole('button', { name: 'Rechercher' });

			  // WHEN
			  await user.click(rechercherMissionButton);

			  // THEN
			  expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('distanceCommune=10') }, undefined, { shallow: true });
		  });
		  it('sélectionné par l‘utilisateur est ajouté aux query params', async () => {
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

			  const listeSuggestions = screen.getByRole('listbox');
			  await user.selectOptions(listeSuggestions, 'Paris (75006)');

			  const selectButtonRadius = screen.getByRole('button', { name: 'Rayon' });
			  await user.click(selectButtonRadius);

			  const rayon30kmOption = screen.getByRole('radio', { name: '30 km' });
			  await user.click(rayon30kmOption);
			  const rechercherMissionButton = screen.getByRole('button', { name: 'Rechercher' });

			  // WHEN
			  await user.click(rechercherMissionButton);

			  // THEN
			  expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('distanceCommune=30') }, undefined, { shallow: true });
		  });
		});
	});
});
