/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { MeiliSearchCustomPagination } from '~/client/components/ui/Meilisearch/MeiliSearchCustomPagination';
import { mockUsePagination } from '~/client/components/ui/Meilisearch/tests/mockMeilisearchUseFunctions';
import { mockLargeScreen } from '~/client/components/window.mock';

declare type CreateURL<TValue> = (value: TValue) => string;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const spyed = jest.spyOn(require('react-instantsearch-hooks-web'), 'usePagination');

let createUrlMock: CreateURL<number>;
let refineMock:  jest.Mock<number>;

const REVENIR_A_LA_PREMIERE_PAGE = 'Revenir à la première page';
const REVENIR_A_LA_PAGE_PRECENDENTE = 'Revenir à la page précédente';
const ALLER_A_LA_PAGE_SUIVANTE = 'Aller à la page suivante';
const ALLER_A_LA_DERNIERE_PAGE = 'Aller à la dernière page';

const mockFunctionScrollToTopOfListeDesResultats = jest.fn();

describe('MeilisearchCustomPagination', () => {
  beforeEach(() => {
    mockLargeScreen();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('sur grand écran', () => {
    describe('éléments suivants aux extrémités', () => {
      describe('quand il s’agit de la première page', () => {
        beforeEach(() => {
          // GIVEN
          spyed.mockImplementation(() => mockUsePagination({ isFirstPage: true, nbHits: 200 }));
        });

        it('Revenir à la première page et Revenir à la page précédente doivent etre disable et Aller à la page suivante et Aller à la dernière page doivent etre enable', () => {
          // WHEN
          render(
            <MeiliSearchCustomPagination numberOfResultPerPage={15} onPageChange={mockFunctionScrollToTopOfListeDesResultats} />,
          );
          // THEN
          expect(screen.getByRole('link', { name: REVENIR_A_LA_PREMIERE_PAGE }).getAttribute('aria-disabled')).toBe('true');
          expect(screen.getByRole('link', { name: REVENIR_A_LA_PAGE_PRECENDENTE }).getAttribute('aria-disabled')).toBe('true');
          expect(screen.getByRole('link', { name: ALLER_A_LA_PAGE_SUIVANTE }).getAttribute('aria-disabled')).toBe('false');
          expect(screen.getByRole('link', { name: ALLER_A_LA_DERNIERE_PAGE }).getAttribute('aria-disabled')).toBe('false');
        });
      });

      describe('quand il s agit d’une page intermédiaire', () => {
        beforeEach(() => {
          // GIVEN
          spyed.mockImplementation(() => mockUsePagination({ isFirstPage: false, isLastPage: false, nbHits: 400 }));
        });

        it('Revenir à la première page, Revenir à la page précédente, Aller à la page suivante, Aller à la dernière page doivent etre enable', async () => {
          // WHEN
          render(
            <MeiliSearchCustomPagination numberOfResultPerPage={15} onPageChange={mockFunctionScrollToTopOfListeDesResultats} />,
          );
          // THEN
          expect(screen.getByRole('link', { name: REVENIR_A_LA_PREMIERE_PAGE }).getAttribute('aria-disabled')).toBe('false');
          expect(screen.getByRole('link', { name: REVENIR_A_LA_PAGE_PRECENDENTE }).getAttribute('aria-disabled')).toBe('false');
          expect(screen.getByRole('link', { name: ALLER_A_LA_PAGE_SUIVANTE }).getAttribute('aria-disabled')).toBe('false');
          expect(screen.getByRole('link', { name: ALLER_A_LA_DERNIERE_PAGE }).getAttribute('aria-disabled')).toBe('false');
        });

        it('affiche "…" dans le document', async () => {
          // WHEN
          render(
            <MeiliSearchCustomPagination numberOfResultPerPage={15} onPageChange={mockFunctionScrollToTopOfListeDesResultats} />,
          );
          // THEN
          expect(screen.getByText('…')).toBeInTheDocument();
        });
      });

      describe('quand il s’agit de l’avant avant dernière page', () => {
        beforeEach(() => {
          // GIVEN
          spyed.mockImplementation(() => mockUsePagination({ currentRefinement:1, isFirstPage:false, isLastPage: false, nbHits: 3, nbPages:3 }));
        });

        it('n’affiche pas "…" dans le document', async () => {
          // WHEN
          render(
            <MeiliSearchCustomPagination numberOfResultPerPage={15} onPageChange={mockFunctionScrollToTopOfListeDesResultats} />,
          );
          // THEN
          expect(screen.queryByText('…')).not.toBeInTheDocument();
        });
      });

      describe('quand il s’agit de l’avant dernière page', () => {
        beforeEach(() => {
          // GIVEN
          spyed.mockImplementation(() => mockUsePagination({ currentRefinement:2, isFirstPage:false, isLastPage: false, nbHits: 35, nbPages:3 }));
        });

        it('n’affiche pas "…" dans le document', async () => {
          // WHEN
          render(
            <MeiliSearchCustomPagination numberOfResultPerPage={15} onPageChange={mockFunctionScrollToTopOfListeDesResultats} />,
          );
          // THEN
          expect(screen.queryByText('…')).not.toBeInTheDocument();
        });
      });

      describe('quand il s’agit de la dernière page', () => {
        beforeEach(() => {
          // GIVEN
          spyed.mockImplementation(() => mockUsePagination({ isLastPage: true }));
        });

        it('Revenir à la première page, Revenir à la page précédente doivent etre enable et Aller à la page suivante, Aller à la dernière page doivent etre disable', async () => {
          // WHEN
          render(
            <MeiliSearchCustomPagination numberOfResultPerPage={15} onPageChange={mockFunctionScrollToTopOfListeDesResultats} />,
          );
          // THEN
          expect(screen.getByRole('link', { name: REVENIR_A_LA_PREMIERE_PAGE }).getAttribute('aria-disabled')).toBe('false');
          expect(screen.getByRole('link', { name: REVENIR_A_LA_PAGE_PRECENDENTE }).getAttribute('aria-disabled')).toBe('false');
          expect(screen.getByRole('link', { name: ALLER_A_LA_PAGE_SUIVANTE }).getAttribute('aria-disabled')).toBe('true');
          expect(screen.getByRole('link', { name: ALLER_A_LA_DERNIERE_PAGE }).getAttribute('aria-disabled')).toBe('true');
        });

        it('n’affiche pas "…" dans le document', async () => {
          // WHEN
          render(
            <MeiliSearchCustomPagination numberOfResultPerPage={15} onPageChange={mockFunctionScrollToTopOfListeDesResultats} />,
          );
          // THEN
          expect(screen.queryByText('…')).not.toBeInTheDocument();
        });
      });
    });

    describe('quand nous avons 4 pages de 15 éléments et que nous sommes au troisième élément', () => {
      beforeEach(() => {
        // GIVEN
        createUrlMock = jest.fn().mockImplementation((page) => `#?page=${page}`);
        refineMock = jest.fn();
        spyed.mockImplementation(() => mockUsePagination(
          {
            createURL: createUrlMock,
            currentRefinement:3,
            isFirstPage:false,
            isLastPage: false,
            nbHits: 60,
            nbPages:4,
            pages: [0, 1, 2, 3],
            refine: refineMock,
          }));
      });

      it('affiche une liste', () => {
        // WHEN
        render(
          <MeiliSearchCustomPagination numberOfResultPerPage={15} onPageChange={mockFunctionScrollToTopOfListeDesResultats} />,
        );
        // THEN
        expect(screen.getByRole('list')).toBeInTheDocument();
      });

      it('affiche 2 (première page et précédent) + 4 (pages) + 2 (prochain et dernière page) éléments', () => {
        // WHEN
        render(
          <MeiliSearchCustomPagination numberOfResultPerPage={15} onPageChange={mockFunctionScrollToTopOfListeDesResultats} />,
        );
        // THEN
        expect(screen.getByRole('list').childNodes.length).toEqual(8);
        expect(screen.getAllByRole('listitem').length).toEqual(8);
      });

      it('affiche 1, 2, 3 et 4 en lien dans les éléments de la liste', () => {
        // WHEN
        render(
          <MeiliSearchCustomPagination numberOfResultPerPage={15} onPageChange={mockFunctionScrollToTopOfListeDesResultats} />,
        );
        // THEN
        expect(screen.getByRole('link', { current: false, name: '1' })).toBeInTheDocument();
        expect(screen.getByRole('link', { current: false, name: '2' })).toBeInTheDocument();
        expect(screen.getByRole('link', { current: false, name: '3' })).toBeInTheDocument();
        expect(screen.getByRole('link', { current: true, name: '4' })).toBeInTheDocument();
      });

      it('appelle la fonction parent au changement de page', async () => {
        // GIVEN
        const user = userEvent.setup();
        render(
          <MeiliSearchCustomPagination numberOfResultPerPage={15}  onPageChange={mockFunctionScrollToTopOfListeDesResultats} />,
        );

        const lien = screen.getByRole('link', { current: false, name: '1' });
        // WHEN
        await user.click(lien);
        // THEN
        expect(refineMock).toHaveBeenCalledTimes(1);
        expect(refineMock).toHaveBeenCalledWith(0);
        expect(mockFunctionScrollToTopOfListeDesResultats).toHaveBeenCalled();
      });

      it('refine la première page au clic sur le <<', async () => {
        // GIVEN
        const user = userEvent.setup();
        render(
          <MeiliSearchCustomPagination numberOfResultPerPage={15} onPageChange={mockFunctionScrollToTopOfListeDesResultats} />,
        );
        const lien = screen.getByRole('link', { name: REVENIR_A_LA_PREMIERE_PAGE });
        // WHEN
        await user.click(lien);
        // THEN
        expect(refineMock).toHaveBeenCalledTimes(1);
        expect(refineMock).toHaveBeenCalledWith(0);
      });

      it('refine la première page au clic sur le 1', async () => {
        // GIVEN
        const user = userEvent.setup();
        render(
          <MeiliSearchCustomPagination numberOfResultPerPage={15} onPageChange={mockFunctionScrollToTopOfListeDesResultats} />,
        );
        const lien = screen.getByRole('link', { current: false, name: '1' });
        // WHEN
        await user.click(lien);
        // THEN
        expect(refineMock).toHaveBeenCalledTimes(1);
        expect(refineMock).toHaveBeenCalledWith(0);
      });

      it('refine la deuxième page au clic sur page suivante', async () => {
        // GIVEN
        const user = userEvent.setup();
        render(
          <MeiliSearchCustomPagination numberOfResultPerPage={15} onPageChange={mockFunctionScrollToTopOfListeDesResultats} />,
        );
        const lien = screen.getByRole('link', { current: false, name: REVENIR_A_LA_PAGE_PRECENDENTE });
        // WHEN
        await user.click(lien);
        // THEN
        expect(refineMock).toHaveBeenCalledTimes(1);
        expect(refineMock).toHaveBeenCalledWith(2);
      });

      it('refine la deuxième page au clic sur le 2', async () => {
        // GIVEN
        const user = userEvent.setup();
        render(
          <MeiliSearchCustomPagination numberOfResultPerPage={15} onPageChange={mockFunctionScrollToTopOfListeDesResultats} />,
        );
        const lien = screen.getByRole('link', { current: false, name: '2' });
        // WHEN
        await user.click(lien);
        // THEN
        expect(refineMock).toHaveBeenCalledTimes(1);
        expect(refineMock).toHaveBeenCalledWith(1);
      });

      it('refine la dernière page au clic sur la derniere page', async () => {
        // GIVEN
        const user = userEvent.setup();
        render(
          <MeiliSearchCustomPagination numberOfResultPerPage={15} onPageChange={mockFunctionScrollToTopOfListeDesResultats} />,
        );
        const lien = screen.getByRole('link', { current: false, name: ALLER_A_LA_PAGE_SUIVANTE });
        // WHEN
        await user.click(lien);
        // THEN
        expect(refineMock).toHaveBeenCalledTimes(1);
        expect(refineMock).toHaveBeenCalledWith(4);
      });

      it('refine la page suivante au clic sur le page suivante', async () =>  {
        // GIVEN
        const user = userEvent.setup();
        render(
          <MeiliSearchCustomPagination numberOfResultPerPage={15} onPageChange={mockFunctionScrollToTopOfListeDesResultats} />,
        );
        const lien = screen.getByRole('link', { current: false, name: ALLER_A_LA_PAGE_SUIVANTE });
        // WHEN
        await user.click(lien);
        // THEN
        expect(refineMock).toHaveBeenCalledTimes(1);
        expect(refineMock).toHaveBeenCalledWith(4);
      });
    });

    describe('quand nous avons 1 seule page', () => {
      beforeEach(() => {
        // GIVEN
        createUrlMock = jest.fn().mockImplementation((page) => `#?page=${page}`);
        refineMock = jest.fn();
        spyed.mockImplementation(() => mockUsePagination(
          {
            createURL: createUrlMock,
            currentRefinement:1,
            isFirstPage:true,
            isLastPage: true,
            nbHits: 15,
            nbPages:1,
            pages: [0],
            refine: refineMock,
          }));
      });

      it('n affiche pas la pagination', () => {
        // WHEN
        render(
          <MeiliSearchCustomPagination numberOfResultPerPage={15} onPageChange={mockFunctionScrollToTopOfListeDesResultats} />,
        );
        // THEN
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
      });
    });

    describe('quand nous avons 0 élément', () => {
      beforeEach(() => {
        // GIVEN
        createUrlMock = jest.fn().mockImplementation((page) => `#?page=${page}`);
        refineMock = jest.fn();
        spyed.mockImplementation(() => mockUsePagination(
          {
            createURL: createUrlMock,
            currentRefinement:1,
            isFirstPage:true,
            isLastPage: true,
            nbHits: 0,
            nbPages:0,
            pages: [0],
            refine: refineMock,
          }));
      });

      it('n affiche pas la pagination', () => {
        // WHEN
        render(
          <MeiliSearchCustomPagination numberOfResultPerPage={15} onPageChange={mockFunctionScrollToTopOfListeDesResultats} />,
        );
        // THEN
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
      });
    });
  });
});
