import { mapCodeInsee } from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploi.mapper';
import { CacheService } from '~/server/services/cache/cache.service';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';

export class ApiPoleEmploiRéférentielRepository {

	constructor(
    private httpClientServiceWithAuthentification: AuthenticatedHttpClientService,
    private cacheService: CacheService,
	) {}

	private CACHE_KEY = 'REFERENTIEL_COMMUNE';

	async findCodeInseeInRéférentielCommune(code: string): Promise<string> {
		const responseInCache = await this.cacheService.get<RésultatsRéférentielCommunesResponse[]>(this.CACHE_KEY);
		if (responseInCache) {
			return mapCodeInsee(responseInCache, code);
		} else {
			const response = await this.httpClientServiceWithAuthentification.get<RésultatsRéférentielCommunesResponse[]>('/communes');
			this.cacheService.set(this.CACHE_KEY, response.data, 24);
			return mapCodeInsee(response.data, code);
		}
	};
}

export interface RésultatsRéférentielCommunesResponse {
  code: string
  codePostal: string
}
