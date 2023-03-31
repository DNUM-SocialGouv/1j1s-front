import { ParsedUrlQuery, stringify } from 'querystring';

import { AlternanceQueryParams } from '~/client/hooks/useAlternanceQuery';
import { HttpClientService } from '~/client/services/httpClient.service';
import { Alternance, RésultatRechercheAlternance } from '~/server/alternances/domain/alternance';
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

	async rechercherAlternance(query: AlternanceQueryParams): Promise<Either<Array<RésultatRechercheAlternance>>> {
		const filteredQuery = this.filtrerQuery(query);
		const sanitizedQuery = removeUndefinedKeys(filteredQuery);
		const queryString = stringify(sanitizedQuery);
		return this.httpClientService.get<Array<Alternance>>(`alternances?${queryString}`);
	}

	private filtrerQuery(query: AlternanceQueryParams): AlternanceQueryFiltre {
		return {
			codeCommune: query.codeCommune,
			codeRomes: query.codeRomes,
			distanceCommune: query.distanceCommune,
			latitudeCommune: query.latitudeCommune,
			longitudeCommune: query.longitudeCommune,
		};
	}
}
