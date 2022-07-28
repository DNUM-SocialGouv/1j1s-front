import type { PaginationRenderState } from 'instantsearch.js/es/connectors/pagination/connectPagination';
import type { UsePaginationProps } from 'react-instantsearch-hooks/dist/es/connectors/usePagination';
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
function realMockUsePagination(props: UsePaginationProps): PaginationRenderState  {
  console.dir(props);
  return {
    canRefine: true,
    createURL: jest.fn(),
    currentRefinement: 1,
    isFirstPage: false,
    isLastPage: false,
    nbHits: 12,
    nbPages: 1,
    pages : [0,1,2,3],
    refine : jest.fn(),
  };
}

module.exports = {
  usePagination: realMockUsePagination,
};
