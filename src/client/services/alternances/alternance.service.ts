import { AppRawDataStorage } from '~/client/cache/appRawDataStorage';
import { Cachable, cache } from '~/client/cache/cacheDecorator';
import { HttpClientService } from '~/client/services/httpClient.service';
import { RésultatsRechercheAlternance } from '~/server/alternances/domain/alternance';

export class AlternanceService extends Cachable {

  constructor(private httpClientService: HttpClientService, protected appRawDataStorage: AppRawDataStorage) {
    super(appRawDataStorage);
  }

  @cache({ key: 'rechercherAlternance' })
  async rechercherAlternance(queryString = ''): Promise<RésultatsRechercheAlternance> {
    console.log(`alternances?${queryString}`);
    const response = await this.httpClientService.get<RésultatsRechercheAlternance>(`alternances?${queryString}`);
    return response.data;
  }

}
