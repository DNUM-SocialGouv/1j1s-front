import type { UsePaginationProps } from 'react-instantsearch-hooks/dist/es/connectors/usePagination';
import { usePagination } from 'react-instantsearch-hooks-web';

import styles from './Pagination.module.scss';

const DEFAULT_HITS_PER_PAGE = 15;
export type CustomPaginationProps = UsePaginationProps & { hits_per_page?: number }
// DEVNOTE : penser à mettre le même props.hits_per_page que dans le configure
export function CustomPagination(props: CustomPaginationProps) {
  const {
    pages,
    currentRefinement,
    nbHits,
    isFirstPage,
    isLastPage,
    refine,
    createURL,
  } = usePagination(props);
  const HITS_PER_PAGE = props.hits_per_page || DEFAULT_HITS_PER_PAGE;
  const lastPage = (Math.ceil(nbHits/ HITS_PER_PAGE)-1);
  const shouldDisplayElipsis = () => {
    return currentRefinement < lastPage - 2;
  };
  const displayLastElement = () => {
    return displayElement(lastPage);
  };
  const displayNext = () => {
    if(isLastPage) {
      return displayLastElement();
    }
    return <>
      { shouldDisplayElipsis() && displayElipsis()}
      {displayLastElement()}
      <li key={'NextPageLiPagination'}>
        <a
          href={createURL(currentRefinement+1)}
          onClick={(event) => {
            event.preventDefault();
            refine(currentRefinement+1);
          }}
        >
        Page suivante
        </a>
      </li>
      <li key={'LastLiPagination'}>
        <a
          href={createURL(lastPage)}
          onClick={(event) => {
            event.preventDefault();
            refine(lastPage);
          }}
        >
        ››
        </a>
      </li></>;
  };
  const displayElipsis = () => {
    return <li>…</li>;
  };
  const displayPrevious = () => {
    if(isFirstPage) {
      return <></>;
    }
    return <><li key={'FirstPageLiPagination'}>
      <a
        href={createURL(0)}
        onClick={(event) => {
          event.preventDefault();
          refine(0);
        }}
      >
        ‹‹
      </a>
    </li>
    <li key={'PreviousPageLiPagination'}>
      <a
        href={createURL(currentRefinement-1)}
        onClick={(event) => {
          event.preventDefault();
          refine(currentRefinement-1);
        }}
      >
        Page précédente
      </a>
    </li></>;
  };
  const allElementExceptLastPage = (elements: Array<number>): Array<number> => {
    return elements.filter((element) => element !== lastPage);
  };
  const displayElement = (page: number) => {
    return <li key={page}>
      <a
        href={createURL(page)}
        className={ page===currentRefinement ? styles.meilisearchPaginationActive: ''}
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

  return (
    <ul className={styles.meilisearchPagination}>
      {displayPrevious()}
      {allElementExceptLastPage(pages).map(displayElement)}
      {displayNext()}
    </ul>
  );
}


