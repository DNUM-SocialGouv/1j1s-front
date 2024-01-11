import { stringify } from 'querystring';

import { Stage3emeEt2ndQueryParams } from '~/client/hooks/useStage3emeEt2ndQuery';
import { HttpClientService } from '~/client/services/httpClient.service';
import { removeUndefinedKeys } from '~/server/removeUndefinedKeys.utils';
import { ResultatRechercheStage3emeEt2nd } from '~/server/stage-3eme-et-2nd/domain/stage3emeEt2nd';

import { Stage3emeEt2ndService } from './stage3emeEt2nd.service';

export class BffStage3emeEt2ndService implements Stage3emeEt2ndService {
	constructor(private httpClientService: HttpClientService) {}

	public async rechercherStage3emeEt2nd(query: Stage3emeEt2ndQueryParams) {
		const queryWithoutUnnecessaryParams = this.removeUnnecessaryParams(query);
		const queryString = stringify(removeUndefinedKeys(queryWithoutUnnecessaryParams));
		return await this.httpClientService.get<ResultatRechercheStage3emeEt2nd>(`stages-3eme-et-2nd?${queryString}`);
	}

	private removeUnnecessaryParams(query: Stage3emeEt2ndQueryParams) {
		return {
			codeMetier: query.codeMetier,
			distanceCommune: query.distanceCommune,
			latitudeCommune: query.latitudeCommune,
			longitudeCommune: query.longitudeCommune,
		};
	}
}
