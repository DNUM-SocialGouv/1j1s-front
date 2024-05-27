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
import { aLocalisationListWithCommuneAndDépartement } from '~/server/localisations/domain/localisation.fixture';
import { Offre } from '~/server/offres/domain/offre';
import CONTRAT_CDD = Offre.CONTRAT_CDD;

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
						<FormulaireRechercheOffreEmploi/>
					</DependenciesProvider>,
				);

				const inputRechercheMotClé = screen.getByRole('textbox', { name: 'Métier, mot-clé (minimum 2 caractères) Exemples : boulanger, informatique…' });
				await user.type(inputRechercheMotClé, 'boulanger');
				const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });

				// WHEN
				await user.click(buttonRechercher);

				// THEN
				expect(routerPush).toHaveBeenCalledWith({ query: 'motCle=boulanger&page=1' }, undefined, { scroll: false });
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
						<FormulaireRechercheOffreEmploi/>
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
				expect(routerPush).toHaveBeenCalledWith({ query: 'typeDeContrats=MIS&page=1' }, undefined, { scroll: false });
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
						<FormulaireRechercheOffreEmploi/>
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
				expect(routerPush).toHaveBeenCalledWith({ query: 'tempsDeTravail=tempsPlein&page=1' }, undefined, { scroll: false });
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
						<FormulaireRechercheOffreEmploi/>
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
				expect(routerPush).toHaveBeenCalledWith({ query: 'experienceExigence=D&page=1' }, undefined, { scroll: false });
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
						<FormulaireRechercheOffreEmploi/>
					</DependenciesProvider>,
				);

				const inputLocalisation = screen.getByRole('combobox', { name: 'Localisation Exemples : Paris, Béziers…' });
				const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });

				// WHEN
				await user.type(inputLocalisation, 'Par');
				const résultatLocalisationList = await screen.findAllByRole('option');

				// WHEN
				expect(localisationServiceMock.rechercherLocalisation).toHaveBeenCalledWith('Par');

				await user.click(résultatLocalisationList[1]);

				await user.click(buttonRechercher);

				// THEN
				expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('nomLocalisation=Paris') }, undefined, { scroll: false });
				expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('codePostalLocalisation=75001') }, undefined, { scroll: false });
				expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('typeLocalisation=COMMUNE') }, undefined, { scroll: false });
				expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('codeLocalisation=75101') }, undefined, { scroll: false });
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
						<FormulaireRechercheOffreEmploi/>
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
				expect(routerPush).toHaveBeenCalledWith({ query: 'grandDomaine=C&page=1' }, undefined, { scroll: false });
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
					<FormulaireRechercheOffreEmploi/>
				</DependenciesProvider>,
			);

			const button = screen.getByRole('combobox', { name: 'Domaines Exemple : Commerce, Immobilier…' });
			expect(button).toBeVisible();
		});

		describe('quand on filtre par type de contrat', () => {
			it('ajoute les types de contrat aux query params', async () => {
				const localisationServiceMock = aLocalisationService();
				const routerPush = jest.fn();
				const user = userEvent.setup();
				mockUseRouter({ push: routerPush });

				render(
					<DependenciesProvider localisationService={localisationServiceMock}>
						<FormulaireRechercheOffreEmploi/>
					</DependenciesProvider>,
				);

				const selectTypeContrat = screen.getByRole('combobox', { name: 'Types de contrats Exemple : CDI, CDD…' });
				await user.click(selectTypeContrat);

				const inputTypeDeContrat = screen.getByRole('option', { name: CONTRAT_CDD.libelléCourt });
				await user.click(inputTypeDeContrat);

				const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
				await user.click(buttonRechercher);

				expect(routerPush).toHaveBeenCalledWith({ query: 'typeDeContrats=CDD&page=1' }, undefined, { scroll: false });
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
						<FormulaireRechercheOffreEmploi/>
					</DependenciesProvider>,
				);

				const selectDomaine = screen.getByRole('combobox', { name: 'Domaines Exemple : Commerce, Immobilier…' });
				await user.click(selectDomaine);

				const optionDomaine = screen.getByRole('option', { name: référentielDomaineList[2].libelle });
				await user.click(optionDomaine);

				const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
				await user.click(buttonRechercher);

				expect(routerPush).toHaveBeenCalledWith({ query: `grandDomaine=${référentielDomaineList[2].code}&page=1` }, undefined, { scroll: false });
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
						<FormulaireRechercheOffreEmploi/>
					</DependenciesProvider>,
				);

				const button = screen.getByRole('combobox', { name: 'Niveau demandé Exemple : De 1 à 3 ans' });
				await user.click(button);

				const optionNiveauDemandé = screen.getByRole('option', { name: Offre.EXPÉRIENCE_DEBUTANT.libellé });
				await user.click(optionNiveauDemandé);

				const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
				await user.click(buttonRechercher);

				expect(routerPush).toHaveBeenCalledWith({ query: `experienceExigence=${Offre.EXPÉRIENCE_DEBUTANT.valeur}&page=1` }, undefined, { scroll: false });
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
						<FormulaireRechercheOffreEmploi/>
					</DependenciesProvider>,
				);

				const button = screen.getByRole('combobox', { name: 'Temps de travail Exemple : temps plein, temps partiel…' });
				await user.click(button);

				const optionTempsTravail = screen.getByRole('option',{ name: Offre.TEMPS_PLEIN.libellé });
				await user.click(optionTempsTravail);

				const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
				await user.click(buttonRechercher);

				expect(routerPush).toHaveBeenCalledWith({ query: `tempsDeTravail=${Offre.TEMPS_PLEIN.valeur}&page=1` }, undefined, { scroll: false });
			});
		});
	});

	describe('quand les query params sont présents', () => {
		describe('que le type de localisation est une commune', () => {
			it('rempli automatiquement les champs de recherche', () => {
				mockUseRouter({
					query: {
						codeLocalisation: '75110',
						codePostalLocalisation: '75010',
						experienceExigence: Offre.EXPÉRIENCE_DEBUTANT.valeur,
						grandDomaine: référentielDomaineList[0].code,
						motCle: 'Boulanger',
						nomLocalisation: 'Paris',
						tempsDeTravail: 'tempsPlein',
						typeDeContrats: 'CDD',
						typeLocalisation: 'COMMUNE',
					},
				});

				render(
					<DependenciesProvider localisationService={aLocalisationService()}>
						<FormulaireRechercheOffreEmploi/>
					</DependenciesProvider>,
				);

				const motCle = screen.getByRole('textbox', { name: /Métier, mot-clé/i });
				expect(motCle).toHaveValue('Boulanger');
				const localisation = screen.getByRole('combobox', { name: /Localisation/i });
				expect(localisation).toHaveValue('Paris (75010)');

				checkSelectValue('Types de contrats Exemple : CDI, CDD…', Offre.CONTRAT_CDD.libelléCourt);
				checkSelectValue('Temps de travail Exemple : temps plein, temps partiel…', Offre.TEMPS_PLEIN.libellé);
				checkSelectValue('Niveau demandé Exemple : De 1 à 3 ans', Offre.EXPÉRIENCE_DEBUTANT.libellé);
				checkSelectValue('Niveau demandé Exemple : De 1 à 3 ans', référentielDomaineList[0].libelle);
			});
		});
		describe('que le type de localisation est un département', () => {
			it('rempli automatiquement les champs de recherche', () => {
				mockUseRouter({
					query: {
						codeLocalisation: '75',
						experienceExigence: Offre.EXPÉRIENCE_DEBUTANT.valeur,
						grandDomaine: référentielDomaineList[0].code,
						motCle: 'Boulanger',
						nomLocalisation: 'Paris',
						tempsDeTravail: Offre.TEMPS_PLEIN.valeur,
						typeDeContrats: 'CDD',
						typeLocalisation: 'DEPARTEMENT',
					},
				});

				render(
					<DependenciesProvider localisationService={aLocalisationService()}>
						<FormulaireRechercheOffreEmploi/>
					</DependenciesProvider>,
				);

				const motCle = screen.getByRole('textbox', { name: /Métier, mot-clé/i });
				expect(motCle).toHaveValue('Boulanger');
				const localisation = screen.getByRole('combobox', { name: /Localisation/i });
				expect(localisation).toHaveValue('Paris (75)');

				checkSelectValue('Types de contrats Exemple : CDI, CDD…', Offre.CONTRAT_CDD.libelléCourt);
				checkSelectValue('Temps de travail Exemple : temps plein, temps partiel…', Offre.TEMPS_PLEIN.libellé);
				checkSelectValue('Niveau demandé Exemple : De 1 à 3 ans', Offre.EXPÉRIENCE_DEBUTANT.libellé);
				checkSelectValue('Domaines Exemple : Commerce, Immobilier…', référentielDomaineList[0].libelle);
			});
		});
	});
});

function checkSelectValue(fieldLabel: string, optionName: string): void {
	const combobox = screen.getByRole('combobox', { name: fieldLabel });
	const option = screen.getByRole('option', { hidden: true, name: optionName });
	expect(option).toHaveAttribute('aria-selected', 'true');
}
