import { Pagination as PaginationDSFR } from '@dataesr/react-dsfr';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

interface PaginationProps {
  itemListLength: number
  itemPerPage: number
}

export function Pagination(props: PaginationProps) {
  const [page, setPage] = useState(1);
  const { itemListLength, itemPerPage } = props;
  const router = useRouter();

  const getPageCount = useCallback(() => Math.round(itemListLength / itemPerPage), [itemListLength, itemPerPage]);

  useEffect(() => {
    const { page } = router.query;
    if (page && typeof page === 'string' && !isNaN(+page)) {
      setPage(Number(page));
    } else {
      setPage(1);
    }
  }, [setPage, router.query]);

  async function changePage(page: number) {
    await router.push({ query: { ...router.query, page } });
  }

  return (
    <PaginationDSFR onClick={changePage} currentPage={page} pageCount={getPageCount()} surrendingPages={1} />
  );
}
