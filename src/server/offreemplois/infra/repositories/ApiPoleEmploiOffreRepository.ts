import { OffreEmploiRepository } from "../../domain/OffreEmploiRepository";
import { OffreEmploi } from "../../domain/OffreEmploi";
import { HttpClientService } from "../../../services/http/HttpClientService";
import { ApiTokenRepository } from "../../../tokens/infra/ApiTokenRepository";

export class ApiPoleEmploiOffreRepository implements OffreEmploiRepository {
  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly apiTokenRepository: ApiTokenRepository
  ) {}

  async listeOffreEmploi(): Promise<OffreEmploi[]> {
    const token = await this.apiTokenRepository.getToken();

    const response = await this.httpClientService.get<OffreEmploiResponse>(
      "https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres/search?range=0-49",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data.resultats.map((offreEmploi) => ({
      id: offreEmploi.id,
      intitule: offreEmploi.intitule,
    }));
  }
}

interface OffreEmploiResponse {
  resultats: OffreEmploiDataResponse[];
}

interface OffreEmploiDataResponse {
  id: string;
  intitule: string;
}
