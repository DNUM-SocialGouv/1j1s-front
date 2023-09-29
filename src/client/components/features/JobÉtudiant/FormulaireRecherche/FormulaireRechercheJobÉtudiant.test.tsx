/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import {
	FormulaireRechercheJobÉtudiant,
} from '~/client/components/features/JobÉtudiant/FormulaireRecherche/FormulaireRechercheJobÉtudiant';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockLargeScreen, mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { référentielDomaineList } from '~/client/domain/référentielDomaineList';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { createSuccess } from '~/server/errors/either';
import { aLocalisationListWithCommuneAndDépartement } from '~/server/localisations/domain/localisation.fixture';

describe('FormulaireRechercheJobÉtudiant', () => {
	describe('en version mobile', () => {
		beforeEach(() => {
			mockSmallScreen();
		});

		describe('quand on recherche par mot clé', () => {
			it('ajoute le mot clé recherché aux query params', async () => {
				// GIVEN
				const localisationServiceMock = aLocalisationService();
				const routerPush = jest.fn();
				const user = userEvent.setup();
				mockUseRouter({ push: routerPush });

				render(
					<DependenciesProvider localisationService={localisationServiceMock}>
						<FormulaireRechercheJobÉtudiant />
					</DependenciesProvider>,
				);

				const inputRechercheMotCle = screen.getByRole('textbox', { name: 'Métier, mot-clé' });
				await user.type(inputRechercheMotCle,'boulanger');
				const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });

				// WHEN
				await user.click(buttonRechercher);

				// THEN
				expect(routerPush).toHaveBeenCalledWith({ query: 'motCle=boulanger&page=1' }, undefined, { shallow: true });
			});
		});

		describe('quand on recherche par localisation', () => {
			it('ajoute la localisation aux query params', async () => {
				// GIVEN
				const localisationServiceMock = aLocalisationService();
				jest.spyOn(localisationServiceMock, 'rechercherLocalisation').mockResolvedValue(createSuccess(aLocalisationListWithCommuneAndDépartement()));
				const user = userEvent.setup();
				const routerPush = jest.fn();
				mockUseRouter({ push: routerPush });
				render(
					<DependenciesProvider localisationService={localisationServiceMock}>
						<FormulaireRechercheJobÉtudiant />
					</DependenciesProvider>,
				);

				const inputLocalisation = screen.getByRole('combobox', { name: 'Localisation' });
				const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
				await user.type(inputLocalisation, 'Par');
				const resultatLocalisationList = await screen.findAllByRole('option');
				await user.click(resultatLocalisationList[1]);

				// WHEN
				await user.click(buttonRechercher);

				// THEN
				expect(localisationServiceMock.rechercherLocalisation).toHaveBeenCalledWith('Par');
				expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('nomLocalisation=Paris') }, undefined, { shallow: true });
				expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('codePostalLocalisation=75001') }, undefined, { shallow: true });
				expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('typeLocalisation=COMMUNE') }, undefined, { shallow: true });
				expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('codeLocalisation=75101') }, undefined, { shallow: true });
			});
		});
	});

	describe('en version desktop', () => {
		beforeEach(() => {
			mockLargeScreen();
		});

		it('affiche les filtres avancés sans modale', async () => {
			// GIVEN
			const localisationServiceMock = aLocalisationService();
			mockUseRouter({ push: jest.fn() });
			render(
				<DependenciesProvider localisationService={localisationServiceMock}>
					<FormulaireRechercheJobÉtudiant />
				</DependenciesProvider>,
			);

			const button = screen.getByRole('button', { name: 'Domaines' });
			expect(button).toBeInTheDocument();

		});

		describe('quand on filtre par domaine', () => {
			it('ajoute le domaine sélectionné aux query params', async () => {
				const localisationServiceMock = aLocalisationService();
				const routerPush = jest.fn();
				const user = userEvent.setup();
				mockUseRouter({ push: routerPush });

				render(
					<DependenciesProvider localisationService={localisationServiceMock}>
						<FormulaireRechercheJobÉtudiant />
					</DependenciesProvider>,
				);

				const button = screen.getByRole('button', { name: 'Domaines' });
				await user.click(button);

				const domaineList = await screen.findByRole('listbox');

				const inputDomaine = within(domaineList).getAllByRole('checkbox');
				await user.click(inputDomaine[2]);

				const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
				await user.click(buttonRechercher);

				expect(routerPush).toHaveBeenCalledWith({ query: 'grandDomaine=C&page=1' }, undefined, { shallow: true });
			});
		});
	});

	it('rempli automatiquement les champs avec les query params', () => {
		mockUseRouter({ query: {
			codeLocalisation: '75110',
			codePostalLocalisation: '75010',
			grandDomaine: référentielDomaineList[0].code,
			motCle: 'Boulanger',
			nomLocalisation: 'Paris',
			typeLocalisation: 'COMMUNE',
		} });

		render(
			<DependenciesProvider localisationService={aLocalisationService()}>
				<FormulaireRechercheJobÉtudiant />
			</DependenciesProvider>,
		);

		const motCle = screen.getByRole('textbox', { name: /Métier, mot-clé/i });
		expect(motCle).toHaveValue('Boulanger');
		const localisation = screen.getByRole('combobox', { name: /Localisation/i });
		expect(localisation).toHaveValue('Paris (75010)');
		const domaine = screen.getByTestId('Select-InputHidden');
		expect(domaine).toHaveValue(référentielDomaineList[0].code);
	});
});
