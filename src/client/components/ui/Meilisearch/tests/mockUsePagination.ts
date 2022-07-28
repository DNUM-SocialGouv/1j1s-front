import type { PaginationRenderState } from 'instantsearch.js/es/connectors/pagination/connectPagination';

export function mockUsePagination(overide: Partial<PaginationRenderState>)  {
  const result = {
    pages: [0,1,2],
    currentRefinement: 1,
    nbHits: 100,
    isFirstPage: false,
    isLastPage: false,
    refine: jest.fn(),
    createURL: jest.fn(),
    ...overide,
  };
  return result;
}


