import { createSuccess, Either } from '~/server/errors/either';
import { RésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées';
import {
	LocalisationAvecCoordonnéesRepository,
} from '~/server/localisations/domain/localisationAvecCoordonnées.repository';
import { ApiAdresseResponse } from '~/server/localisations/infra/repositories/apiAdresse.response';
import { mapRésultatsRechercheCommune } from '~/server/localisations/infra/repositories/apiGeo.mapper';
import { removeParenthesis } from '~/server/localisations/infra/repositories/removeParenthesis';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { CachedHttpClientService } from '~/server/services/http/cachedHttpClient.service';

export class ApiAdresseRepository implements LocalisationAvecCoordonnéesRepository {
	constructor(private readonly httpClientService: CachedHttpClientService, private readonly errorManagementService: ErrorManagementService) {
	}

	async getCommuneList(adresseRecherchee: string): Promise<Either<RésultatsRechercheCommune>> {
		try {
			const adresseRechercheeWithoutParenthesis = removeParenthesis(adresseRecherchee);
			const response = await this.httpClientService.get<ApiAdresseResponse>(
				`search/?q=${adresseRechercheeWithoutParenthesis}&type=municipality&limit=21`,
			);
			return createSuccess(mapRésultatsRechercheCommune(response.data));
		} catch (error) {
			return this.errorManagementService.handleFailureError(error,{
				apiSource: 'API Adresse',
				contexte: 'get commune', message: 'impossible de récupérer les communes associées à une adresse',
			});
		}
	}
}