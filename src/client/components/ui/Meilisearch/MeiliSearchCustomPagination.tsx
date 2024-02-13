import React, { useMemo } from 'react';
import { usePagination } from 'react-instantsearch';
import type { UsePaginationProps } from 'react-instantsearch-core/dist/es/connectors/usePagination';

import { CommonPagination } from '~/client/components/ui/Pagination/CommonPagination';

interface MeiliSearchCustomPaginationProps extends Pick<React.HTMLAttributes<unknown>, 'className'> {
  numberOfResultPerPage: number
  onPageChange: () => void
}

export function MeiliSearchCustomPagination(props: MeiliSearchCustomPaginationProps & UsePaginationProps) {
	const { numberOfResultPerPage, onPageChange, className } = props;
	const {
		currentRefinement,
		nbHits,
		isFirstPage,
		isLastPage,
		refine,
		createURL,
	} = usePagination(props, {
		/*  NOTE (SULI 13-02-2024):
		* Suite à une montée de version d'instantsearch en patch, la pagination ne permet plus de bouger en dehors de la page 1
		* pour la rétablir, il semble que cette option soit nécessaire $$widgetType: 'ais.pagination', d'après le code source de la librairie
		* (Cf. https://github.com/algolia/instantsearch/blob/77f0c48d6458aa2d2ab4af804fbaf45f0839d88b/packages/react-instantsearch/src/widgets/Pagination.tsx#L45)
		* */
		$$widgetType: 'ais.pagination',
	});
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
		onPageChange();
	};

	return (
		<div className={className}>
			<CommonPagination
				currentPage={currentRefinement}
				onPageClick={onPageClick}
				isLastPage={isLastPage}
				numberOfPageList={numberOfPageList}
				lastPage={lastPage}
				isFirstPage={isFirstPage}
				createURL={createURL}
			/>
		</div>
	);
}


