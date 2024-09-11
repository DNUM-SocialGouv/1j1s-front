import { SearchClient } from 'algoliasearch-helper/types/algoliasearch';

export function aRechercheClientService(): SearchClient {
	return {
		search: jest.fn().mockResolvedValue({
			results: [{
				exhaustiveFacetsCount: true,
				exhaustiveNbHits: true,
				hits: [],
				hitsPerPage: 1,
				nbHits: 2,
				nbPages: 2,
				page: 1,
				params: '',
				processingTimeMS: 0,
				query: '',
				renderingContent: {
					facetOrdering: {
						facets: {},
						values: {},
					},
				},
				userData: [],
			}],
		}),
	};
}
