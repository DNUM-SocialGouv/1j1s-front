import { stringify } from 'querystring';

import { AlternanceQueryParams } from '~/client/hooks/useAlternanceQuery';
import { HttpClientService } from '~/client/services/httpClient.service';
import { Alternance, RésultatRechercheAlternance } from '~/server/alternances/domain/alternance';
import { Either } from '~/server/errors/either';
import { removeUndefinedKeys } from '~/server/removeUndefinedKeys.utils';

export class AlternanceService {
	constructor(private httpClientService: HttpClientService) {}

	async rechercherAlternance(query: AlternanceQueryParams): Promise<Either<Array<RésultatRechercheAlternance>>> {
		const sanitizedQuery = removeUndefinedKeys(query);
		const queryString = stringify(sanitizedQuery);
		return this.httpClientService.get<Array<Alternance>>(`alternances?${queryString}`);
	}
}
