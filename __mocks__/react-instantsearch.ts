import {
	CurrentRefinementsRenderState,
} from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';
import type { PaginationRenderState } from 'instantsearch.js/es/connectors/pagination/connectPagination';
import { RangeRenderState } from 'instantsearch.js/es/connectors/range/connectRange';
import { RefinementListRenderState } from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import { SearchBoxRenderState } from 'instantsearch.js/es/connectors/search-box/connectSearchBox';
/*
* UsePagination associé à un getter sur la librairie.
* Ce getter est défini en readonly (non-configurable)
* Les éléments comme `jest.spyOn(require('react-instantsearch'), 'usePagination', 'get);`
* ou
* Object.defineProperty(require('react-instantsearch'), 'usePagination', {
  get: () => usePagination,
});
* Sont donc inopérantes.
* Il faut donc mocker la totalité de la librairie via le dossier __mock__
* */

function realMockUsePagination(): PaginationRenderState {
	return {
		canRefine: true,
		createURL: jest.fn(),
		currentRefinement: 1,
		isFirstPage: false,
		isLastPage: false,
		nbHits: 12,
		nbPages: 1,
		pages: [0, 1, 2, 3],
		refine: jest.fn(),
	};
}

function realMockUseRefinementList(): RefinementListRenderState {
	return {
		canRefine: true,
		canToggleShowMore: true,
		createURL: jest.fn(),
		hasExhaustiveItems: true,
		isFromSearch: true,
		isShowingMore: true,
		items: [],
		refine: jest.fn(),
		searchForItems: jest.fn(),
		sendEvent: jest.fn(),
		toggleShowMore: jest.fn(),
	};
}

function realMockUseSearchBox(): SearchBoxRenderState {
	return {
		clear: jest.fn(),
		isSearchStalled: false,
		query: '',
		refine: jest.fn(),
	};
}

function realMockUseInstantSearch(): unknown {
	return {
		error: jest.fn(),
		refresh: jest.fn(),
		status: jest.fn(),
		use: jest.fn(),
	};
}

function realMockUseRange(): RangeRenderState {
	return {
		canRefine: true,
		format: {
			from: jest.fn(),
			to: jest.fn(),
		},
		range: {
			max: 0,
			min: 0,
		},
		refine: jest.fn(),
		sendEvent: jest.fn(),
		start: [0, 1],
	};
}

function realMockUseCurrentRefinements(): CurrentRefinementsRenderState {
	return {
		canRefine: true,
		createURL: jest.fn(),
		items: [],
		refine: jest.fn(),
	};
}



module.exports = {
	Configure: jest.fn(),
	Hits: jest.fn(),
	InstantSearch: jest.fn(),
	useCurrentRefinements: realMockUseCurrentRefinements,
	useInstantSearch: realMockUseInstantSearch,
	usePagination: realMockUsePagination,
	useRange: realMockUseRange,
	useRefinementList: realMockUseRefinementList,
	useSearchBox: realMockUseSearchBox,
	useStats: jest.fn(),
};
