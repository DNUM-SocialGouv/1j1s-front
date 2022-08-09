import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import styles from '~/client/components/ui/Meilisearch/Pagination.module.scss';
import useBreakpoint from '~/client/hooks/useBreakpoint';

interface PaginationProps {
  numberOfResult: number
  numberOfResultPerPage: number
}
export function Pagination(props: PaginationProps) {
  const { isSmallScreen } = useBreakpoint();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(0);

  const {
    numberOfResult,
    numberOfResultPerPage,
  } = props;

  useEffect(function setCurrentPageFromQueryUrl() {
    const { page } = router.query;
    if (page && typeof page === 'string' && !isNaN(+page)) {
      setCurrentPage(Number(page) - 1);
    } else {
      setCurrentPage(0);
    }
  }, [setCurrentPage, router.query]);

  async function setCurrentPageInQueryUrl(page: number) {
    await router.push({ query: { ...router.query, page: page + 1 } });
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const numberOfPageList = [...Array(Math.ceil(numberOfResult/ numberOfResultPerPage) - 1).keys()];

  const isFirstPage = useMemo(() => currentPage === 0, [currentPage]);

  const isLastPage = useMemo(() => currentPage === numberOfPageList.length, [currentPage, numberOfPageList.length]);

  const lastPage = useMemo(() => Math.max((Math.ceil(numberOfResult/ numberOfResultPerPage) - 1), 0), [numberOfResult, numberOfResultPerPage]);

  const shouldDisplayEllipsis = () => numberOfPageList.length > 4 && currentPage !== lastPage;
  const displayEllipsis = () => <li>…</li>;
  const displayLastElement = () => displayElement(lastPage);
  const filter5ElementsToDisplayInMobile = (element: number) => element >= currentPage - 2 && element <= currentPage + 2 && element !== lastPage;
  const filter9ElementsToDisplayInDesktop = (element: number) => element >= currentPage - 4 && element <= currentPage + 4 && element !== lastPage;

  const displayIntermediatePages = () => numberOfPageList.filter((element) =>
    isSmallScreen ? filter5ElementsToDisplayInMobile(element) : filter9ElementsToDisplayInDesktop(element),
  ).map(displayElement);

  const displayNext = () => {
    if(isLastPage) {
      return displayLastElement();
    }
    return <>
      { shouldDisplayEllipsis() && displayEllipsis() }
      { displayLastElement() }
      <li key='NextPageLiPagination'>
        <a
          href=''
          onClick={(event) => {
            event.preventDefault();
            setCurrentPageInQueryUrl(currentPage+1);
            setCurrentPage(currentPage+1);
          }}
        >
          {isSmallScreen ? '›' : 'Page suivante'}
        </a>
      </li>
      <li key='LastLiPagination'>
        <a
          href=''
          onClick={(event) => {
            event.preventDefault();
            setCurrentPageInQueryUrl(lastPage);
            setCurrentPage(lastPage);
          }}
        >
          ››
        </a>
      </li></>;
  };

  const displayPrevious = () => {
    if(isFirstPage) {
      return <></>;
    }
    return <><li key='FirstPageLiPagination'>
      <a
        href=''
        onClick={(event) => {
          event.preventDefault();
          setCurrentPageInQueryUrl(0);
          setCurrentPage(0);
        }}
      >
        ‹‹
      </a>
    </li>
    <li key='PreviousPageLiPagination'>
      <a
        href={''}
        onClick={(event) => {
          event.preventDefault();
          setCurrentPageInQueryUrl(currentPage - 1);
          setCurrentPage(currentPage - 1);
        }}
      >
        {isSmallScreen ? '‹' : 'Page précédente'}
      </a>
    </li></>;
  };

  const displayElement = (page: number) => {
    return <li key={page}>
      <a
        href=''
        className={ page === currentPage ? styles.meilisearchPaginationActive: ''}
        aria-current={currentPage === page}
        onClick={(event) => {
          event.preventDefault();
          setCurrentPageInQueryUrl(page);
          setCurrentPage(page);
        }}
      >
        {page + 1}
      </a>
    </li>;
  };

  return (
    <ul key='Pagination' className={styles.meilisearchPagination}>
      { displayPrevious() }
      { displayIntermediatePages() }
      { displayNext() }
    </ul>
  );
}
