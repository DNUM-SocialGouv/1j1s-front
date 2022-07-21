import { HttpClientService } from '~/client/services/httpClient.service';
import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';
import { Success } from '~/server/errors/either';

export class MétierRecherchéService {

  constructor(private httpClientService: HttpClientService) {}

  async rechercherMétier(intitulé: string): Promise<MétierRecherché[]> {
    const response = await this.httpClientService.get<MétierRecherché[]>(`metiers/search?intitule=${intitulé}`);
    // TODO gérer les erreurs dans la liste déroulante ?
    return (response as Success<MétierRecherché[]>).result;
  }

}
