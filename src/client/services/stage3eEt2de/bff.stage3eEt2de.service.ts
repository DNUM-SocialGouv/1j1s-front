import { stringify } from 'querystring';

import { Stage3eEt2deQueryParams } from '~/client/hooks/useStage3eEt2deQuery';
import { HttpClientService } from '~/client/services/httpClient.service';
import { removeUndefinedKeys } from '~/server/removeUndefinedKeys.utils';
import { ResultatRechercheStage3eEt2de } from '~/server/stage-3e-et-2de/domain/stage3eEt2de';

import { Stage3eEt2deService } from './stage3eEt2de.service';

export class BffStage3eEt2deService implements Stage3eEt2deService {
	constructor(private httpClientService: HttpClientService) {}

	public async rechercherStage3eEt2de(query: Stage3eEt2deQueryParams) {
		const queryWithoutUnnecessaryParams = this.removeUnnecessaryParams(query);
		const queryString = stringify(removeUndefinedKeys(queryWithoutUnnecessaryParams));
		return await this.httpClientService.get<ResultatRechercheStage3eEt2de>(`stages-3e-et-2de?${queryString}`);
	}

	private removeUnnecessaryParams(query: Stage3eEt2deQueryParams) {
		return {
			codeMetier: query.codeMetier,
			distanceCommune: query.distanceCommune,
			latitudeCommune: query.latitudeCommune,
			longitudeCommune: query.longitudeCommune,
		};
	}
}
