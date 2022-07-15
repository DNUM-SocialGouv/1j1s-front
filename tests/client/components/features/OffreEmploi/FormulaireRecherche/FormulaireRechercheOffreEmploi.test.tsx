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

        const containerRechercheMotClé = screen.getByTestId('InputRechercheMotClé');
        const inputRechercheMotClé = within(containerRechercheMotClé).getByRole('textbox');
        fireEvent.change(inputRechercheMotClé, { target: { value: 'boulanger' } });
        const buttonRechercher = screen.getByTestId('ButtonRechercher');

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

        const buttonFiltresRecherche = screen.getByTestId('ButtonFiltrerRecherche');

        // WHEN
        fireEvent.click(buttonFiltresRecherche);
        const filtreRechercheMobile = await screen.findByTestId('FiltreRechercheMobile');
        const containerFiltreTypeDeContrats = within(filtreRechercheMobile).getByRole('group', { name: 'Type de contrat' });
        const inputTypeDeContrat = within(containerFiltreTypeDeContrats).getAllByRole('checkbox');
        fireEvent.click(inputTypeDeContrat[0]);
        fireEvent.click(inputTypeDeContrat[2]);
        fireEvent.click(inputTypeDeContrat[0]);

        expect(filtreRechercheMobile).toBeInTheDocument();

        const buttonAppliquerFiltres = within(filtreRechercheMobile).getByTestId('ButtonAppliquerFiltres');

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

        const buttonFiltresRecherche = screen.getByTestId('ButtonFiltrerRecherche');

        // WHEN
        fireEvent.click(buttonFiltresRecherche);
        const filtreRechercheMobile = await screen.findByTestId('FiltreRechercheMobile');
        const containerFiltreTempsDeTravail = within(filtreRechercheMobile).getByTestId('FiltreTempsDeTravail');
        const inputTempsDeTravail = within(containerFiltreTempsDeTravail).getAllByRole('radio');
        fireEvent.click(inputTempsDeTravail[0]);

        expect(filtreRechercheMobile).toBeInTheDocument();

        const buttonAppliquerFiltres = within(filtreRechercheMobile).getByTestId('ButtonAppliquerFiltres');

        // WHEN
        fireEvent.click(buttonAppliquerFiltres);

        // THEN
        expect(routerPush).toHaveBeenCalledWith({ query: 'tempsDeTravail=tempsPlein&page=1' }, undefined, { shallow: true });
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

        const inputLocalisation = screen.getByTestId('InputLocalisation');
        const buttonRechercher = screen.getByTestId('ButtonRechercher');

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

        const buttonFiltresRecherche = screen.getByTestId('ButtonFiltrerRecherche');

        // WHEN
        fireEvent.click(buttonFiltresRecherche);
        const filtreRechercheMobile = await screen.findByTestId('FiltreRechercheMobile');
        const containerFiltreDomaine = within(filtreRechercheMobile).getByRole('group', { name: 'Domaine' });
        const inputDomaine = within(containerFiltreDomaine).getAllByRole('checkbox');
        fireEvent.click(inputDomaine[0]);
        fireEvent.click(inputDomaine[2]);
        fireEvent.click(inputDomaine[0]);

        expect(filtreRechercheMobile).toBeInTheDocument();

        const buttonAppliquerFiltres = within(filtreRechercheMobile).getByTestId('ButtonAppliquerFiltres');

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
        
        const button = await screen.findByTestId('SelectButton-Type de contrat');
        fireEvent.click(button);

        const typeDeContratList = await screen.findByTestId('OptionList');

        await waitFor(() => {
          expect(typeDeContratList).toBeInTheDocument();
        });

        const inputTypeDeContrat = within(typeDeContratList).getAllByRole('option');
        fireEvent.click(inputTypeDeContrat[0]);

        const buttonRechercher = screen.getByTestId('ButtonRechercher');
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

        const button = await screen.findByTestId('SelectButton-Temps de travail');
        fireEvent.click(button);

        const typeDeContratList = await screen.findByTestId('OptionList');

        await waitFor(() => {
          expect(typeDeContratList).toBeInTheDocument();
        });

        const inputTypeDeContrat = within(typeDeContratList).getAllByRole('option');
        fireEvent.click(inputTypeDeContrat[0]);

        const buttonRechercher = screen.getByTestId('ButtonRechercher');
        fireEvent.click(buttonRechercher);

        expect(routerPush).toHaveBeenCalledWith({ query: 'tempsDeTravail=tempsPlein&page=1' }, undefined, { shallow: true });
      });
    });
  });
});
