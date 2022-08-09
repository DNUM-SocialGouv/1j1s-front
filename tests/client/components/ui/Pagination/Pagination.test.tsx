/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockLargeScreen, mockSmallScreen } from '@tests/client/window.mock';
import React from 'react';

import { Pagination } from '~/client/components/ui/Pagination/Pagination';

const RETURN_TO_FIRST_PAGE_ABBREVIATION = '‹‹';
const RETURN_TO_PREVIOUS_PAGE_FULL_TEXT = 'Page précédente';
const RETURN_TO_PREVIOUS_PAGE_IN_MOBILE = '‹';
const ELLIPSIS = '…';
const GO_TO_NEXT_PAGE_ABBREVIATION = 'Page suivante';
const GO_TO_LAST_PAGE_ABBREVIATION = '››';
const GO_TO_LAST_PAGE_IN_MOBILE = '›';

describe('Pagination', () => {
  describe('quand il y a 100 résultats et 25 résultat par page à afficher', () => {
    it('doit afficher les 4 premières pages, Page suivante et le go to last page', () => {
      mockLargeScreen();
      mockUseRouter({});
      render(
        <Pagination numberOfResult={100} numberOfResultPerPage={25} />,
      );

      expect(screen.queryByText(RETURN_TO_FIRST_PAGE_ABBREVIATION)).not.toBeInTheDocument();
      expect(screen.queryByText(RETURN_TO_PREVIOUS_PAGE_FULL_TEXT)).not.toBeInTheDocument();
      expect(screen.queryByText(ELLIPSIS)).not.toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText(GO_TO_NEXT_PAGE_ABBREVIATION)).toBeInTheDocument();
      expect(screen.getByText(GO_TO_LAST_PAGE_ABBREVIATION)).toBeInTheDocument();
    });
  });

  describe('quand il y a 100 résultats et 1O résultat par page à afficher', () => {
    it('doit afficher les 3 premières pages, une ellipse, la page 10, Page suivante et le go to last page', () => {
      mockLargeScreen();
      mockUseRouter({});
      render(
        <Pagination numberOfResult={470} numberOfResultPerPage={30} />,
      );

      expect(screen.queryByText(RETURN_TO_FIRST_PAGE_ABBREVIATION)).not.toBeInTheDocument();
      expect(screen.queryByText(RETURN_TO_PREVIOUS_PAGE_FULL_TEXT)).not.toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText(ELLIPSIS)).toBeInTheDocument();
      expect(screen.getByText('16')).toBeInTheDocument();
      expect(screen.getByText(GO_TO_NEXT_PAGE_ABBREVIATION)).toBeInTheDocument();
      expect(screen.getByText(GO_TO_LAST_PAGE_ABBREVIATION)).toBeInTheDocument();
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

          expect(screen.getByText(RETURN_TO_FIRST_PAGE_ABBREVIATION)).toBeInTheDocument();
          expect(screen.getByText(RETURN_TO_PREVIOUS_PAGE_IN_MOBILE)).toBeInTheDocument();
          expect(screen.getByText('3')).toBeInTheDocument();
          expect(screen.getByText('4')).toBeInTheDocument();
          expect(screen.getByText('5')).toBeInTheDocument();
          expect(screen.getByText('6')).toBeInTheDocument();
          expect(screen.getByText('7')).toBeInTheDocument();
          expect(screen.getByText(ELLIPSIS)).toBeInTheDocument();
          expect(screen.getByText('16')).toBeInTheDocument();
          expect(screen.getByText(GO_TO_LAST_PAGE_IN_MOBILE)).toBeInTheDocument();
          expect(screen.getByText(GO_TO_LAST_PAGE_ABBREVIATION)).toBeInTheDocument();
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

        expect(screen.getByText(RETURN_TO_FIRST_PAGE_ABBREVIATION)).toBeInTheDocument();
        expect(screen.getByText(RETURN_TO_PREVIOUS_PAGE_FULL_TEXT)).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('6')).toBeInTheDocument();
        expect(screen.getByText('7')).toBeInTheDocument();
        expect(screen.getByText('8')).toBeInTheDocument();
        expect(screen.getByText('9')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('11')).toBeInTheDocument();
        expect(screen.getByText('12')).toBeInTheDocument();
        expect(screen.getByText('13')).toBeInTheDocument();
        expect(screen.getByText(ELLIPSIS)).toBeInTheDocument();
        expect(screen.getByText('16')).toBeInTheDocument();
        expect(screen.getByText(GO_TO_NEXT_PAGE_ABBREVIATION)).toBeInTheDocument();
        expect(screen.getByText(GO_TO_LAST_PAGE_ABBREVIATION)).toBeInTheDocument();

        // quand l'utilisateur clique ensuite sur la dernière page (16)
        // doit afficher doit afficher return to the first page, Page précédente, 4 avant la page 16

        const page16 = screen.getByRole('link', { current: false, name: '16' });
        fireEvent.click(page16);

        expect(screen.getByText(RETURN_TO_FIRST_PAGE_ABBREVIATION)).toBeInTheDocument();
        expect(screen.getByText(RETURN_TO_PREVIOUS_PAGE_FULL_TEXT)).toBeInTheDocument();
        expect(screen.getByText('12')).toBeInTheDocument();
        expect(screen.getByText('13')).toBeInTheDocument();
        expect(screen.getByText('14')).toBeInTheDocument();
        expect(screen.getByText('15')).toBeInTheDocument();
        expect(screen.getByText('16')).toBeInTheDocument();
        expect(screen.queryByText(ELLIPSIS)).not.toBeInTheDocument();
        expect(screen.queryByText(GO_TO_NEXT_PAGE_ABBREVIATION)).not.toBeInTheDocument();
        expect(screen.queryByText(GO_TO_LAST_PAGE_ABBREVIATION)).not.toBeInTheDocument();
      });
    });
  });
});
