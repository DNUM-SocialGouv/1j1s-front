import { HttpClientService } from '~/client/services/httpClient.service';
import { Either } from '~/server/errors/either';
import { RésultatsRechercheOffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

export class OffreEmploiService {

  constructor(private httpClientService: HttpClientService) {}

  async récupérerEchantillonOffreEmploi(): Promise<Either<RésultatsRechercheOffreEmploi>> {
    return await this.httpClientService.get<RésultatsRechercheOffreEmploi>('emplois');
  }

  async rechercherOffreEmploi(query: string): Promise<Either<RésultatsRechercheOffreEmploi>> {
    return await this.httpClientService.get<RésultatsRechercheOffreEmploi>(`emplois?${query}`);
  }

  async rechercherJobÉtudiant(query: string): Promise<Either<RésultatsRechercheOffreEmploi>> {
    return await this.httpClientService.get<RésultatsRechercheOffreEmploi>(`jobs-etudiants?${query}`);
  }

  async récupérerEchantillonJobÉtudiant(): Promise<Either<RésultatsRechercheOffreEmploi>> {
    return await this.httpClientService.get<RésultatsRechercheOffreEmploi>('jobs-etudiants');
  }
}
