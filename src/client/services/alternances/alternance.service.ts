import { HttpClientService } from '~/client/services/httpClient.service';
import { RésultatsRechercheAlternance } from '~/server/alternances/domain/alternance';

export class AlternanceService {

  constructor(private httpClientService: HttpClientService) {}

  async rechercherAlternance(queryString = ''): Promise<RésultatsRechercheAlternance> {
    const response = await this.httpClientService.get<RésultatsRechercheAlternance>(`alternances?${queryString}`);
    return response.data;
  }

}
