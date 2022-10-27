import { HttpClientService } from '~/client/services/httpClient.service';
import { Either } from '~/server/errors/either';
import { RésultatsRechercheOffre } from '~/server/offres/domain/offre';

export class OffreEmploiService {

  constructor(private httpClientService: HttpClientService) {}

  async rechercherOffreEmploi(query: string): Promise<Either<RésultatsRechercheOffre>> {
    return await this.httpClientService.get<RésultatsRechercheOffre>(`emplois?${query}`);
  }

  async rechercherJobÉtudiant(query: string): Promise<Either<RésultatsRechercheOffre>> {
    return await this.httpClientService.get<RésultatsRechercheOffre>(`jobs-etudiants?${query}`);
  }
}
