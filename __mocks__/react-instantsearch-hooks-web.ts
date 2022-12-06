import type { PaginationRenderState } from 'instantsearch.js/es/connectors/pagination/connectPagination';
// eslint-disable-next-line import/named
import { RefinementListRenderState } from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import { SearchBoxRenderState } from 'instantsearch.js/es/connectors/search-box/connectSearchBox';
import type { UsePaginationProps } from 'react-instantsearch-hooks/dist/es/connectors/usePagination';
// eslint-disable-next-line import/named
import {
  UseRefinementListProps,
  UseSearchBoxProps,
} from 'react-instantsearch-hooks-web';
/*
* UsePagination associé à un getter sur la librairie.
* Ce getter est défini en readonly (non-configurable)
* Les éléments comme `jest.spyOn(require('react-instantsearch-hooks-web'), 'usePagination', 'get);`
* ou
* Object.defineProperty(require('react-instantsearch-hooks-web'), 'usePagination', {
  get: () => usePagination,
});
* Sont donc inopérantes.
* Il faut donc mocker la totalité de la librairie via le dossier __mock__
* */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function realMockUsePagination(_props: UsePaginationProps): PaginationRenderState {
  return {
    canRefine: true,
    createURL: jest.fn(),
    currentRefinement: 1,
    isFirstPage: false,
    isLastPage: false,
    nbHits: 12,
    nbPages: 1,
    pages: [0, 1, 2, 3],
    refine: jest.fn(),
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function realMockUseRefinementList(_props: UseRefinementListProps): RefinementListRenderState {
  return {
    canRefine: true,
    canToggleShowMore: true,
    createURL: jest.fn(),
    hasExhaustiveItems: true,
    isFromSearch: true,
    isShowingMore: true,
    items: [],
    refine: jest.fn(),
    searchForItems: jest.fn(),
    sendEvent: jest.fn(),
    toggleShowMore: jest.fn(),
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function realMockUseSearchBox(_props: UseSearchBoxProps): SearchBoxRenderState {
  return {
    clear: jest.fn(),
    isSearchStalled: false,
    query: 'ma-query',
    refine: jest.fn(),
  };
}

module.exports = {
  usePagination: realMockUsePagination,
  useRefinementList: realMockUseRefinementList,
  useSearchBox: realMockUseSearchBox,
};
