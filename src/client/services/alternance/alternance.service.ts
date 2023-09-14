import { ParsedUrlQuery, stringify } from 'querystring';

import { AlternanceQueryParams } from '~/client/hooks/useAlternanceQuery';
import { HttpClientService } from '~/client/services/httpClient.service';
import { ResultatRechercheAlternance } from '~/server/alternances/domain/alternance';
import { Either } from '~/server/errors/either';
import { removeUndefinedKeys } from '~/server/removeUndefinedKeys.utils';


interface AlternanceQueryFiltre extends ParsedUrlQuery {
	codeRomes?: string
	codeCommune?: string
	distanceCommune?: string
	latitudeCommune?: string
	longitudeCommune?: string
}

export class AlternanceService {
	constructor(private httpClientService: HttpClientService) {}

	async rechercherAlternance(query: AlternanceQueryParams): Promise<Either<ResultatRechercheAlternance>> {
		const filteredQuery = this.filtrerQuery(query);
		const sanitizedQuery = removeUndefinedKeys(filteredQuery);
		const queryString = stringify(sanitizedQuery);
		return this.httpClientService.get<ResultatRechercheAlternance>(`alternances?${queryString}`);
	}

	private filtrerQuery(query: AlternanceQueryParams): AlternanceQueryFiltre {
		return {
			codeCommune: query.codeCommune,
			// FIXME (GAFI 28-08-2023): Idéalement on aimerait ne pas maltraiter les query params :
			//	devrait être `?codeRomes=A1234&codeRomes=B5678`
			//	actuellement géré en back avec le format `?codeRomes=A1234,B5678` (en décodé)
			codeRomes: query.codeRomes?.toString(),
			distanceCommune: query.distanceCommune,
			latitudeCommune: query.latitudeCommune,
			longitudeCommune: query.longitudeCommune,
		};
	}
}
