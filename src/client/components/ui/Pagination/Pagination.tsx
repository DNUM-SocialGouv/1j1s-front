import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';
import { AngleLeftFromLineIcon } from '~/client/components/ui/Icon/angle-left-from-line.icon';
import { AngleRightIcon } from '~/client/components/ui/Icon/angle-right.icon';
import { AngleRightFromLineIcon } from '~/client/components/ui/Icon/angle-right-from-line.icon';
import styles from '~/client/components/ui/Pagination/Pagination.module.scss';
import useBreakpoint from '~/client/hooks/useBreakpoint';

const NOMBRE_ELEMENT_SUR_MOBILE_AVANT_ET_APRES_LA_CURRENT_PAGE = 2;
const NOMBRE_ELEMENT_SUR_DESKTOP_AVANT_ET_APRES_LA_CURRENT_PAGE = 4;

interface PaginationProps {
  numberOfResult: number
  numberOfResultPerPage: number
}

export function Pagination({ numberOfResult, numberOfResultPerPage } : PaginationProps) {
  const { isSmallScreen } = useBreakpoint();
  const { query, push } = useRouter();
  const [currentPage, setCurrentPage] = useState(0);

  const numberOfElementToDisplayAfterAndBeforeCurrentPage = isSmallScreen && NOMBRE_ELEMENT_SUR_MOBILE_AVANT_ET_APRES_LA_CURRENT_PAGE || NOMBRE_ELEMENT_SUR_DESKTOP_AVANT_ET_APRES_LA_CURRENT_PAGE;

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
          href="#"
          aria-disabled={isFirstPage}
          aria-label="Revenir à la première page"
          onClick={(event) => {
            event.preventDefault();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if(!event.target.ariaDisabled) {
              if(!isFirstPage) {
                setCurrentPageInQueryUrl(0);
                setCurrentPage(0);
              }
            }
          }}
        >
          <AngleLeftFromLineIcon />
        </a>
      </li>
      <li key='PreviousPageLiPagination' className={isFirstPage ? styles.disabled : ''}>
        <a
          href="#"
          aria-disabled={isFirstPage}
          aria-label="Revenir à la page précédente"
          onClick={(event) => {
            event.preventDefault();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if(!event.target.ariaDisabled) {
              if(!isFirstPage) {
                setCurrentPageInQueryUrl(currentPage - 1);
                setCurrentPage(currentPage - 1);
              }
            }
          }}
        >
          {isSmallScreen ? <AngleLeftIcon /> : <div className={styles.pagePrecendente}><AngleLeftIcon /> Page précédente</div>}
        </a>
      </li>
    </>;
  };

  const displayIntermediatePages = () => numberOfPageList.filter((element) =>
    element >= currentPage - numberOfElementToDisplayAfterAndBeforeCurrentPage && element <= currentPage + numberOfElementToDisplayAfterAndBeforeCurrentPage,
  ).map(displayElement);

  const displayEllipsis = () => currentPage < lastPage - (numberOfElementToDisplayAfterAndBeforeCurrentPage + 1)
    ? <li className={styles.ellipse}>…</li> : <></>;

  const displayLastElement = () => displayElement(lastPage);
  const displayNext = () => {
    return <>
      { displayLastElement() }
      <li key='NextPageLiPagination' className={isLastPage ? styles.disabled : ''}>
        <a
          href="#"
          aria-disabled={isLastPage}
          aria-label="Aller à la page suivante"
          onClick={(event) => {
            event.preventDefault();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if(!event.target.ariaDisabled) {
              if(!isLastPage) {
                setCurrentPageInQueryUrl(currentPage+1);
                setCurrentPage(currentPage+1);
              }
            }
          }}
        >
          {isSmallScreen ? <AngleRightIcon /> : <div className={styles.pageSuivante}>Page suivante  <AngleRightIcon /></div>}
        </a>
      </li>
      <li key='LastLiPagination' className={isLastPage ? styles.disabled : ''}>
        <a
          href="#"
          aria-disabled={isLastPage}
          aria-label="Aller à la dernière page"
          onClick={(event) => {
            event.preventDefault();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if(!event.target.ariaDisabled) {
              if(!isLastPage) {
                setCurrentPageInQueryUrl(lastPage);
                setCurrentPage(lastPage);
              }
            }
          }}
        >
          <AngleRightFromLineIcon />
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
