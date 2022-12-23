import classNames from 'classnames';
import React, { useMemo } from 'react';
import type { UsePaginationProps } from 'react-instantsearch-hooks/dist/es/connectors/usePagination';
import { usePagination } from 'react-instantsearch-hooks-web';

import { CommonProps } from '~/client/components/props';
import { CommonPagination } from '~/client/components/ui/Pagination/CommonPagination';

interface MeiliSearchCustomPaginationProps extends CommonProps {
  numberOfResultPerPage: number
  listeDesResultatsId: string
}

export function MeiliSearchCustomPagination(props: MeiliSearchCustomPaginationProps & UsePaginationProps) {
  const { numberOfResultPerPage, listeDesResultatsId, className } = props;
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

  const onPageClick = (pageNumber: number) => {
    refine(pageNumber);
    const listeDesResultats = document.getElementById(`${listeDesResultatsId}`);
    if (listeDesResultats) {
      const axeHorizontal = listeDesResultats.offsetLeft;
      const axeVertical = listeDesResultats.offsetTop;
      window.scrollTo(axeHorizontal, axeVertical);
    }
  };

  return (
    <div className={classNames(className)}>
      <CommonPagination
        currentPage={currentRefinement}
        onPageClick={(pageNumber) => onPageClick(pageNumber)}
        isLastPage={isLastPage}
        numberOfPageList={numberOfPageList}
        lastPage={lastPage}
        isFirstPage={isFirstPage}
        createURL={createURL}
      />
    </div>
  );
}


