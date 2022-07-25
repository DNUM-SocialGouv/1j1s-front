/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockLargeScreen, mockSmallScreen } from '@tests/client/window.mock';
import { aLocalisationService } from '@tests/fixtures/client/services/localisationService.fixture';
import { aLocalisationListWithCommuneAndDépartement } from '@tests/fixtures/domain/localisation.fixture';
import React from 'react';

import {
  FormulaireRechercheOffreEmploi,
} from '~/client/components/features/OffreEmploi/FormulaireRecherche/FormulaireRechercheOffreEmploi';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';

describe('FormulaireRechercheOffreEmploi', () => {
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
        const filtreRechercheMobile = await screen.findByTestId('FiltreRechercheMobile');
        const containerFiltreTypeDeContrats = within(filtreRechercheMobile).getByRole('group', { name: 'Type de contrat' });
        const inputTypeDeContrat = within(containerFiltreTypeDeContrats).getAllByRole('checkbox');
        fireEvent.click(inputTypeDeContrat[0]);
        fireEvent.click(inputTypeDeContrat[2]);
        fireEvent.click(inputTypeDeContrat[0]);

        expect(filtreRechercheMobile).toBeInTheDocument();

        const buttonAppliquerFiltres = within(filtreRechercheMobile).getByRole('button', { name: 'Appliquer les filtres' });

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
        const filtreRechercheMobile = await screen.findByTestId('FiltreRechercheMobile');
        const containerFiltreTempsDeTravail = within(filtreRechercheMobile).getByRole('group', { name: 'Temps de travail' });
        const inputTempsDeTravail = within(containerFiltreTempsDeTravail).getAllByRole('radio');
        fireEvent.click(inputTempsDeTravail[0]);

        expect(filtreRechercheMobile).toBeInTheDocument();

        const buttonAppliquerFiltres = within(filtreRechercheMobile).getByRole('button', { name: 'Appliquer les filtres' });

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
        const filtreRechercheMobile = await screen.findByTestId('FiltreRechercheMobile');
        const containerFiltreTempsDeTravail = within(filtreRechercheMobile).getByRole('group', { name: 'Niveau demandé' });
        const inputExperienceExigence = within(containerFiltreTempsDeTravail).getAllByRole('radio');
        fireEvent.click(inputExperienceExigence[0]);

        expect(filtreRechercheMobile).toBeInTheDocument();

        const buttonAppliquerFiltres = within(filtreRechercheMobile).getByRole('button', { name: 'Appliquer les filtres' });

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
        await user.type(inputLocalisation, 'Pa');
        const résultatsLocalisation = await screen.findByTestId('RésultatsLocalisation');

        // WHEN
        expect(localisationServiceMock.rechercherLocalisation).toHaveBeenCalledWith('Pa');
        const résultatLocalisationList = within(résultatsLocalisation).getAllByRole('option');

        fireEvent.click(résultatLocalisationList[1]);

        fireEvent.click(buttonRechercher);

        // THEN
        expect(routerPush).toHaveBeenCalledWith({ query: 'libelleLocalisation=Paris+%2875001%29&typeLocalisation=COMMUNE&codeLocalisation=75001&page=1' }, undefined, { shallow: true });
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
        const filtreRechercheMobile = await screen.findByTestId('FiltreRechercheMobile');
        const containerFiltreDomaine = within(filtreRechercheMobile).getByRole('group', { name: 'Domaine' });
        const inputDomaine = within(containerFiltreDomaine).getAllByRole('checkbox');
        fireEvent.click(inputDomaine[0]);
        fireEvent.click(inputDomaine[2]);
        fireEvent.click(inputDomaine[0]);

        expect(filtreRechercheMobile).toBeInTheDocument();

        const buttonAppliquerFiltres = within(filtreRechercheMobile).getByRole('button', { name: 'Appliquer les filtres' });

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
      
      const filtreRechercheDesktop = await screen.findByTestId('FiltreRechercheDesktop');

      // THEN
      await waitFor(() => {
        expect(filtreRechercheDesktop).toBeInTheDocument();
      });
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
        
        const button = screen.getByRole('button', { name: 'Type de contrat' });
        fireEvent.click(button);

        const typeDeContratList = await screen.findByRole('listbox');

        await waitFor(() => {
          expect(typeDeContratList).toBeInTheDocument();
        });

        const inputTypeDeContrat = within(typeDeContratList).getAllByRole('option');
        fireEvent.click(inputTypeDeContrat[0]);

        const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
        fireEvent.click(buttonRechercher);
        
        expect(routerPush).toHaveBeenCalledWith({ query: 'typeDeContrats=CDD&page=1' }, undefined, { shallow: true });
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

        const tempsDeTravailList = await screen.findByTestId('Select-tempsDeTravail');

        await waitFor(() => {
          expect(tempsDeTravailList).toBeInTheDocument();
        });

        const inputTempsDeTravail = within(tempsDeTravailList).getAllByRole('option');
        fireEvent.click(inputTempsDeTravail[0]);

        const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
        fireEvent.click(buttonRechercher);

        expect(routerPush).toHaveBeenCalledWith({ query: 'tempsDeTravail=tempsPlein&page=1' }, undefined, { shallow: true });
      });
    });
  });
});
