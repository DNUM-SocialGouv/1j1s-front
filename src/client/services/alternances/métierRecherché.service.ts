import { HttpClientService } from '~/client/services/httpClient.service';
import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';

export class MétierRecherchéService {

  constructor(private httpClientService: HttpClientService) {}

  async rechercherMétier(intitulé: string): Promise<MétierRecherché[]> {
    const response = await this.httpClientService.get<MétierRecherché[]>(`alternances/metiers/search?intitule=${intitulé}`);
    return response.data;
  }

}
