/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockLargeScreen, mockSmallScreen } from '@tests/client/window.mock';
import { aLocalisationService } from '@tests/fixtures/client/services/localisationService.fixture';
import { aLocalisationListWithCommuneAndDépartement } from '@tests/fixtures/domain/localisation.fixture';
import React from 'react';

import {
  FormulaireRechercheJobÉtudiant,
} from '~/client/components/features/JobÉtudiant/FormulaireRecherche/FormulaireRechercheJobÉtudiant';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';

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
        mockUseRouter({ push: routerPush });

        render(
          <DependenciesProvider localisationService={localisationServiceMock}>
            <FormulaireRechercheJobÉtudiant />
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

    describe('quand on recherche par localisation', () => {
      it('ajoute la localisation aux query params', async () => {
        // GIVEN
        const localisationServiceMock = aLocalisationService(aLocalisationListWithCommuneAndDépartement());
        const user = userEvent.setup();
        const routerPush = jest.fn();
        mockUseRouter({ push: routerPush });
        render(
          <DependenciesProvider localisationService={localisationServiceMock}>
            <FormulaireRechercheJobÉtudiant />
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
        expect(routerPush).toHaveBeenCalledWith({ query: 'libelleLocalisation=Paris+%2875001%29&typeLocalisation=COMMUNE&codeLocalisation=75101&page=1' }, undefined, { shallow: true });
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

      const button = screen.getByRole('button', { name: 'Domaine' });
      expect(button).toBeInTheDocument();

    });

    describe('quand on filtre par domaine', () => {
      it('ajoute le domaine sélectionné aux query params', async () => {
        const localisationServiceMock = aLocalisationService();
        const routerPush = jest.fn();
        mockUseRouter({ push: routerPush });

        render(
          <DependenciesProvider localisationService={localisationServiceMock}>
            <FormulaireRechercheJobÉtudiant />
          </DependenciesProvider>,
        );

        const button = screen.getByRole('button', { name: 'Domaine' });
        fireEvent.click(button);

        const domaineList = await screen.findByRole('listbox');

        const inputDomaine = within(domaineList).getAllByRole('checkbox');
        fireEvent.click(inputDomaine[2]);

        const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
        fireEvent.click(buttonRechercher);

        expect(routerPush).toHaveBeenCalledWith({ query: 'grandDomaine=C&page=1' }, undefined, { shallow: true });
      });
    });
  });
});
