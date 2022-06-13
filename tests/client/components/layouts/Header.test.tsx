/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen, within } from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';

import { Header } from '~/client/components/layouts/Header';

describe('Header', () => {
  it('affiche le composant Header', async () => {
    mockUseRouter({ pathname: '/' });
    render(<Header/>);

    const header = screen.getByRole('banner');
    await within(header).findByTestId('navLink_/');
    expect(header).toBeInTheDocument();
  });

  describe('quand on ouvre la navigation', () => {
    it('affiche la navigation', async () => {
      mockUseRouter({ pathname: '/' });
      render(<Header/>);

      const header = screen.getByRole('banner');
      await within(header).findByTestId('navLink_/');
      const openNavButton = within(header).getAllByLabelText('ouvrir la navigation')[0];
      fireEvent.click(openNavButton);
      const navigation = screen.getByRole('navigation');

      expect(navigation).toBeInTheDocument();
    });
  });

  describe('quand la page courante est "Accueil"', () => {
    it('affiche le composant Header avec la navigation active sur "Accueil"',  async() => {
      mockUseRouter({ pathname: '/' });
      render(<Header/>);

      const header = screen.getByRole('banner');
      await within(header).findByTestId('navLink_/');
      const openNavButton = within(header).getAllByLabelText('ouvrir la navigation')[0];
      fireEvent.click(openNavButton);
      const navigation = screen.getByRole('navigation');
      const accueilNavItem = within(navigation).getByText('Accueil');
      const emploisNavItem = within(navigation).getByText('Emplois');

      expect(accueilNavItem).toHaveAttribute('aria-current', 'page');
      expect(emploisNavItem).not.toHaveAttribute('aria-current');
    });
  });

  describe('quand la page courante est "Emplois"', () => {
    it('affiche le composant Header avec la navigation active sur "Emplois"', async () => {
      mockUseRouter({ pathname: '/emplois' });
      render(<Header/>);

      const header = screen.getByRole('banner');
      await within(header).findByTestId('navLink_/');
      const openNavButton = within(header).getAllByLabelText('ouvrir la navigation')[0];
      fireEvent.click(openNavButton);
      const navigation = screen.getByRole('navigation');
      const accueilNavItem = within(navigation).getByText('Accueil');
      const emploisNavItem = within(navigation).getByText('Emplois');

      expect(accueilNavItem).not.toHaveAttribute('aria-current');
      expect(emploisNavItem).toHaveAttribute('aria-current', 'page');
    });
  });
});
