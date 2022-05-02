import { HttpClientService } from '~/client/services/httpClient.service';
import { RésultatsRechercheOffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';


export class OffreEmploiService {
  constructor(private readonly httpClientService: HttpClientService ) {
  }

  async rechercherOffreEmploi(formData: FormData): Promise<RésultatsRechercheOffreEmploi> {
    console.log(formData.get('métierRecherché'));
    console.log(formData.getAll('typeDeContrat'));
    // emplois?page=1&motsCles=${filtre.motClé}&typeDeContrats=${filtre.typeDeContrats.toString()}
    const response = await this.httpClientService.get<RésultatsRechercheOffreEmploi>('');
    return response.data;
  }
}
