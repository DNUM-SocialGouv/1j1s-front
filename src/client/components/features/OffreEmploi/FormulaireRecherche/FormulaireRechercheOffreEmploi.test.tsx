/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import {
	FormulaireRechercheOffreEmploi,
} from '~/client/components/features/OffreEmploi/FormulaireRecherche/FormulaireRechercheOffreEmploi';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockLargeScreen, mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { référentielDomaineList } from '~/client/domain/référentielDomaineList';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';
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
				mockUseRouter({ push: routerPush });

				render(
					<DependenciesProvider localisationService={localisationServiceMock}>
						<FormulaireRechercheOffreEmploi />
					</DependenciesProvider>,
				);

				const inputRechercheMotClé = screen.getByRole('textbox', { name: 'Métier, mot-clé' });
				fireEvent.change(inputRechercheMotClé, { target: { value: 'boulanger' } });
				const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });

				// WHEN
				fireEvent.click(buttonRechercher);

				// THEN
				expect(routerPush).toHaveBeenCalledWith({ query: 'motCle=boulanger&page=1' }, undefined, { shallow: true });
			});
		});

		describe('quand on recherche par type de contrat', () => {
			it('ajoute les types de contrat aux query params', async () => {
				// GIVEN
				const localisationServiceMock = aLocalisationService();
				const routerPush = jest.fn();
				mockUseRouter({ push: routerPush });

				render(
					<DependenciesProvider localisationService={localisationServiceMock}>
						<FormulaireRechercheOffreEmploi />
					</DependenciesProvider>,
				);

				const buttonFiltresRecherche = screen.getByRole('button', { name: 'Filtrer ma recherche' });

				// WHEN
				fireEvent.click(buttonFiltresRecherche);
				const modalComponent = screen.getByRole('dialog');
				const inputTypeDeContrat = within(modalComponent).getByRole('checkbox', { name: 'Mission intérimaire' });
				fireEvent.click(inputTypeDeContrat);

				expect(modalComponent).toBeInTheDocument();

				const buttonAppliquerFiltres = within(modalComponent).getByRole('button', { name: 'Appliquer les filtres' });

				// WHEN
				fireEvent.click(buttonAppliquerFiltres);

				// THEN
				expect(routerPush).toHaveBeenCalledWith({ query: 'typeDeContrats=MIS&page=1' }, undefined, { shallow: true });
			});
		});

		describe('quand on recherche par temps de travail', () => {
			it('ajoute les temps de travail aux query params', async () => {
				// GIVEN
				const localisationServiceMock = aLocalisationService();
				const routerPush = jest.fn();
				mockUseRouter({ push: routerPush });

				render(
					<DependenciesProvider localisationService={localisationServiceMock}>
						<FormulaireRechercheOffreEmploi />
					</DependenciesProvider>,
				);

				const buttonFiltresRecherche = screen.getByRole('button', { name: 'Filtrer ma recherche' });

				// WHEN
				fireEvent.click(buttonFiltresRecherche);
				const modalComponent = screen.getByRole('dialog');
				const inputTempsDeTravail = within(modalComponent).getByRole('radio', { name: 'Temps plein' });
				fireEvent.click(inputTempsDeTravail);

				expect(modalComponent).toBeInTheDocument();

				const buttonAppliquerFiltres = within(modalComponent).getByRole('button', { name: 'Appliquer les filtres' });

				// WHEN
				fireEvent.click(buttonAppliquerFiltres);

				// THEN
				expect(routerPush).toHaveBeenCalledWith({ query: 'tempsDeTravail=tempsPlein&page=1' }, undefined, { shallow: true });
			});
		});

		describe('quand on recherche par niveau demandé', () => {
			it('ajoute le niveau demandé aux query params', async () => {
				// GIVEN
				const localisationServiceMock = aLocalisationService();
				const routerPush = jest.fn();
				mockUseRouter({ push: routerPush });

				render(
					<DependenciesProvider localisationService={localisationServiceMock}>
						<FormulaireRechercheOffreEmploi />
					</DependenciesProvider>,
				);

				const buttonFiltresRecherche = screen.getByRole('button', { name: 'Filtrer ma recherche' });

				// WHEN
				fireEvent.click(buttonFiltresRecherche);
				const modalComponent = screen.getByRole('dialog');
				const inputExperienceExigence = within(modalComponent).getByRole('radio', { name: 'Moins de 1 an' });
				fireEvent.click(inputExperienceExigence);

				expect(modalComponent).toBeInTheDocument();

				const buttonAppliquerFiltres = within(modalComponent).getByRole('button', { name: 'Appliquer les filtres' });

				// WHEN
				fireEvent.click(buttonAppliquerFiltres);

				// THEN
				expect(routerPush).toHaveBeenCalledWith({ query: 'experienceExigence=D&page=1' }, undefined, { shallow: true });
			});
		});

		describe('quand on recherche par localisation', () => {
			it('ajoute la localisation aux query params', async () => {
				// GIVEN
				const localisationServiceMock = aLocalisationService(aLocalisationListWithCommuneAndDépartement());
				const user = userEvent.setup();
				const routerPush = jest.fn();
				mockUseRouter({ push: routerPush });
				render(
					<DependenciesProvider localisationService={localisationServiceMock}>
						<FormulaireRechercheOffreEmploi />
					</DependenciesProvider>,
				);

				const inputLocalisation = screen.getByRole('textbox', { name: 'Localisation' });
				const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });

				// WHEN
				await user.type(inputLocalisation, 'Par');
				const résultatsLocalisation = await screen.findByTestId('RésultatsLocalisation');

				// WHEN
				expect(localisationServiceMock.rechercherLocalisation).toHaveBeenCalledWith('Par');
				const résultatLocalisationList = within(résultatsLocalisation).getAllByRole('option');

				fireEvent.click(résultatLocalisationList[1]);

				fireEvent.click(buttonRechercher);

				// THEN
				expect(routerPush).toHaveBeenCalledWith({ query: 'libelleLocalisation=Paris+%2875001%29&typeLocalisation=COMMUNE&codeLocalisation=75101&page=1' }, undefined, { shallow: true });
			});
		});

		describe('quand on recherche par domaine', () => {
			it('ajoute les domaines aux query params', async () => {
				// GIVEN
				const localisationServiceMock = aLocalisationService();
				const routerPush = jest.fn();
				mockUseRouter({ push: routerPush });

				render(
					<DependenciesProvider localisationService={localisationServiceMock}>
						<FormulaireRechercheOffreEmploi />
					</DependenciesProvider>,
				);

				const buttonFiltresRecherche = screen.getByRole('button', { name: 'Filtrer ma recherche' });

				// WHEN
				fireEvent.click(buttonFiltresRecherche);
				const modalComponent = screen.getByRole('dialog');
				const inputDomaine = within(modalComponent).getByRole('checkbox', { name: 'Banque / Assurance' });

				fireEvent.click(inputDomaine);

				expect(modalComponent).toBeInTheDocument();

				const buttonAppliquerFiltres = within(modalComponent).getByRole('button', { name: 'Appliquer les filtres' });

				// WHEN
				fireEvent.click(buttonAppliquerFiltres);

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
				mockUseRouter({ push: routerPush });

				render(
					<DependenciesProvider localisationService={localisationServiceMock}>
						<FormulaireRechercheOffreEmploi />
					</DependenciesProvider>,
				);
        
				const button = screen.getByRole('button', { name: 'Types de contrats' });
				fireEvent.click(button);

				const typeDeContratList = await screen.findByRole('listbox');

				const inputTypeDeContrat = within(typeDeContratList).getAllByRole('checkbox');
				fireEvent.click(inputTypeDeContrat[0]);

				const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
				fireEvent.click(buttonRechercher);
        
				expect(routerPush).toHaveBeenCalledWith({ query: 'typeDeContrats=CDD&page=1' }, undefined, { shallow: true });
			});
		});

		describe('quand on filtre par domaine', () => {
			it('ajoute le domaine sélectionné aux query params', async () => {
				const localisationServiceMock = aLocalisationService();
				const routerPush = jest.fn();
				mockUseRouter({ push: routerPush });

				render(
					<DependenciesProvider localisationService={localisationServiceMock}>
						<FormulaireRechercheOffreEmploi />
					</DependenciesProvider>,
				);

				const button = screen.getByRole('button', { name: 'Domaines' });
				fireEvent.click(button);

				const domaineList = await screen.findByRole('listbox');

				const inputDomaine = within(domaineList).getAllByRole('checkbox');
				fireEvent.click(inputDomaine[2]);

				const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
				fireEvent.click(buttonRechercher);

				expect(routerPush).toHaveBeenCalledWith({ query: 'grandDomaine=C&page=1' }, undefined, { shallow: true });
			});
		});

		describe('quand on filtre par niveau demandé', () => {
			it('ajoute le niveau demandé sélectionné aux query params', async () => {
				const localisationServiceMock = aLocalisationService();
				const routerPush = jest.fn();
				mockUseRouter({ push: routerPush });

				render(
					<DependenciesProvider localisationService={localisationServiceMock}>
						<FormulaireRechercheOffreEmploi />
					</DependenciesProvider>,
				);

				const button = screen.getByRole('button', { name: 'Niveau demandé' });
				fireEvent.click(button);

				const niveauDemandéList = await screen.findByRole('listbox');

				const inputNiveauDemandé = within(niveauDemandéList).getAllByRole('radio');
				fireEvent.click(inputNiveauDemandé[0]);

				const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
				fireEvent.click(buttonRechercher);

				expect(routerPush).toHaveBeenCalledWith({ query: 'experienceExigence=D&page=1' }, undefined, { shallow: true });
			});
		});

		describe('quand on filtre par temps de travail', () => {
			it('ajoute les temps de travail aux query params', async () => {
				const localisationServiceMock = aLocalisationService();
				const routerPush = jest.fn();
				mockUseRouter({ push: routerPush });

				render(
					<DependenciesProvider localisationService={localisationServiceMock}>
						<FormulaireRechercheOffreEmploi />
					</DependenciesProvider>,
				);

				const button = screen.getByRole('button', { name: 'Temps de travail' });
				fireEvent.click(button);

				const tempsDeTravailList = await screen.findByRole('listbox');

				const inputTempsDeTravail = within(tempsDeTravailList).getAllByRole('radio');
				fireEvent.click(inputTempsDeTravail[0]);

				const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
				fireEvent.click(buttonRechercher);

				expect(routerPush).toHaveBeenCalledWith({ query: 'tempsDeTravail=tempsPlein&page=1' }, undefined, { shallow: true });
			});
		});
	});

	it('rempli automatiquement les champs de recherche quand query params présents', () => {
		mockUseRouter({ query: {
			codeLocalisation: '75',
			experienceExigence: NiveauRequis.NIVEAU_3,
			grandDomaine: référentielDomaineList[0].code,
			libelleLocalisation: 'Paris (75)',
			motCle: 'Boulanger',
			tempsDeTravail: 'tempsPlein',
			typeDeContrats: 'CDD',
			typeLocalisation: 'Commune',
		} });

		render(
			<DependenciesProvider localisationService={aLocalisationService()}>
				<FormulaireRechercheOffreEmploi />
			</DependenciesProvider>,
		);

		const motCle = screen.getByRole('textbox', { name: /Métier, mot-clé/i });
		expect(motCle).toHaveValue('Boulanger');
		const localisation = screen.getByRole('textbox', { name: /Localisation/i });
		expect(localisation).toHaveValue('Paris (75)');

		// FIXME (GAFI 17-03-2023): Le composant utilisé pour ces champs ne génère pas un HTML valide et cause des problèmes
		//	de test-ids
		/* eslint-disable testing-library/no-node-access */
		function checkSelectValue(fieldLabel: string, expectedValue: string): void {
			const labelElement = screen.getByText(fieldLabel);
			const fieldId = labelElement.getAttribute('for');
			const field = fieldId && document.getElementById(fieldId);
			expect(field).toHaveValue(expectedValue);
		}
		checkSelectValue('Types de contrats', 'CDD');
		checkSelectValue('Temps de travail', 'tempsPlein');
		checkSelectValue('Niveau demandé', NiveauRequis.NIVEAU_3);
		checkSelectValue('Domaines', référentielDomaineList[0].code);
		/* eslint-enable testing-library/no-node-access */
	});
});
