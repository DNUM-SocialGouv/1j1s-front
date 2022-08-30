/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockSmallScreen } from '@tests/client/window.mock';
import {
  aFicheMetierService,
  aFicheMetierServiceWithPagination,
} from '@tests/fixtures/client/services/ficheMetierService.fixture';
import { aFicheMetierResult } from '@tests/fixtures/domain/ficheMetier.fixture';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import RechercherFicheMetierPage from '~/pages/decouvrir-les-metiers';

describe('DécouvrirLesMétiersRechercher', () => {
  beforeEach(() => {
    mockSmallScreen();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Lorsque l\'utilisateur arrive sur la page', () => {
    it('affiche un formulaire de recherche', async () => {
      mockUseRouter({});
      const ficheMetierService = aFicheMetierService();
      render(
        <DependenciesProvider ficheMetierService={ficheMetierService}>
          <RechercherFicheMetierPage />
        </DependenciesProvider>,
      );

      const form = await screen.findByRole('form');
      const inputMotCle = await screen.findByRole('textbox', { name: 'Indiquez le métier que vous recherchez' });

      expect(form).toBeInTheDocument();
      expect(inputMotCle).toBeInTheDocument();
    });
    it('affiche une liste résultat non filtrée', async () => {
      const ficheMetierService = aFicheMetierService();
      mockUseRouter({});
      render(
        <DependenciesProvider ficheMetierService={ficheMetierService}>
          <RechercherFicheMetierPage />
        </DependenciesProvider>,
      );

      const resultList = await screen.findByRole('list');
      const items = await screen.findAllByRole('listitem');

      expect(resultList).toBeInTheDocument();
      expect(items.length).toEqual(aFicheMetierResult().results.length);
    });
    describe('si tous les résultats ne sont pas affichés sur une seule page', () => {
      it('affiche une pagination', async () => {
        const ficheMetierService = aFicheMetierServiceWithPagination();
        mockUseRouter({});
        render(
          <DependenciesProvider ficheMetierService={ficheMetierService}>
            <RechercherFicheMetierPage />
          </DependenciesProvider>,
        );

        const lists = await screen.findAllByRole('list');
        const pagination = lists[1];

        expect(pagination).toBeInTheDocument();
      });
    });
  });
  describe('Lorsque l\'utilisateur effectue une recherche par mot clé', () => {
    it('ajoute les paramètres de recherche dans l\'url', async () => {
      const ficheMetierService = aFicheMetierService();
      const routerPush = jest.fn();
      mockUseRouter({ push: routerPush });
      render(
        <DependenciesProvider ficheMetierService={ficheMetierService}>
          <RechercherFicheMetierPage />
        </DependenciesProvider>,
      );

      const inputMotCle = await screen.findByRole('textbox', { name: 'Indiquez le métier que vous recherchez' });
      const submitButton = await screen.findByRole('button');

      fireEvent.change(inputMotCle, { target: { value: 'test' } });
      fireEvent.click(submitButton);

      await waitFor(() => expect(routerPush).toHaveBeenCalledWith({ query: 'motCle=test&page=1' }, undefined, { shallow: true }));
    });
  });
});
