import {
	CurrentRefinementsConnectorParamsItem,
	CurrentRefinementsConnectorParamsRefinement,
	CurrentRefinementsRenderState,
} from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';
import type { PaginationRenderState } from 'instantsearch.js/es/connectors/pagination/connectPagination';
import { RangeBoundaries, RangeRenderState } from 'instantsearch.js/es/connectors/range/connectRange';
import {
	RefinementListItem,
	RefinementListRenderState,
} from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import { useInstantSearch } from 'react-instantsearch';

function* idMaker() {
	let index = 0;
	while (true)
		yield index++;
}

const gen = idMaker();

export function mockUsePagination(override: Partial<PaginationRenderState>) {
	const result: PaginationRenderState = {
		createURL: vi.fn().mockReturnValue('#'),
		canRefine: true,
		currentRefinement: 1,
		isFirstPage: false,
		isLastPage: false,
		nbHits: 100,
		nbPages: 3,
		pages: [0, 1, 2],
		refine: vi.fn<(page: number) => void>(),
		...override,
	};
	return result;
}

export function mockUseRefinementList(override: Partial<RefinementListRenderState>) {
	const result = {
		canRefine: true,
		canToggleShowMore: true,
		createURL: vi.fn().mockReturnValue('#'),
		hasExhaustiveItems: true,
		isFromSearch: true,
		isShowingMore: true,
		items: [],
		refine: vi.fn(),
		searchForItems: vi.fn(),
		sendEvent: vi.fn(),
		toggleShowMore: vi.fn(),
		...override,
	};
	return result;
}

export function generateRefinementListItem(override: Partial<RefinementListItem>) {
	return {
		count: 1,
		isRefined: false,
		label: '',
		value: gen.next().value + '',
		...override,
	};
}

export function mockUseInstantSearch(override: Partial<ReturnType<typeof useInstantSearch>>) {
	return {
		addMiddlewares: vi.fn().mockReturnValue(() => undefined),
		error: undefined,
		indexRenderState: {},
		indexUiState: {},
		refresh: vi.fn(),
		renderState: {},
		results: { __isArtificial: false },
		scopedResults: [],
		setIndexUiState: vi.fn(),
		setUiState: vi.fn(),
		status: 'idle',
		uiState: {},
		...override,
	} as unknown as ReturnType<typeof useInstantSearch>;
}

export function mockUseRangeInput(override: Partial<RangeRenderState>) {
	const result: RangeRenderState = {
		canRefine: override.canRefine ?? true,
		format: override.format ?? {
			from: (fromValue: number) => `${fromValue}`,
			to: (toValue: number) => `${toValue}`,
		},
		range: override.range ?? {
			max: 200,
			min: 0,
		},
		refine: override.refine ?? vi.fn<(rangeValue: RangeBoundaries) => void>(),
		sendEvent: override.sendEvent ?? vi.fn(),
		start: override.start ?? ([0, 2000] as RangeBoundaries),
	};
	return result;
}

export const aDisjunctiveImmeubleItemRefinement = (): CurrentRefinementsConnectorParamsRefinement => {
	return {
		attribute: 'typeBien',
		label: 'immeuble',
		type: 'disjunctive',
		value: 'immeuble',
	};
};

export const aDisjunctiveAppartementItemRefinement = (): CurrentRefinementsConnectorParamsRefinement => {
	return {
		attribute: 'typeBien',
		label: 'appartement',
		type: 'disjunctive',
		value: 'appartement',
	};
};

export const aTypeBienItem = (override?: Partial<CurrentRefinementsConnectorParamsItem>): CurrentRefinementsConnectorParamsItem => {
	return {
		attribute: 'typeBien',
		indexId: 'id-index',
		indexName: 'nom-index',
		label: 'typeBien',
		refine: vi.fn(),
		refinements: [
		  aDisjunctiveImmeubleItemRefinement(),
		  aDisjunctiveAppartementItemRefinement(),
		],
	  	...override,
	};
};

export function mockUseCurrentRefinements(override: Partial<CurrentRefinementsRenderState>) {
	return {
		canRefine: true,
		createURL: vi.fn(),
		items: [aTypeBienItem()],
		refine: vi.fn(),
		...override,
	};
}
