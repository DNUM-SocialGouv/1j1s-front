import { HttpClientService } from '~/client/services/httpClient.service';
import { RésultatsRechercheOffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';


export class OffreEmploiService {
  constructor(private readonly httpClientService: HttpClientService ) {
  }

  async rechercherOffreEmploi(rechercheForm: Record<string, string>): Promise<RésultatsRechercheOffreEmploi> {
    const queryString = new URLSearchParams(rechercheForm).toString();
    const response = await this.httpClientService.get<RésultatsRechercheOffreEmploi>(`emplois?page=1&${queryString}`);
    return response.data;
  }
}
