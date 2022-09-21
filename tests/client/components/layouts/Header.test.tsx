/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen, within } from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockLargeScreen } from '@tests/client/window.mock';

import { Header } from '~/client/components/layouts/Header/Header';

describe('Header', () => {
  beforeEach(() => {
    mockLargeScreen();
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
    it('affiche le composant Header avec la navigation active sur "Accueil"',  async () => {
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

      fireEvent.click(offresNavItem);

      const emploisNavItem = within(navigation).getByText('Emplois');

      expect(accueilNavItem).toHaveAttribute('aria-current', 'false');
      expect(emploisNavItem).toHaveAttribute('aria-current', 'true');
    });
  });
});
