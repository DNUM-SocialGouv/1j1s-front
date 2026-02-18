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
* Les éléments comme `vi.spyOn(require('react-instantsearch'), 'usePagination', 'get);`
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
		createURL: vi.fn(),
		currentRefinement: 1,
		isFirstPage: false,
		isLastPage: false,
		nbHits: 12,
		nbPages: 1,
		pages: [0, 1, 2, 3],
		refine: vi.fn(),
	};
}

function realMockUseRefinementList(): RefinementListRenderState {
	return {
		canRefine: true,
		canToggleShowMore: true,
		createURL: vi.fn(),
		hasExhaustiveItems: true,
		isFromSearch: true,
		isShowingMore: true,
		items: [],
		refine: vi.fn(),
		searchForItems: vi.fn(),
		sendEvent: vi.fn(),
		toggleShowMore: vi.fn(),
	};
}

function realMockUseSearchBox(): SearchBoxRenderState {
	return {
		clear: vi.fn(),
		isSearchStalled: false,
		query: '',
		refine: vi.fn(),
	};
}

function realMockUseInstantSearch(): unknown {
	return {
		error: vi.fn(),
		refresh: vi.fn(),
		status: vi.fn(),
		use: vi.fn(),
	};
}

function realMockUseRange(): RangeRenderState {
	return {
		canRefine: true,
		format: {
			from: vi.fn(),
			to: vi.fn(),
		},
		range: {
			max: 0,
			min: 0,
		},
		refine: vi.fn(),
		sendEvent: vi.fn(),
		start: [0, 1],
	};
}

function realMockUseCurrentRefinements(): CurrentRefinementsRenderState {
	return {
		canRefine: true,
		createURL: vi.fn(),
		items: [],
		refine: vi.fn(),
	};
}



export const Configure = vi.fn();
export const Hits = vi.fn();
export const InstantSearch = vi.fn();
export const useCurrentRefinements = vi.fn(realMockUseCurrentRefinements);
export const useInstantSearch = vi.fn(realMockUseInstantSearch);
export const usePagination = vi.fn(realMockUsePagination);
export const useRange = vi.fn(realMockUseRange);
export const useRefinementList = vi.fn(realMockUseRefinementList);
export const useSearchBox = vi.fn(realMockUseSearchBox);
export const useStats = vi.fn();
