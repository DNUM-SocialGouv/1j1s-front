/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockLargeScreen, mockSmallScreen } from '@tests/client/window.mock';
import React from 'react';

import { Pagination } from '~/client/components/ui/Pagination/Pagination';

describe('Pagination', () => {
  describe('quand il y a 100 résultats et 25 résultat par page à afficher', () => {
    describe('doit désactiver la return to first page et Page précédente', () => {
      it('et les 5 premières pages, Page suivante et le go to last page', async () => {
        mockLargeScreen();
        mockUseRouter({});
        render(
          <Pagination numberOfResult={100} numberOfResultPerPage={25} />,
        );

        expect(screen.getByRole('link', { name: 'returnToFirstPage' }).getAttribute('aria-disabled')).toBe('true');
        expect(screen.getByRole('link', { name: 'returnToPreviousPage Page précédente' }).getAttribute('aria-disabled')).toBe('true');
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
        expect(screen.queryByText('5')).not.toBeInTheDocument();
        expect(screen.queryByText('…')).not.toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Page suivante goToNextPage' }).getAttribute('aria-disabled')).toBe('false');
        expect(screen.getByRole('link', { name: 'goToLastPage' }).getAttribute('aria-disabled')).toBe('false');
      });
    });
  });

  describe('quand il y a 100 résultats et 1O résultat par page à afficher', () => {
    describe('doit désactiver la return to first page et Page précédente', () => {
      it('doit afficher les 4 premières pages, une ellipse, la page 16, Page suivante et le go to last page', () => {
        mockLargeScreen();
        mockUseRouter({});
        render(
          <Pagination numberOfResult={470} numberOfResultPerPage={30} />,
        );

        expect(screen.getByRole('link', { name: 'returnToFirstPage' }).getAttribute('aria-disabled')).toBe('true');
        expect(screen.getByRole('link', { name: 'returnToPreviousPage Page précédente' }).getAttribute('aria-disabled')).toBe('true');
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.queryByText('6')).not.toBeInTheDocument();
        expect(screen.getByText('…')).toBeInTheDocument();
        expect(screen.getByText('16')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Page suivante goToNextPage' }).getAttribute('aria-disabled')).toBe('false');
        expect(screen.getByRole('link', { name: 'goToLastPage' }).getAttribute('aria-disabled')).toBe('false');
      });
    });

    describe('quand l utilisateur clique sur 5 puis 9', () => {
      describe('en vue mobile', () => {
        it('doit afficher le return to the first page, le less than, 4 pages avant et après la page 9, une ellipse, le more than et le go to last page', async () => {
          mockSmallScreen();
          mockUseRouter({});
          render(
            <Pagination numberOfResult={470} numberOfResultPerPage={30} />,
          );

          const page3 = screen.getByRole('link', { current: false, name: '3' });
          fireEvent.click(page3);
          await screen.findByRole('link', { current: false, name: '5' });
          const page5 = screen.getByRole('link', { current: false, name: '5' });
          fireEvent.click(page5);

          expect(screen.getByRole('link', { name: 'returnToFirstPage' }).getAttribute('aria-disabled')).toBe('false');
          expect(screen.getByRole('link', { name: 'returnToPreviousPage' }).getAttribute('aria-disabled')).toBe('false');
          expect(screen.getByText('3')).toBeInTheDocument();
          expect(screen.getByText('4')).toBeInTheDocument();
          expect(screen.getByText('5')).toBeInTheDocument();
          expect(screen.getByText('6')).toBeInTheDocument();
          expect(screen.getByText('7')).toBeInTheDocument();
          expect(screen.getByText('…')).toBeInTheDocument();
          expect(screen.getByText('16')).toBeInTheDocument();
          expect(screen.getByRole('link', { name: 'goToNextPage' }).getAttribute('aria-disabled')).toBe('false');
          expect(screen.getByRole('link', { name: 'goToLastPage' }).getAttribute('aria-disabled')).toBe('false');
        });
      });

      it('doit afficher return to the first page, Page précédente, 4 pages avant et après la page 9, une ellipse, Page suivante et le go to last page', async () => {
        mockLargeScreen();
        mockUseRouter({});
        render(
          <Pagination numberOfResult={470} numberOfResultPerPage={30} />,
        );

        const page5 = screen.getByRole('link', { current: false, name: '5' });
        fireEvent.click(page5);
        await screen.findByRole('link', { current: false, name: '9' });
        const page9 = screen.getByRole('link', { current: false, name: '9' });
        fireEvent.click(page9);

        expect(screen.getByRole('link', { name: 'returnToFirstPage' }).getAttribute('aria-disabled')).toBe('false');
        expect(screen.getByRole('link', { name: 'returnToPreviousPage Page précédente' }).getAttribute('aria-disabled')).toBe('false');
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('6')).toBeInTheDocument();
        expect(screen.getByText('7')).toBeInTheDocument();
        expect(screen.getByText('8')).toBeInTheDocument();
        expect(screen.getByText('9')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('11')).toBeInTheDocument();
        expect(screen.getByText('12')).toBeInTheDocument();
        expect(screen.getByText('13')).toBeInTheDocument();
        expect(screen.getByText('…')).toBeInTheDocument();
        expect(screen.getByText('16')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Page suivante goToNextPage' }).getAttribute('aria-disabled')).toBe('false');
        expect(screen.getByRole('link', { name: 'goToLastPage' }).getAttribute('aria-disabled')).toBe('false');

        // quand l'utilisateur clique ensuite sur la dernière page (16)
        // doit afficher doit afficher return to the first page, Page précédente, 4 avant la page 16

        const page16 = screen.getByRole('link', { current: false, name: '16' });
        fireEvent.click(page16);

        expect(screen.getByRole('link', { name: 'returnToFirstPage' }).getAttribute('aria-disabled')).toBe('false');
        expect(screen.getByRole('link', { name: 'returnToPreviousPage Page précédente' }).getAttribute('aria-disabled')).toBe('false');
        expect(screen.getByText('12')).toBeInTheDocument();
        expect(screen.getByText('13')).toBeInTheDocument();
        expect(screen.getByText('14')).toBeInTheDocument();
        expect(screen.getByText('15')).toBeInTheDocument();
        expect(screen.queryByText('…')).not.toBeInTheDocument();
        expect(screen.getByText('16')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Page suivante goToNextPage' }).getAttribute('aria-disabled')).toBe('true');
        expect(screen.getByRole('link', { name: 'goToLastPage' }).getAttribute('aria-disabled')).toBe('true');
      });
    });

    describe('quand l utilisateur clique sur la pagination', () => {
      it('met à jour l url avec la valeur sélectionné', async () => {
        mockLargeScreen();
        const routerPush = jest.fn();

        mockUseRouter({ push: routerPush });
        render(
          <Pagination numberOfResult={470} numberOfResultPerPage={30} />,
        );

        // l'utilisateur clique sur la troisière page
        const page3 = screen.getByRole('link', { current: false, name: '3' });
        fireEvent.click(page3);

        // met à jour avec la page 3 dans l'url
        expect(screen.getByRole('link', { current: true, name: '3' })).toBeInTheDocument();
        expect(routerPush).toHaveBeenCalledWith({ query: { page: 3 } });

        // l'utilisateur clique sur la page suivante
        const goToNextPage = screen.getByRole('link', { name: 'Page suivante goToNextPage' });
        fireEvent.click(goToNextPage);

        // met à jour avec la page 4 dans l'url
        expect(screen.getByRole('link', { current: false, name: '3' })).toBeInTheDocument();
        expect(screen.getByRole('link', { current: true, name: '4' })).toBeInTheDocument();
        expect(routerPush).toHaveBeenCalledWith({ query: { page: 4 } });

        // l'utilisateur clique sur la page précédente
        const returnToPreviousPage = screen.getByRole('link', { name: 'returnToPreviousPage Page précédente' });
        fireEvent.click(returnToPreviousPage);

        // met à jour avec la page 3 dans l'url
        expect(screen.getByRole('link', { current: true, name: '3' })).toBeInTheDocument();
        expect(routerPush).toHaveBeenCalledWith({ query: { page: 3 } });

        // l'utilisateur clique sur go to last page
        const goToLastPage = screen.getByRole('link', { name: 'goToLastPage' });
        fireEvent.click(goToLastPage);

        // met à jour avec la page 16 dans l'url
        expect(screen.getByRole('link', { current: true, name: '16' })).toBeInTheDocument();
        expect(routerPush).toHaveBeenCalledWith({ query: { page: 16 } });

        // l'utilisateur clique sur return to fisrt page
        const returnToFirstPage = screen.getByRole('link', { name: 'returnToFirstPage' });
        fireEvent.click(returnToFirstPage);

        // met à jour avec la page 1 dans l'url
        expect(screen.getByRole('link', { current: true, name: '1' })).toBeInTheDocument();
        expect(routerPush).toHaveBeenCalledWith({ query: { page: 1 } });
      });
    });

  });
});
