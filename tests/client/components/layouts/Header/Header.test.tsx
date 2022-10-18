/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMockRouter, mockUseRouter } from '@tests/client/useRouter.mock';
import { mockLargeScreen, mockSmallScreen } from '@tests/client/window.mock';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import { Header } from '~/client/components/layouts/Header/Header';
import resetAllMocks = jest.resetAllMocks;

describe('Header', () => {
  describe('Sur desktop', () => {
    beforeEach(() => {
      mockLargeScreen();
    });
    afterEach(() => {
      resetAllMocks();
    });
    it('affiche le composant Header', async () => {
      mockUseRouter({ pathname: '/' });
      render(<Header/>);

      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    describe('quand on ouvre la navigation', () => {
      it('affiche la navigation', async () => {
        mockUseRouter({ pathname: '/' });
        render(<Header/>);

        const header = screen.getByRole('banner');
        const openNavButton = within(header).getByRole('button', { name: 'Offres' });
        fireEvent.click(openNavButton);
        const navigation = screen.getByRole('navigation');

        expect(navigation).toBeInTheDocument();
      });
    });

    describe('quand la page courante est "Accueil"', () => {
      it('affiche le composant Header avec la navigation active sur "Accueil"', async () => {
        mockUseRouter({ pathname: '/' });
        render(<Header/>);

        const navigation = screen.getByRole('navigation');
        const accueilNavItem = within(navigation).getByText('Accueil');
        const offresNavItem = within(navigation).getByText('Offres');


        expect(accueilNavItem).toHaveAttribute('aria-current', 'true');
        expect(offresNavItem).toHaveAttribute('aria-current', 'false');
      });
    });

    describe('quand la page courante est "Emplois"', () => {
      it('affiche le composant Header avec la navigation active sur "Emplois"', async () => {
        mockUseRouter({ pathname: '/emplois' });
        render(<Header/>);

        const navigation = screen.getByRole('navigation');
        const accueilNavItem = within(navigation).getByText('Accueil');
        const offresNavItem = within(navigation).getByText('Offres');

        userEvent.click(offresNavItem);

        const emploisNavItem = within(navigation).getByText('Emplois');

        expect(accueilNavItem).toHaveAttribute('aria-current', 'false');
        expect(emploisNavItem).toHaveAttribute('aria-current', 'true');
      });
    });

    describe('quand la page courante est "Je deviens mentor"', () => {
      it('affiche le composant Header avec la navigation active sur "Je deviens mentor"', async () => {
        mockUseRouter({ pathname: '/je-deviens-mentor' });
        render(<Header/>);

        const navigation = screen.getByRole('navigation');
        const accueilNavItem = within(navigation).getByText('Accueil');
        const lesNavItem = within(navigation).getAllByText('Je suis employeur').at(0);

        fireEvent.click(lesNavItem);

        const jeDeviensMentorNavItem = within(navigation).getByText('Je deviens mentor');

        expect(accueilNavItem).toHaveAttribute('aria-current', 'false');
        // eslint-disable-next-line testing-library/no-node-access
        expect(jeDeviensMentorNavItem.parentNode).toHaveAttribute('aria-current', 'true');
      });
    });
  });

  describe('Sur mobile', () => {
    beforeEach(() => {
      mockSmallScreen();
    });
    afterEach(() => {
      resetAllMocks();
    });
    describe('Par défaut', () => {
      it('n\'affiche pas la navigation mobile', () => {
        mockUseRouter({ pathname: '/' });
        render(<Header/>);
        const menu = screen.queryByRole('navigation');
        expect(menu).not.toBeInTheDocument();
      });
    });
    describe('Au clic sur le bouton menu', () => {
      it('ouvre le menu le navigation mobile', () => {
        mockUseRouter({ pathname: '/' });
        render(<Header/>);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        const menu = screen.getByRole('navigation');
        expect(menu).toBeInTheDocument();
      });

      it('positionne le menu dans le bon sous menu de niveau 1', () => {
        mockUseRouter({ pathname: '/decouvrir-les-metiers' });
        render(<Header/>);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        const menu = screen.getByRole('navigation');
        expect(menu).toBeInTheDocument();
        expect(screen.getByText('Découvrir les métiers')).toBeInTheDocument();
      });

      it('positionne le menu dans le bon sous menu de niveau 2', () => {
        mockUseRouter({ pathname: '/je-deviens-mentor' });
        render(<Header/>);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        const menu = screen.getByRole('navigation');
        expect(menu).toBeInTheDocument();
        expect(screen.getByText('Je deviens mentor')).toBeInTheDocument();
      });
    });
    describe('Au clic sur un item du menu', () => {
      it('ferme le menu de navigation', () => {
        mockUseRouter({ pathname: '/' });
        const router = createMockRouter({ pathname: '/' });
        render(
          <RouterContext.Provider value={router}>
            <Header/>
          </RouterContext.Provider>,
        );
        const button = screen.getByRole('button');
        fireEvent.click(button);
        const menu = screen.getByRole('navigation');
        const item = within(menu).getByRole('link');
        fireEvent.click(item);
        expect(menu).not.toBeInTheDocument();
      });
    });
    describe('Au clic sur le menu employeur', () => {
      it('affiche les menus en profondeur', async () => {
        // Given
        mockUseRouter({ pathname: '/' });
        const router = createMockRouter({ pathname: '/' });
        render(
          <RouterContext.Provider value={router}>
            <Header/>
          </RouterContext.Provider>,
        );
        // When
        await userEvent.click(screen.getByRole('button'));
        const sectionEmployeur = screen.getByText('Je suis employeur');
        await userEvent.click(sectionEmployeur);
        const subItem = within(screen.getByRole('menu')).getByText('Recruter et agir pour les jeunes');
        await userEvent.click(subItem);
        // Then
        expect(screen.queryByText('Je suis employeur')).not.toBeInTheDocument();
        expect(sectionEmployeur).toHaveTextContent('Recruter et agir pour les jeunes');
      });
    });
  });
});
