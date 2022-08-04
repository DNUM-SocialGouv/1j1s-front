/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { mockUsePagination } from '~/client/components/ui/Meilisearch/tests/mockUsePagination';

import { MeilsearchCustomPagination } from '../MeilsearchCustomPagination';

declare type CreateURL<TValue> = (value: TValue) => string;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const spyed = jest.spyOn(require('react-instantsearch-hooks-web'), 'usePagination');

const RETURN_TO_FIRST_PAGE_ABBREVIATION = '‹‹';
const RETURN_TO_PREVIOUS_PAGE_FULL_TEXT = 'Page précédente';

const GO_TO_NEXT_PAGE_ABBREVIATION = 'Page suivante';
const GO_TO_LAST_PAGE_ABBREVIATION = '››';
let createUrlMock: CreateURL<number>;
let refineMock:  jest.Mock<number>;

describe('MeilisearchCustomPagination', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('éléments suivants aux extrémités', () => {
    describe('quand il s’agit de la première page', () => {
      beforeEach(() => {
        // GIVEN
        spyed.mockImplementation(() => mockUsePagination({ isFirstPage: true }));
      });

      it('n’affiche pas << dans le document', async () => {;
        // WHEN
        render(
          <MeilsearchCustomPagination></MeilsearchCustomPagination>,
        );
        // THEN
        expect(screen.queryByText(RETURN_TO_FIRST_PAGE_ABBREVIATION)).not.toBeInTheDocument();
      });

      it('n’affiche pas "Page précédente" dans le document', async () => {;
        // WHEN
        render(
          <MeilsearchCustomPagination></MeilsearchCustomPagination>,
        );
        // THEN
        expect(screen.queryByText(RETURN_TO_PREVIOUS_PAGE_FULL_TEXT)).not.toBeInTheDocument();
      });
    });
    describe('quand il ne agit d’une page intermédiaire', () => {
      beforeEach(() => {
        // GIVEN
        spyed.mockImplementation(() => mockUsePagination({ isFirstPage: false, isLastPage: false }));
      });

      it('n’affiche "<<" dans le document', async () => {;
        // WHEN
        render(
          <MeilsearchCustomPagination></MeilsearchCustomPagination>,
        );
        // THEN
        expect(screen.getByText(RETURN_TO_FIRST_PAGE_ABBREVIATION)).toBeInTheDocument();
      });

      it('affiche "Page précédente" dans le document', async () => {;
        // WHEN
        render(
          <MeilsearchCustomPagination></MeilsearchCustomPagination>,
        );
        // THEN
        expect(screen.getByText(RETURN_TO_PREVIOUS_PAGE_FULL_TEXT)).toBeInTheDocument();
      });

      it('affiche ">>" dans le document', async () => {;
        // WHEN
        render(
          <MeilsearchCustomPagination></MeilsearchCustomPagination>,
        );
        // THEN
        expect(screen.getByText(GO_TO_LAST_PAGE_ABBREVIATION)).toBeInTheDocument();
      });

      it('affiche "Page suivante" dans le document', async () => {;
        // WHEN
        render(
          <MeilsearchCustomPagination></MeilsearchCustomPagination>,
        );
        // THEN
        expect(screen.getByText(GO_TO_NEXT_PAGE_ABBREVIATION)).toBeInTheDocument();
      });


      it('affiche "…" dans le document', async () => {;
        // WHEN
        render(
          <MeilsearchCustomPagination></MeilsearchCustomPagination>,
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

      it('n’affiche pas "…" dans le document', async () => {;
        // WHEN
        render(
          <MeilsearchCustomPagination></MeilsearchCustomPagination>,
        );
        // THEN
        expect(screen.queryByText('…')).not.toBeInTheDocument();
      });
    });
    describe('quand il s’agit de l’avant dernière page', () => {
      beforeEach(() => {
        // GIVEN
        spyed.mockImplementation(() => mockUsePagination({ currentRefinement:2, isFirstPage:false, isLastPage: false, nbHits: 3, nbPages:3 }));
      });

      it('affiche ">>" dans le document', async () => {;
        // WHEN
        render(
          <MeilsearchCustomPagination></MeilsearchCustomPagination>,
        );
        // THEN
        expect(screen.getByText(GO_TO_LAST_PAGE_ABBREVIATION)).toBeInTheDocument();
      });

      it('affiche "Page suivante" dans le document', async () => {;
        // WHEN
        render(
          <MeilsearchCustomPagination></MeilsearchCustomPagination>,
        );
        // THEN
        expect(screen.getByText(GO_TO_NEXT_PAGE_ABBREVIATION)).toBeInTheDocument();
      });


      it('n’affiche pas "…" dans le document', async () => {;
        // WHEN
        render(
          <MeilsearchCustomPagination></MeilsearchCustomPagination>,
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

      it('n’affiche pas >> dans le document', async () => {;
        // WHEN
        render(
          <MeilsearchCustomPagination></MeilsearchCustomPagination>,
        );
        // THEN
        expect(screen.queryByText(GO_TO_NEXT_PAGE_ABBREVIATION)).not.toBeInTheDocument();
      });

      it('n’affiche pas "Page suivante" dans le document', async () => {;
        // WHEN
        render(
          <MeilsearchCustomPagination></MeilsearchCustomPagination>,
        );
        // THEN
        expect(screen.queryByText(GO_TO_LAST_PAGE_ABBREVIATION)).not.toBeInTheDocument();
      });


      it('n’affiche pas "…" dans le document', async () => {;
        // WHEN
        render(
          <MeilsearchCustomPagination></MeilsearchCustomPagination>,
        );
        // THEN
        expect(screen.queryByText('…')).not.toBeInTheDocument();
      });
    });
  });
  describe('quand nous avons 4 pages de 15 éléments (pagination par défaut) et que nous sommes au troisième élément', () => {
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
        <MeilsearchCustomPagination></MeilsearchCustomPagination>,
      );
      // THEN
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('affiche 2 (première page et précédent) + 4 (pages) + 2 (prochain et dernière page) éléments', () => {
      // WHEN
      render(
        <MeilsearchCustomPagination></MeilsearchCustomPagination>,
      );
      // THEN
      expect(screen.getByRole('list').childNodes.length).toEqual(8);
      expect(screen.getAllByRole('listitem').length).toEqual(8);
    });

    it('affiche 1, 2, 3 et 4 en lien dans les éléments de la liste', () => {
      // WHEN
      render(
        <MeilsearchCustomPagination></MeilsearchCustomPagination>,
      );
      // THEN
      expect(screen.getByRole('link', { current: false, name: '1' })).toBeInTheDocument();
      expect(screen.getByRole('link', { current: false, name: '2' })).toBeInTheDocument();
      expect(screen.getByRole('link', { current: true, name: '3' })).toBeInTheDocument();
      expect(screen.getByRole('link', { current: false, name: '4' })).toBeInTheDocument();
    });

    it('refine la première page au clic sur le <<', () => {
      // GIVEN
      render(
        <MeilsearchCustomPagination></MeilsearchCustomPagination>,
      );
      const lien = screen.getByRole('link', { current: false, name: RETURN_TO_FIRST_PAGE_ABBREVIATION });
      // WHEN
      fireEvent.click(lien);
      // THEN
      expect(refineMock).toHaveBeenCalledTimes(1);
      expect(refineMock).toHaveBeenCalledWith(0);
    });

    it('refine la première page au clic sur le 1', () => {
      // GIVEN
      render(
        <MeilsearchCustomPagination></MeilsearchCustomPagination>,
      );
      const lien = screen.getByRole('link', { current: false, name: '1' });
      // WHEN
      fireEvent.click(lien);
      // THEN
      expect(refineMock).toHaveBeenCalledTimes(1);
      expect(refineMock).toHaveBeenCalledWith(0);
    });

    it('refine la deuxième page au clic sur page suivante', () => {
      // GIVEN
      render(
        <MeilsearchCustomPagination></MeilsearchCustomPagination>,
      );
      const lien = screen.getByRole('link', { current: false, name: RETURN_TO_PREVIOUS_PAGE_FULL_TEXT });
      // WHEN
      fireEvent.click(lien);
      // THEN
      expect(refineMock).toHaveBeenCalledTimes(1);
      expect(refineMock).toHaveBeenCalledWith(2);
    });

    it('refine la deuxième page au clic sur le 2', () => {
      // GIVEN
      render(
        <MeilsearchCustomPagination></MeilsearchCustomPagination>,
      );
      const lien = screen.getByRole('link', { current: false, name: '2' });
      // WHEN
      fireEvent.click(lien);
      // THEN
      expect(refineMock).toHaveBeenCalledTimes(1);
      expect(refineMock).toHaveBeenCalledWith(1);
    });

    it('refine la dernière page au clic sur le >>', () => {
      // GIVEN
      render(
        <MeilsearchCustomPagination></MeilsearchCustomPagination>,
      );
      const lien = screen.getByRole('link', { current: false, name: GO_TO_LAST_PAGE_ABBREVIATION });
      // WHEN
      fireEvent.click(lien);
      // THEN
      expect(refineMock).toHaveBeenCalledTimes(1);
      expect(refineMock).toHaveBeenCalledWith(3);
    });

    it('refine la page suivante au clic sur le page suivante', () => {
      // GIVEN
      render(
        <MeilsearchCustomPagination></MeilsearchCustomPagination>,
      );
      const lien = screen.getByRole('link', { current: false, name: GO_TO_NEXT_PAGE_ABBREVIATION });
      // WHEN
      fireEvent.click(lien);
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

    it('affiche seulement 1 élément (le 1)', () => {
      // WHEN
      render(
        <MeilsearchCustomPagination></MeilsearchCustomPagination>,
      );
      // THEN
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem').length).toEqual(1);
      expect(screen.getByRole('link', { current: true, name: '1' })).toBeInTheDocument();
    });
  });
  describe('quand nous avons 0 éléments', () => {
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

    it('affiche seulement 1 élément (le 1)', () => {
      // WHEN
      render(
        <MeilsearchCustomPagination></MeilsearchCustomPagination>,
      );
      // THEN
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem').length).toEqual(1);
    });
  });
});
