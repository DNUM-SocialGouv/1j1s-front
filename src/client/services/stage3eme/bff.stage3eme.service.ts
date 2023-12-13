import { stringify } from 'querystring';

import { Stage3emeQueryParams } from '~/client/hooks/useStage3emeQuery';
import { HttpClientService } from '~/client/services/httpClient.service';
import { removeUndefinedKeys } from '~/server/removeUndefinedKeys.utils';
import { MetierStage3eme } from '~/server/stage-3eme/domain/metierStage3eme';
import { ResultatRechercheStage3eme } from '~/server/stage-3eme/domain/stage3eme';

import { Stage3emeService } from './stage3eme.service';

export class BffStage3emeService implements Stage3emeService {
	constructor(private httpClientService: HttpClientService) {}

	async rechercherStage3eme(query: Stage3emeQueryParams) {
		const queryString = stringify(removeUndefinedKeys(query));
		return await this.httpClientService.get<ResultatRechercheStage3eme>(`stages-3eme?${queryString}`);
	}
	
	async rechercherMetier(motCle: string) {
		return await this.httpClientService.get<MetierStage3eme[]>(`stages-3eme/metiers?motCle=${motCle}`);
	}
}
