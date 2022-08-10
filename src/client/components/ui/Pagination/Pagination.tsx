import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';
import { AngleLeftFromLineIcon } from '~/client/components/ui/Icon/angle-left-from-line.icon';
import { AngleRightIcon } from '~/client/components/ui/Icon/angle-right.icon';
import { AngleRightFromLineIcon } from '~/client/components/ui/Icon/angle-right-from-line.icon';
import styles from '~/client/components/ui/Pagination/Pagination.module.scss';
import useBreakpoint from '~/client/hooks/useBreakpoint';

interface PaginationProps {
  numberOfResult: number
  numberOfResultPerPage: number
}
export function Pagination({ numberOfResult, numberOfResultPerPage } : PaginationProps) {
  const { isSmallScreen } = useBreakpoint();
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

  async function setCurrentPageInQueryUrl(page: number) {
    await push({ query: { ...query, page: page + 1 } });
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const numberOfPageList = [...Array(Math.ceil(numberOfResult/ numberOfResultPerPage) - 1).keys()];
  const isFirstPage = useMemo(() => currentPage === 0, [currentPage]);
  const isLastPage = useMemo(() => currentPage === numberOfPageList.length, [currentPage, numberOfPageList.length]);
  const lastPage = useMemo(() => Math.max((Math.ceil(numberOfResult/ numberOfResultPerPage) - 1), 0), [numberOfResult, numberOfResultPerPage]);

  const displayElement = (page: number) => {
    return <li key={page}>
      <a
        href=""
        role="link"
        className={ page === currentPage ? styles.paginationActive: ''}
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

  const displayPrevious = () => {
    return <>
      <li key='FirstPageLiPagination' className={isFirstPage ? styles.disabled : ''}>
        <a
          href=""
          role="link"
          aria-disabled={isFirstPage}
          onClick={(event) => {
            event.preventDefault();
            if(!isFirstPage) {
              setCurrentPageInQueryUrl(0);
              setCurrentPage(0);
            }
          }}
        >
          <span title="returnToFirstPage"><AngleLeftFromLineIcon /></span>
        </a>
      </li>
      <li key='PreviousPageLiPagination' className={isFirstPage ? styles.disabled : ''}>
        <a
          href=""
          role="link"
          aria-disabled={isFirstPage}
          onClick={(event) => {
            event.preventDefault();
            if(!isFirstPage) {
              setCurrentPageInQueryUrl(currentPage - 1);
              setCurrentPage(currentPage - 1);
            }
          }}
        >
          {isSmallScreen ? <span title="returnToPreviousPage"><AngleLeftIcon /></span> : <div className={styles.pagePrecendente}><span title="returnToPreviousPage"><AngleLeftIcon /></span> Page précédente</div>}
        </a>
      </li>
    </>;
  };

  const filter5ElementsToDisplayInMobile = (element: number) => element >= currentPage - 2 && element <= currentPage + 2 && element !== lastPage;
  const filter9ElementsToDisplayInDesktop = (element: number) => element >= currentPage - 4 && element <= currentPage + 4 && element !== lastPage;
  const displayIntermediatePages = () => numberOfPageList.filter((element) =>
    isSmallScreen ? filter5ElementsToDisplayInMobile(element) : filter9ElementsToDisplayInDesktop(element),
  ).map(displayElement);

  const displayEllipsis = () => numberOfPageList.length > 4 && (isSmallScreen ? currentPage < lastPage - 3 : currentPage < lastPage - 5) ? <li className={styles.ellipse}>…</li> : <></>;

  const displayLastElement = () => displayElement(lastPage);
  const displayNext = () => {
    return <>
      { displayLastElement() }
      <li key='NextPageLiPagination' className={isLastPage ? styles.disabled : ''}>
        <a
          href=""
          role="link"
          aria-disabled={isLastPage}
          onClick={(event) => {
            event.preventDefault();
            if(!isLastPage) {
              setCurrentPageInQueryUrl(currentPage+1);
              setCurrentPage(currentPage+1);
            }
          }}
        >
          {isSmallScreen ? <span title="goToNextPage"><AngleRightIcon /></span> : <div className={styles.pageSuivante}>Page suivante  <span title="goToNextPage"><AngleRightIcon /></span></div>}
        </a>
      </li>
      <li key='LastLiPagination' className={isLastPage ? styles.disabled : ''}>
        <a
          href=""
          role="link"
          aria-disabled={isLastPage}
          onClick={(event) => {
            event.preventDefault();
            if(!isLastPage) {
              setCurrentPageInQueryUrl(lastPage);
              setCurrentPage(lastPage);
            }
          }}
        >
          <span title="goToLastPage"><AngleRightFromLineIcon /></span>
        </a>
      </li></>;
  };

  return (
    <>
      {
        numberOfPageList.length >= 2 && <ul key='Pagination' className={styles.pagination}>
          { displayPrevious() }
          { displayIntermediatePages() }
          { displayEllipsis() }
          { displayNext() }
        </ul>
      }
    </>
  );
}
