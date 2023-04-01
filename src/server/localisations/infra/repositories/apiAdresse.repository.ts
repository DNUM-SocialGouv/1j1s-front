import { createSuccess, Either } from '~/server/errors/either';
import { RésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées';
import {
	LocalisationAvecCoordonnéesRepository,
} from '~/server/localisations/domain/localisationAvecCoordonnées.repository';
import { handleGetFailureError } from '~/server/localisations/infra/repositories/apiAdresse.error';
import { ApiAdresseResponse } from '~/server/localisations/infra/repositories/apiAdresse.response';
import { mapRésultatsRechercheCommune } from '~/server/localisations/infra/repositories/apiGeo.mapper';
import { CachedHttpClientService } from '~/server/services/http/cachedHttpClient.service';

export class ApiAdresseRepository implements LocalisationAvecCoordonnéesRepository {
	constructor(private readonly httpClientService: CachedHttpClientService) {
	}

	async getCommuneList(adresseRecherchée: string): Promise<Either<RésultatsRechercheCommune>> {
		try {
			const response = await this.httpClientService.get<ApiAdresseResponse>(
				`search/?q=${adresseRecherchée}&type=municipality&limit=21`,
			);
			return createSuccess(mapRésultatsRechercheCommune(response.data));
		} catch (e) {
			return handleGetFailureError(e, 'adresse');
		}
	}
}
