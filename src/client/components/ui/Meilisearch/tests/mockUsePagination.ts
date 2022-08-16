import type { PaginationRenderState } from 'instantsearch.js/es/connectors/pagination/connectPagination';

export function mockUsePagination(override: Partial<PaginationRenderState>)  {
  const result = {
    createURL: jest.fn().mockReturnValue('#'),
    currentRefinement: 1,
    isFirstPage: false,
    isLastPage: false,
    nbHits: 100,
    pages: [0,1,2],
    refine: jest.fn(),
    ...override,
  };
  return result;
}
