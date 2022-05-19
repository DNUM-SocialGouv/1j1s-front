import { Pagination } from '@dataesr/react-dsfr';
import { useRouter } from 'next/router';

import usePagination from '~/client/hooks/usePagination';

interface PaginationProps {
  nombreRésultats: number
  itemPerPage: number
}

export function PaginationComponent(props: PaginationProps) {
  const { nombreRésultats, itemPerPage } = props;
  const { page, setPage } = usePagination();
  const router = useRouter();
  const pageCount = Math.round(nombreRésultats / itemPerPage);

  async function changePage(page: number) {
    setPage(page);
    await router.push({ query: { ...router.query, page } });
  }

  return (
    <Pagination onClick={changePage} currentPage={page} pageCount={pageCount} surrendingPages={1}/>
  );
}
