import { HttpClientService } from '~/client/services/httpClient.service';
import { Either } from '~/server/errors/either';
import { RésultatsRechercheOffre } from '~/server/offres/domain/offre';

export class OffreService {

  constructor(private httpClientService: HttpClientService) {}

  async rechercherOffreEmploi(query: string): Promise<Either<RésultatsRechercheOffre>> {
    return this.httpClientService.get<RésultatsRechercheOffre>(`jobs?${query}`);
  }

  async rechercherJobÉtudiant(query: string): Promise<Either<RésultatsRechercheOffre>> {
    return this.httpClientService.get<RésultatsRechercheOffre>(`jobs-etudiants?${query}`);
  }

  async rechercherAlternance(query: string): Promise<Either<RésultatsRechercheOffre>> {
    return this.httpClientService.get<RésultatsRechercheOffre>(`alternances?${query}`);
  }
}
