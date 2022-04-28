import { HttpClientService } from '~/client/services/httpClient.service';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';


export class OffreEmploiService {
  constructor(private readonly httpClientService:HttpClientService ) {
  }

  async rechercherOffreEmploi(filtre: string) {
    const response = await this.httpClientService.get<OffreEmploi[]>(`emplois?page=1&motsCles=${filtre}`);
    return response;
  }
}
