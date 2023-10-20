import {
	ApiEuresEmploiEuropeRechercheRequestBody,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope';

export function anApiEuresRechercheBody(motCle = 'boulanger'): ApiEuresEmploiEuropeRechercheRequestBody {
	return {
		dataSetRequest: {
			excludedDataSources :  [ { dataSourceId : 29 }, { dataSourceId : 81 }, { dataSourceId : 781 } ],
			pageNumber: '1',
			resultsPerPage: '40',
			sortBy: 'BEST_MATCH',
		},
		searchCriteria: {
			keywordCriteria :
				{
					keywordLanguageCode : 'fr', keywords : [
						{ keywordScope : 'EVERYWHERE', keywordText : motCle },
					],
				},
		},
	};
}
