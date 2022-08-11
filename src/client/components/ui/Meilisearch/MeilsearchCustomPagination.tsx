import React, { useMemo } from 'react';
import type { UsePaginationProps } from 'react-instantsearch-hooks/dist/es/connectors/usePagination';
import { usePagination } from 'react-instantsearch-hooks-web';

import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';
import { AngleLeftFromLineIcon } from '~/client/components/ui/Icon/angle-left-from-line.icon';
import { AngleRightIcon } from '~/client/components/ui/Icon/angle-right.icon';
import { AngleRightFromLineIcon } from '~/client/components/ui/Icon/angle-right-from-line.icon';
import useBreakpoint from '~/client/hooks/useBreakpoint';

import styles from '../Pagination/Pagination.module.scss';

const NOMBRE_ELEMENT_SUR_MOBILE_AVANT_ET_APRES_LA_CURRENT_PAGE = 2;
const NOMBRE_ELEMENT_SUR_DESKTOP_AVANT_ET_APRES_LA_CURRENT_PAGE = 4;

export type MeilisearchCustomPaginationProps = UsePaginationProps & { numberOfResultPerPage: number }

// DEVNOTE : penser à mettre le même props.hits_per_page que dans le configure
export function MeilsearchCustomPagination(props: MeilisearchCustomPaginationProps) {
  const { isSmallScreen } = useBreakpoint();
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

  const numberOfElementToDisplayAfterAndBeforeCurrentPage = isSmallScreen && NOMBRE_ELEMENT_SUR_MOBILE_AVANT_ET_APRES_LA_CURRENT_PAGE || NOMBRE_ELEMENT_SUR_DESKTOP_AVANT_ET_APRES_LA_CURRENT_PAGE;

  const numberOfPageList = useMemo(() => {
    if (nbHits > 0) {
      return [...Array(Math.ceil(nbHits / numberOfResultPerPage) - 1)].map((value, index) => index);
    }
    return [];
  }, [nbHits, numberOfResultPerPage]);
  const lastPage = Math.max((Math.ceil(numberOfResult / numberOfResultPerPage) - 1), 0);

  const displayElement = (page: number) => {
    return <li key={page}>
      <a
        href={createURL(page)}
        aria-current={page === currentRefinement}
        aria-label={`Page numéro ${page + 1}`}
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
      <li key="FirstPageLiPagination">
        <a
          href={createURL(0)}
          aria-disabled={isFirstPage}
          aria-label="Revenir à la première page"
          onClick={(event) => {
            event.preventDefault();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if(!event.target.ariaDisabled) {
              if (!isFirstPage) {
                refine(0);
              }
            }
          }}
        >
          <AngleLeftFromLineIcon />
        </a>
      </li>
      <li key="PreviousPageLiPagination">
        <a
          href={createURL(currentRefinement - 1)}
          aria-disabled={isFirstPage}
          aria-label="Revenir à la page précédente"
          onClick={(event) => {
            event.preventDefault();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if(!event.target.ariaDisabled) {
              if (!isFirstPage) {
                refine(currentRefinement - 1);
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
    element >= currentRefinement - numberOfElementToDisplayAfterAndBeforeCurrentPage && element <= currentRefinement + numberOfElementToDisplayAfterAndBeforeCurrentPage && element !== lastPage,
  ).map(displayElement);

  const displayEllipsis = () => currentRefinement < lastPage - (numberOfElementToDisplayAfterAndBeforeCurrentPage + 1) ?
    <li className={styles.ellipse}>…</li> : <></>;

  const displayLastElement = () => displayElement(lastPage);
  const displayNext = () => {
    return <>
      {displayLastElement()}
      <li key="NextPageLiPagination">
        <a
          href={createURL(currentRefinement + 1)}
          aria-disabled={isLastPage}
          aria-label="Aller à la page suivante"
          onClick={(event) => {
            event.preventDefault();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if(!event.target.ariaDisabled) {
              if (!isLastPage) {
                refine(currentRefinement + 1);
              }
            }
          }}
        >
          {isSmallScreen ? <AngleRightIcon /> : <div className={styles.pageSuivante}>Page suivante <AngleRightIcon /></div>}
        </a>
      </li>
      <li key="LastLiPagination">
        <a
          href={createURL(lastPage)}
          aria-disabled={isLastPage}
          aria-label="Aller à la dernière page"
          onClick={(event) => {
            event.preventDefault();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if(!event.target.ariaDisabled) {
              if (!isLastPage) {
                refine(lastPage);
              }
            }
          }}
        >
          <AngleRightFromLineIcon />
        </a>
      </li>
    </>;
  };

  return (
    <>
      {
        numberOfPageList.length >= 2 && <ul key='Pagination' className={styles.pagination}>
          {displayPrevious()}
          {displayIntermediatePages()}
          {displayEllipsis()}
          {displayNext()}
        </ul>
      }
    </>
  );
}


