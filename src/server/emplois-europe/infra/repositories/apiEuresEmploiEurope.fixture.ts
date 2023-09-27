export function anApiEuresRechercheBody() {
	return {
		dataSetRequest: {
			excludedDataSources :  [ { dataSourceId : 29 }, { dataSourceId : 81 }, { dataSourceId : 781 } ],
			pageNumber: '1',
			resultsPerPage: '40',
			sortBy: 'BEST_MATCH',
		},
		searchCriteria: {
			facetCriteria: [
				{ facetName: 'LOCATION', facetValues: ['NL'] },
				{ facetName: 'EXPERIENCE', facetValues: ['A', 'B'] },
				{ facetName: 'POSITION_OFFERING', facetValues: ['apprenticeship','contracttohire','directhire','seasonal','selfemployed','temporary'] },
			],
			keywordCriteria :
				{
					keywordLanguageCode : 'fr', keywords : [
						{ keywordScope : 'EVERYWHERE', keywordText : 'boulanger' },
					],
				},
		},
	};
}
