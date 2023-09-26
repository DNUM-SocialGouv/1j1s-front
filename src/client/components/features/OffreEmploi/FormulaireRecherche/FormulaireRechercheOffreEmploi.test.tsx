/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import {
	FormulaireRechercheOffreEmploi,
} from '~/client/components/features/OffreEmploi/FormulaireRecherche/FormulaireRechercheOffreEmploi';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockLargeScreen, mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { référentielDomaineList } from '~/client/domain/référentielDomaineList';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { createSuccess } from '~/server/errors/either';
import { NiveauRequis } from '~/server/formations/domain/formation';
import { aLocalisationListWithCommuneAndDépartement } from '~/server/localisations/domain/localisation.fixture';

describe('FormulaireRechercheOffreEmploi', () => {
	beforeEach(() => {
		mockLargeScreen();
	});
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
						<FormulaireRechercheOffreEmploi />
					</DependenciesProvider>,
				);

				const inputRechercheMotClé = screen.getByRole('textbox', { name: 'Métier, mot-clé' });
				await user.type(inputRechercheMotClé, 'boulanger');
				const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });

				// WHEN
				await user.click(buttonRechercher);

				// THEN
				expect(routerPush).toHaveBeenCalledWith({ query: 'motCle=boulanger&page=1' }, undefined, { shallow: true });
			});
		});

		describe('quand on recherche par type de contrat', () => {
			it('ajoute les types de contrat aux query params', async () => {
				// GIVEN
				const localisationServiceMock = aLocalisationService();
				const routerPush = jest.fn();
				const user = userEvent.setup();
				mockUseRouter({ push: routerPush });

				render(
					<DependenciesProvider localisationService={localisationServiceMock}>
						<FormulaireRechercheOffreEmploi />
					</DependenciesProvider>,
				);

				const buttonFiltresRecherche = screen.getByRole('button', { name: 'Filtrer ma recherche' });

				// WHEN
				await user.click(buttonFiltresRecherche);
				const modalComponent = screen.getByRole('dialog');
				const inputTypeDeContrat = within(modalComponent).getByRole('checkbox', { name: 'Mission intérimaire' });
				await user.click(inputTypeDeContrat);

				expect(modalComponent).toBeInTheDocument();

				const buttonAppliquerFiltres = within(modalComponent).getByRole('button', { name: 'Appliquer les filtres' });

				// WHEN
				await user.click(buttonAppliquerFiltres);

				// THEN
				expect(routerPush).toHaveBeenCalledWith({ query: 'typeDeContrats=MIS&page=1' }, undefined, { shallow: true });
			});
		});

		describe('quand on recherche par temps de travail', () => {
			it('ajoute les temps de travail aux query params', async () => {
				// GIVEN
				const localisationServiceMock = aLocalisationService();
				const routerPush = jest.fn();
				const user = userEvent.setup();
				mockUseRouter({ push: routerPush });

				render(
					<DependenciesProvider localisationService={localisationServiceMock}>
						<FormulaireRechercheOffreEmploi />
					</DependenciesProvider>,
				);

				const buttonFiltresRecherche = screen.getByRole('button', { name: 'Filtrer ma recherche' });

				// WHEN
				await user.click(buttonFiltresRecherche);
				const modalComponent = screen.getByRole('dialog');
				const inputTempsDeTravail = within(modalComponent).getByRole('radio', { name: 'Temps plein' });
				await user.click(inputTempsDeTravail);

				expect(modalComponent).toBeInTheDocument();

				const buttonAppliquerFiltres = within(modalComponent).getByRole('button', { name: 'Appliquer les filtres' });

				// WHEN
				await user.click(buttonAppliquerFiltres);

				// THEN
				expect(routerPush).toHaveBeenCalledWith({ query: 'tempsDeTravail=tempsPlein&page=1' }, undefined, { shallow: true });
			});
		});

		describe('quand on recherche par niveau demandé', () => {
			it('ajoute le niveau demandé aux query params', async () => {
				// GIVEN
				const localisationServiceMock = aLocalisationService();
				const routerPush = jest.fn();
				const user = userEvent.setup();
				mockUseRouter({ push: routerPush });

				render(
					<DependenciesProvider localisationService={localisationServiceMock}>
						<FormulaireRechercheOffreEmploi />
					</DependenciesProvider>,
				);

				const buttonFiltresRecherche = screen.getByRole('button', { name: 'Filtrer ma recherche' });

				// WHEN
				await user.click(buttonFiltresRecherche);
				const modalComponent = screen.getByRole('dialog');
				const inputExperienceExigence = within(modalComponent).getByRole('radio', { name: 'Moins de 1 an' });
				await user.click(inputExperienceExigence);

				expect(modalComponent).toBeInTheDocument();

				const buttonAppliquerFiltres = within(modalComponent).getByRole('button', { name: 'Appliquer les filtres' });

				// WHEN
				await user.click(buttonAppliquerFiltres);

				// THEN
				expect(routerPush).toHaveBeenCalledWith({ query: 'experienceExigence=D&page=1' }, undefined, { shallow: true });
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
						<FormulaireRechercheOffreEmploi />
					</DependenciesProvider>,
				);

				const inputLocalisation = screen.getByRole('combobox', { name: 'Localisation' });
				const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });

				// WHEN
				await user.type(inputLocalisation, 'Par');
				const résultatLocalisationList = await screen.findAllByRole('option');

				// WHEN
				expect(localisationServiceMock.rechercherLocalisation).toHaveBeenCalledWith('Par');

				await user.click(résultatLocalisationList[1]);

				await user.click(buttonRechercher);

				// THEN
				expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('nomLocalisation=Paris') }, undefined, { shallow: true });
				expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('codePostalLocalisation=75001') }, undefined, { shallow: true });
				expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('typeLocalisation=COMMUNE') }, undefined, { shallow: true });
				expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('codeLocalisation=75101') }, undefined, { shallow: true });
			});
		});

		describe('quand on recherche par domaine', () => {
			it('ajoute les domaines aux query params', async () => {
				// GIVEN
				const localisationServiceMock = aLocalisationService();
				const routerPush = jest.fn();
				const user = userEvent.setup();
				mockUseRouter({ push: routerPush });

				render(
					<DependenciesProvider localisationService={localisationServiceMock}>
						<FormulaireRechercheOffreEmploi />
					</DependenciesProvider>,
				);

				const buttonFiltresRecherche = screen.getByRole('button', { name: 'Filtrer ma recherche' });

				// WHEN
				await user.click(buttonFiltresRecherche);
				const modalComponent = screen.getByRole('dialog');
				const inputDomaine = within(modalComponent).getByRole('checkbox', { name: 'Banque / Assurance' });

				await user.click(inputDomaine);

				expect(modalComponent).toBeInTheDocument();

				const buttonAppliquerFiltres = within(modalComponent).getByRole('button', { name: 'Appliquer les filtres' });

				// WHEN
				await user.click(buttonAppliquerFiltres);

				// THEN
				expect(routerPush).toHaveBeenCalledWith({ query: 'grandDomaine=C&page=1' }, undefined, { shallow: true });
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
					<FormulaireRechercheOffreEmploi />
				</DependenciesProvider>,
			);

			const button = screen.getByRole('button', { name: 'Domaines' });
			expect(button).toBeInTheDocument();
		});

		describe('quand on filtre par type de contrat', () => {
			it('ajoute les types de contrat aux query params', async () => {
				const localisationServiceMock = aLocalisationService();
				const routerPush = jest.fn();
				const user = userEvent.setup();
				mockUseRouter({ push: routerPush });

				render(
					<DependenciesProvider localisationService={localisationServiceMock}>
						<FormulaireRechercheOffreEmploi />
					</DependenciesProvider>,
				);

				const button = screen.getByRole('button', { name: 'Types de contrats' });
				await user.click(button);

				const typeDeContratList = await screen.findByRole('listbox');

				const inputTypeDeContrat = within(typeDeContratList).getAllByRole('checkbox');
				await user.click(inputTypeDeContrat[0]);

				const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
				await user.click(buttonRechercher);

				expect(routerPush).toHaveBeenCalledWith({ query: 'typeDeContrats=CDD&page=1' }, undefined, { shallow: true });
			});
		});

		describe('quand on filtre par domaine', () => {
			it('ajoute le domaine sélectionné aux query params', async () => {
				const localisationServiceMock = aLocalisationService();
				const routerPush = jest.fn();
				const user = userEvent.setup();
				mockUseRouter({ push: routerPush });

				render(
					<DependenciesProvider localisationService={localisationServiceMock}>
						<FormulaireRechercheOffreEmploi />
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

		describe('quand on filtre par niveau demandé', () => {
			it('ajoute le niveau demandé sélectionné aux query params', async () => {
				const localisationServiceMock = aLocalisationService();
				const routerPush = jest.fn();
				const user = userEvent.setup();
				mockUseRouter({ push: routerPush });

				render(
					<DependenciesProvider localisationService={localisationServiceMock}>
						<FormulaireRechercheOffreEmploi />
					</DependenciesProvider>,
				);

				const button = screen.getByRole('button', { name: 'Niveau demandé' });
				await user.click(button);

				const niveauDemandéList = await screen.findByRole('listbox');

				const inputNiveauDemandé = within(niveauDemandéList).getAllByRole('radio');
				await user.click(inputNiveauDemandé[0]);

				const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
				await user.click(buttonRechercher);

				expect(routerPush).toHaveBeenCalledWith({ query: 'experienceExigence=D&page=1' }, undefined, { shallow: true });
			});
		});

		describe('quand on filtre par temps de travail', () => {
			it('ajoute les temps de travail aux query params', async () => {
				const localisationServiceMock = aLocalisationService();
				const routerPush = jest.fn();
				const user = userEvent.setup();
				mockUseRouter({ push: routerPush });

				render(
					<DependenciesProvider localisationService={localisationServiceMock}>
						<FormulaireRechercheOffreEmploi />
					</DependenciesProvider>,
				);

				const button = screen.getByRole('button', { name: 'Temps de travail' });
				await user.click(button);

				const tempsDeTravailList = await screen.findByRole('listbox');

				const inputTempsDeTravail = within(tempsDeTravailList).getAllByRole('radio');
				await user.click(inputTempsDeTravail[0]);

				const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
				await user.click(buttonRechercher);

				expect(routerPush).toHaveBeenCalledWith({ query: 'tempsDeTravail=tempsPlein&page=1' }, undefined, { shallow: true });
			});
		});
	});

	describe('quand les query params sont présents', () => {
		describe('que le type de localisation est une commune', () => {
			it('rempli automatiquement les champs de recherche', () => {
				mockUseRouter({ query: {
					codeLocalisation: '75110',
					codePostalLocalisation: '75010',
					experienceExigence: NiveauRequis.NIVEAU_3,
					grandDomaine: référentielDomaineList[0].code,
					motCle: 'Boulanger',
					nomLocalisation: 'Paris',
					tempsDeTravail: 'tempsPlein',
					typeDeContrats: 'CDD',
					typeLocalisation: 'COMMUNE',
				} });

				render(
					<DependenciesProvider localisationService={aLocalisationService()}>
						<FormulaireRechercheOffreEmploi />
					</DependenciesProvider>,
				);

				const motCle = screen.getByRole('textbox', { name: /Métier, mot-clé/i });
				expect(motCle).toHaveValue('Boulanger');
				const localisation = screen.getByRole('combobox', { name: /Localisation/i });
				expect(localisation).toHaveValue('Paris (75010)');

				checkSelectValue('Types de contrats', 'CDD');
				checkSelectValue('Temps de travail', 'tempsPlein');
				checkSelectValue('Niveau demandé', NiveauRequis.NIVEAU_3);
				checkSelectValue('Domaines', référentielDomaineList[0].code);
			});
		});
		describe('que le type de localisation est un département', () => {
			it('rempli automatiquement les champs de recherche', () => {
				mockUseRouter({ query: {
					codeLocalisation: '75',
					experienceExigence: NiveauRequis.NIVEAU_3,
					grandDomaine: référentielDomaineList[0].code,
					motCle: 'Boulanger',
					nomLocalisation: 'Paris',
					tempsDeTravail: 'tempsPlein',
					typeDeContrats: 'CDD',
					typeLocalisation: 'DEPARTEMENT',
				} });

				render(
					<DependenciesProvider localisationService={aLocalisationService()}>
						<FormulaireRechercheOffreEmploi />
					</DependenciesProvider>,
				);

				const motCle = screen.getByRole('textbox', { name: /Métier, mot-clé/i });
				expect(motCle).toHaveValue('Boulanger');
				const localisation = screen.getByRole('combobox', { name: /Localisation/i });
				expect(localisation).toHaveValue('Paris (75)');

				checkSelectValue('Types de contrats', 'CDD');
				checkSelectValue('Temps de travail', 'tempsPlein');
				checkSelectValue('Niveau demandé', NiveauRequis.NIVEAU_3);
				checkSelectValue('Domaines', référentielDomaineList[0].code);
			});
		});
	});
});

// FIXME (GAFI 17-03-2023):
// problème 1 : les inputs checkés ne sont pas valides (ex : input dans span, le tout dans un button pour type de contrat)
// problème 2 : ne pas utiliser de data-testid (d'autant plus qu'ils sont tous identiques aujourd'hui), préférer avoir des input accessibles (récupérables en test)
/* eslint-disable testing-library/no-node-access */
function checkSelectValue(fieldLabel: string, expectedValue: string): void {
	const labelElement = screen.getByText(fieldLabel);
	const fieldId = labelElement.getAttribute('for');
	const field = fieldId && document.getElementById(fieldId);
	expect(field).toHaveValue(expectedValue);
}
