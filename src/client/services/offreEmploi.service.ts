import { AxiosResponse } from 'axios';

import { HttpClientService } from '~/client/services/httpClient.service';
import { RésultatsRechercheOffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';


export class OffreEmploiService {
  constructor(private readonly httpClientService:HttpClientService ) {
  }

  async rechercherOffreEmploi(filtre: string): Promise<AxiosResponse<RésultatsRechercheOffreEmploi>> {
    const response = await this.httpClientService.get<RésultatsRechercheOffreEmploi>(`emplois?page=1&motsCles=${filtre}`);
    return response;
  }
}
