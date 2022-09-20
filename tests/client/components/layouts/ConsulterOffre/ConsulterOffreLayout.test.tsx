/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';

import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';

describe('ConsulterOffreLayout', () => {
  describe('quand l’utilisateur clique sur le bouton retour', () => {
    describe('et qu’il vient de la page de recherche d’emploi sans paramètre', () => {
      it('doit retourner sur la page emploi sans paramètres', async () => {
        const routerBack = jest.fn();
        jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('emplois');
        mockUseRouter({
          back: routerBack,
          query: {
            from: '/emplois',
            params: '',
          },
        });
        render(<ConsulterOffreLayout><></></ConsulterOffreLayout>);

        fireEvent.click(screen.getByRole('button', { name: 'Retour vers la page emplois' }));

        await waitFor(() => expect(routerBack).toHaveBeenCalled());
      });
    });

    describe('et qu’il vient de la page de recherche d’emploi avec des paramètres', () => {
      it('doit retourner sur la page emploi avec des paramètres', async () => {
        const routerBack = jest.fn();
        jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('emplois');
        mockUseRouter({
          back: routerBack,
          query: {
            from: '/emplois',
            params: 'typeDeContrats=CDD&tempsDeTravail=tempsPlein&experienceExigence=D&page=1',
          },
        });
        render(<ConsulterOffreLayout><></></ConsulterOffreLayout>);

        fireEvent.click(screen.getByRole('button', { name: 'Retour vers la page emplois' }));

        await waitFor(() => expect(routerBack).toHaveBeenCalled());
      });
    });

    describe('quand il n’y a pas d’url de retour', () => {
      it('n’affiche pas le bouton de retour', () => {
        const routerBack = jest.fn();
        jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
        mockUseRouter({
          back: routerBack,
          query: {},
        });
        render(<ConsulterOffreLayout><></></ConsulterOffreLayout>);

        expect(screen.queryByRole('button', { name: 'Retour vers la page' })).not.toBeInTheDocument();
      });
    });
  });
});
