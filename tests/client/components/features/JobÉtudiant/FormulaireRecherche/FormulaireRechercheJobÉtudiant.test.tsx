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
        const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });

        // WHEN
        fireEvent.click(buttonRechercher);

        // THEN
        expect(routerPush).toHaveBeenCalledWith({ query: 'motCle=boulanger&page=1' }, undefined, { shallow: true });
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
        const containerFiltreTypeDeContrats = within(filtreRechercheMobile).getByRole('group', { name: 'Domaine' });
        const inputDomaine = within(containerFiltreTypeDeContrats).getAllByRole('checkbox');
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
  });
});
