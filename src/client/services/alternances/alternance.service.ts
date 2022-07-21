import { HttpClientService } from '~/client/services/httpClient.service';
import { RésultatsRechercheAlternance } from '~/server/alternances/domain/alternance';
import { Either } from '~/server/errors/either';

export class AlternanceService {

  constructor(private httpClientService: HttpClientService) {}

  async rechercherAlternance(queryString = ''): Promise<Either<RésultatsRechercheAlternance>> {
    return await this.httpClientService.get<RésultatsRechercheAlternance>(`alternances?${queryString}`);
  }
}
