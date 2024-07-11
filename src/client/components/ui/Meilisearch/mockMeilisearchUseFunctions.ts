import {
	CurrentRefinementsConnectorParamsItem,
	CurrentRefinementsConnectorParamsRefinement,
	CurrentRefinementsRenderState,
} from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';
import type { PaginationRenderState } from 'instantsearch.js/es/connectors/pagination/connectPagination';
import { RangeRenderState } from 'instantsearch.js/es/connectors/range/connectRange';
import {
	RefinementListItem,
	RefinementListRenderState,
} from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';

function* idMaker() {
	let index = 0;
	while (true)
		yield index++;
}

const gen = idMaker();

export function mockUsePagination(override: Partial<PaginationRenderState>) {
	const result = {
		createURL: jest.fn().mockReturnValue('#'),
		currentRefinement: 1,
		isFirstPage: false,
		isLastPage: false,
		nbHits: 100,
		pages: [0, 1, 2],
		refine: jest.fn(),
		...override,
	};
	return result;
}

export function mockUseRefinementList(override: Partial<RefinementListRenderState>) {
	const result = {
		canRefine: true,
		canToggleShowMore: true,
		createURL: jest.fn().mockReturnValue('#'),
		hasExhaustiveItems: true,
		isFromSearch: true,
		isShowingMore: true,
		items: [],
		refine: jest.fn(),
		searchForItems: jest.fn(),
		sendEvent: jest.fn(),
		toggleShowMore: jest.fn(),
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

export function mockUseInstantSearch(override: Partial<unknown>) {
	return {
		error: jest.fn(),
		refresh: jest.fn(),
		status: jest.fn(),
		use: jest.fn(),
		...override,
	};
}

export function mockUseRangeInput(override: Partial<RangeRenderState>) {
	return {
		canRefine: true,
		range: {
			max: 200,
			min: 0,
		},
		refine: jest.fn(),
		sendEvent: jest.fn(),
		start: [0, 2000],
		...override,
	};
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
		refine: jest.fn(),
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
		createURL: jest.fn(),
		items: [aTypeBienItem()],
		refine: jest.fn,
		...override,
	};
}
