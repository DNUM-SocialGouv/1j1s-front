import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import { CommonPagination } from '~/client/components/ui/Pagination/CommonPagination';

interface PaginationProps {
  numberOfResult: number
  numberOfResultPerPage: number
  maxPage?: number
}

export function Pagination({ numberOfResult, numberOfResultPerPage, maxPage } : PaginationProps) {
  const { query, push } = useRouter();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(function setCurrentPageFromQueryUrl() {
    const { page } = query;
    if (page && typeof page === 'string' && !isNaN(+page)) {
      setCurrentPage(Number(page) - 1);
    } else {
      setCurrentPage(0);
    }
  }, [setCurrentPage, query]);

  async function setCurrentPageAndQueryUrl(page: number) {
    setCurrentPage(page);
    await push({ query: { ...query, page: page + 1 } });
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const numberOfPageList = [...Array(Math.ceil(numberOfResult / numberOfResultPerPage) - 1).keys()];
  const isFirstPage = useMemo(() => currentPage === 0, [currentPage]);
  const isLastPage = useMemo(() => maxPage && numberOfPageList.length > maxPage ? currentPage === maxPage : currentPage === numberOfPageList.length, [currentPage, maxPage, numberOfPageList.length]);
  const lastPage = useMemo(() => Math.max((Math.ceil(numberOfResult/ numberOfResultPerPage) - 1), 0), [numberOfResult, numberOfResultPerPage]);

  return (
    <CommonPagination
      currentPage={currentPage}
      onPageClick={setCurrentPageAndQueryUrl}
      isLastPage={isLastPage}
      numberOfPageList={numberOfPageList}
      lastPage={lastPage}
      isFirstPage={isFirstPage}
      maxPage={maxPage}
    />
  );
}
