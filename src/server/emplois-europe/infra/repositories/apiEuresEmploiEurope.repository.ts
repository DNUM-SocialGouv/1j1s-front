import { EmploiEuropeFiltre, ResultatRechercheEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';
import { EmploiEuropeRepository } from '~/server/emplois-europe/domain/emploiEurope.repository';
import {
	ApiEuresEmploiEuropeRechercheRequestBody,
	ApiEuresEmploiEuropeRechercheResponse,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope';
import { mapRechercheEmploiEurope } from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.mapper';
import { createSuccess, Either } from '~/server/errors/either';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';

export class ApiEuresEmploiEuropeRepository implements EmploiEuropeRepository {
	constructor(
		private readonly httpClientService: PublicHttpClientService,
		private readonly errorManagementService: ErrorManagementService,
	) {}

	private static buildSearchBody(filtre: EmploiEuropeFiltre): ApiEuresEmploiEuropeRechercheRequestBody {
		return {
			dataSetRequest: {
				excludedDataSources:  [ { dataSourceId : 29 }, { dataSourceId : 81 }, { dataSourceId : 781 } ],
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
				keywordCriteria:
					filtre.motCle !== undefined ? {
						keywordLanguageCode: 'fr',
						keywords: [ { keywordScope : 'EVERYWHERE', keywordText : filtre.motCle } ],
					} : undefined,
			},
		};
	}

	async search(filtre: EmploiEuropeFiltre): Promise<Either<ResultatRechercheEmploiEurope>> {
		const endpoint = '/search';
		try {
			const response: { data: ApiEuresEmploiEuropeRechercheResponse } = await this.httpClientService.post(
				endpoint,
				ApiEuresEmploiEuropeRepository.buildSearchBody(filtre),
			);
			const mappedResponse = mapRechercheEmploiEurope(response.data);
			return createSuccess(mappedResponse);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API Eures',
				contexte: 'search emploi europe',
				message: 'impossible d’effectuer une recherche d’emploi',
			});
		}
	}
}
