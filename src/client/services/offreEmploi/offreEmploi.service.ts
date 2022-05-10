import { AppRawDataStorage } from '~/client/cache/appRawDataStorage';
import {
  Cachable,
  cache,
} from '~/client/cache/cacheDecorator';
import { HttpClientService } from '~/client/services/httpClient.service';
import { RésultatsRechercheOffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';


export class OffreEmploiService extends Cachable {

  constructor(private readonly httpClientService: HttpClientService, protected readonly appRawDataStorage: AppRawDataStorage ) {
    super(appRawDataStorage);
  }

  @cache({ key: 'rechercherOffreEmploi' })
  async rechercherOffreEmploi(queryString = ''): Promise<RésultatsRechercheOffreEmploi> {
    const response = await this.httpClientService.get<RésultatsRechercheOffreEmploi>(`emplois?page=1&${queryString}`);
    return response.data;
  }
}
