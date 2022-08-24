import { HttpClientService } from '~/client/services/httpClient.service';
import { FicheMétierResult } from '~/server/fiche-metier/infra/repositories/ficheMetierMeilisearch.repository';

export class FicheMetierService {
  constructor(private httpClient: HttpClientService) {}
	
  async rechercherFichesMétier(query: string) {
    await this.httpClient.get<FicheMétierResult>(`fiche-metier?${query}`);
  }
}
