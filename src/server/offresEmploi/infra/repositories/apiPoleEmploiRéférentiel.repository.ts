import { mapCodeInsee } from '~/server/offresEmploi/infra/repositories/apiPoleEmploi.mapper';
import { CacheService } from '~/server/services/cache/cache.service';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';

export class ApiPoleEmploiRéférentielRepository {

  constructor(
    private poleEmploiHttpClientService: PoleEmploiHttpClientService,
    private cacheService: CacheService,
  ) {
  }

  private CACHE_KEY = 'REFERENTIEL_COMMUNE';

  async findCodeInseeInRéférentielCommune(codePostal: string): Promise<string> {
    const responseInCache = await this.cacheService.get<RésultatsRéférentielCommunesResponse[]>(this.CACHE_KEY);
    if(responseInCache) {
      return mapCodeInsee(responseInCache, codePostal);
    } else {
      const response = await this.poleEmploiHttpClientService.get<RésultatsRéférentielCommunesResponse[], RésultatsRéférentielCommunesResponse[]>(
        'partenaire/offresdemploi/v2/referentiel/communes',
        (data) => data,
      );
      switch (response.instance) {
        case 'success': {
          this.cacheService.set(this.CACHE_KEY, response.result, 24);
          return mapCodeInsee(response.result, codePostal);
        }
        case 'failure': return codePostal;
      }
    }
  };
}

export interface RésultatsRéférentielCommunesResponse {
  code: string
  codePostal: string
}
