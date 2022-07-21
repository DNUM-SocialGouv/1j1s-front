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
      return mapper(responseInCache, codePostal);
    } else {
      const response = await this.poleEmploiHttpClientService.get<RésultatsRéférentielCommunesResponse[]>(
        'partenaire/offresdemploi/v2/referentiel/communes',
      );
      switch (response.instance) {
        case 'success': {
          this.cacheService.set(this.CACHE_KEY, response.result.data, 24);
          return mapper(response.result.data, codePostal);
        }
        case 'failure': return codePostal;
      }
    }
  };
}

function mapper(response: RésultatsRéférentielCommunesResponse[], codePostalToFindInRéférentiel: string): string {
  const finded = response.find((response) => response.codePostal === codePostalToFindInRéférentiel);
  return finded ? finded.code : codePostalToFindInRéférentiel;
}

interface RésultatsRéférentielCommunesResponse {
  code: string
  codePostal: string
}
