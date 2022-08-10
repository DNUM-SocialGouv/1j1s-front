import React, { useMemo } from 'react';
import type { UsePaginationProps } from 'react-instantsearch-hooks/dist/es/connectors/usePagination';
import { usePagination } from 'react-instantsearch-hooks-web';

import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';
import { AngleLeftFromLineIcon } from '~/client/components/ui/Icon/angle-left-from-line.icon';
import { AngleRightIcon } from '~/client/components/ui/Icon/angle-right.icon';
import { AngleRightFromLineIcon } from '~/client/components/ui/Icon/angle-right-from-line.icon';
import useBreakpoint from '~/client/hooks/useBreakpoint';

import styles from '../Pagination/Pagination.module.scss';

const DEFAULT_HITS_PER_PAGE = 15;
export type MeilisearchCustomPaginationProps = UsePaginationProps & { hitsPerPage?: number }
// DEVNOTE : penser à mettre le même props.hits_per_page que dans le configure
export function MeilsearchCustomPagination(props: MeilisearchCustomPaginationProps) {
  const { isSmallScreen } = useBreakpoint();
  const {
    currentRefinement,
    nbHits,
    isFirstPage,
    isLastPage,
    refine,
    createURL,
  } = usePagination(props);

  const HITS_PER_PAGE = props.hitsPerPage || DEFAULT_HITS_PER_PAGE;
  const numberOfPageList = useMemo(() => {
    if(nbHits > 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return [...Array(Math.ceil(nbHits/ HITS_PER_PAGE) - 1).keys()];
    }
    return [];
  }, [nbHits, HITS_PER_PAGE]);
  const lastPage = Math.max((Math.ceil(nbHits/ HITS_PER_PAGE) - 1), 0);

  const displayElement = (page: number) => {
    return <li key={page}>
      <a
        href={createURL(page)}
        className={ page === currentRefinement ? styles.paginationActive: ''}
        aria-current={(page+1)===currentRefinement}
        onClick={(event) => {
          event.preventDefault();
          refine(page);
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
          href={createURL(0)}
          role="link"
          aria-disabled={isFirstPage}
          onClick={(event) => {
            event.preventDefault();
            if(!isFirstPage) {
              refine(0);
            }
          }}
        >
          <span title="returnToFirstPage"><AngleLeftFromLineIcon /></span>
        </a>
      </li>
      <li key='PreviousPageLiPagination' className={isFirstPage ? styles.disabled : ''}>
        <a
          href={createURL(currentRefinement - 1)}
          role="link"
          aria-disabled={isFirstPage}
          onClick={(event) => {
            event.preventDefault();
            if(!isFirstPage) {
              refine(currentRefinement - 1);
            }
          }}
        >
          {isSmallScreen ? <span title="returnToPreviousPage"><AngleLeftIcon /></span> : <div className={styles.pagePrecendente}><span title="returnToPreviousPage"><AngleLeftIcon /></span> Page précédente</div>}
        </a>
      </li>
    </>;
  };

  const filter5ElementsToDisplayInMobile = (element: number) => element >= currentRefinement - 2 && element <= currentRefinement + 2 && element !== lastPage;
  const filter9ElementsToDisplayInDesktop = (element: number) => element >= currentRefinement - 4 && element <= currentRefinement + 4 && element !== lastPage;
  const displayIntermediatePages = () => numberOfPageList.filter((element) =>
    isSmallScreen ? filter5ElementsToDisplayInMobile(element) : filter9ElementsToDisplayInDesktop(element),
  ).map((value) => {
    return displayElement(value);
  });

  const displayEllipsis = () => numberOfPageList.length > 4 && (isSmallScreen ? currentRefinement < lastPage - 3 : currentRefinement < lastPage - 5) ? <li className={styles.ellipse}>…</li> : <></>;

  const displayLastElement = () => displayElement(lastPage);
  const displayNext = () => {
    return <>
      { displayLastElement() }
      <li key='NextPageLiPagination' className={isLastPage ? styles.disabled : ''}>
        <a
          href={createURL(currentRefinement + 1)}
          role="link"
          aria-disabled={isLastPage}
          onClick={(event) => {
            event.preventDefault();
            if(!isLastPage) {
              refine(currentRefinement + 1);
            }
          }}
        >
          {isSmallScreen ? <span title="goToNextPage"><AngleRightIcon /></span> : <div className={styles.pageSuivante}>Page suivante  <span title="goToNextPage"><AngleRightIcon /></span></div>}
        </a>
      </li>
      <li key='LastLiPagination' className={isLastPage ? styles.disabled : ''}>
        <a
          href={createURL(lastPage)}
          role="link"
          aria-disabled={isLastPage}
          onClick={(event) => {
            event.preventDefault();
            if(!isLastPage) {
              refine(lastPage);
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
        numberOfPageList.length >= 2 && <ul className={styles.pagination}>
          {displayPrevious()}
          {displayIntermediatePages()}
          {displayEllipsis()}
          {displayNext()}
        </ul>
      }
    </>
  );
}


