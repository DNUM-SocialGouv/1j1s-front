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
      const codeInsee = responseInCache.find((response) => response.codePostal === codePostal);

      return codeInsee ? codeInsee.code : codePostal;
    } else {
      const response = await this.poleEmploiHttpClientService.get<RésultatsRéférentielCommunesResponse[]>(
        'partenaire/offresdemploi/v2/referentiel/communes',
      );
      const codeInsee = response.data.find((response) => response.codePostal === codePostal);

      this.cacheService.set(this.CACHE_KEY, response.data, 24);

      return codeInsee ? codeInsee.code : codePostal;
    }
  };
}

interface RésultatsRéférentielCommunesResponse {
  code: string
  codePostal: string
}
