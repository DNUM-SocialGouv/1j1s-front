import { stringify } from 'querystring';

import { EmploiEuropeQueryParams } from '~/client/hooks/useEmploiEuropeQuery';
import { EmploiEuropeService } from '~/client/services/europe/emploiEurope.service';
import { HttpClientService } from '~/client/services/httpClient.service';
import { ResultatRechercheEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';
import { Either } from '~/server/errors/either';
import { removeUndefinedKeys } from '~/server/removeUndefinedKeys.utils';

export class BffEmploiEuropeService implements EmploiEuropeService{
	constructor(private httpClientService: HttpClientService) {}

	async rechercherEmploiEurope(query: EmploiEuropeQueryParams): Promise<Either<ResultatRechercheEmploiEurope>> {
		const queryString = removeUndefinedKeys(query);
		return await this.httpClientService.get<ResultatRechercheEmploiEurope>(`emplois-europe?${stringify(queryString)}`);
	}
}
