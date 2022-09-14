import React, { useMemo } from 'react';
import type { UsePaginationProps } from 'react-instantsearch-hooks/dist/es/connectors/usePagination';
import { usePagination } from 'react-instantsearch-hooks-web';

import { CommonPagination } from '~/client/components/ui/Pagination/CommonPagination';

export type MeiliSearchCustomPaginationProps = UsePaginationProps & { numberOfResultPerPage: number }

export function MeiliSearchCustomPagination(props: MeiliSearchCustomPaginationProps) {
  const { numberOfResultPerPage } = props;
  const {
    currentRefinement,
    nbHits,
    isFirstPage,
    isLastPage,
    refine,
    createURL,
  } = usePagination(props);
  const numberOfResult = nbHits;

  const numberOfPageList = useMemo(() => {
    if (nbHits > 0) {
      return [...Array(Math.ceil(nbHits / numberOfResultPerPage) - 1)].map((value, index) => index);
    }
    return [];
  }, [nbHits, numberOfResultPerPage]);
  const lastPage = Math.max((Math.ceil(numberOfResult / numberOfResultPerPage) - 1), 0);

  return (
    <CommonPagination
      currentPage={currentRefinement}
      onPageClick={refine}
      isLastPage={isLastPage}
      numberOfPageList={numberOfPageList}
      lastPage={lastPage}
      isFirstPage={isFirstPage}
      createURL={createURL}
    />
  );
}


