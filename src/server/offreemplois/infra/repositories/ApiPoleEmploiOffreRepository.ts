import { CacheService } from "../../../services/cache/CacheService";
import { HttpClientService } from "../../../services/http/HttpClientService";
import { ApiTokenRepository } from "../../../tokens/infra/ApiTokenRepository";
import { OffreEmploi } from "../../domain/OffreEmploi";
import { OffreEmploiRepository } from "../../domain/OffreEmploiRepository";

export class ApiPoleEmploiOffreRepository implements OffreEmploiRepository {
  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly apiTokenRepository: ApiTokenRepository,
    private readonly cacheService: CacheService
  ) {}

  private OFFRE_EMPLOI_CACHE_KEY = "OFFRE_EMPLOI_CACHE_KEY";

  async listeOffreEmploi(): Promise<OffreEmploi[]> {
    const token = await this.apiTokenRepository.getToken();

    if ((await this.cacheService.get(this.OFFRE_EMPLOI_CACHE_KEY)) === null) {
      const response = await this.httpClientService.get<OffreEmploiResponse>(
        "https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres/search?range=0-49",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const result = response.data.resultats.map((offreEmploi) => ({
        id: offreEmploi.id,
        intitule: offreEmploi.intitule,
      }));

      this.cacheService.set(this.OFFRE_EMPLOI_CACHE_KEY, result);

      return result;
    } else {
      const responseFromCache = await this.cacheService.get(
        this.OFFRE_EMPLOI_CACHE_KEY
      );
      return JSON.parse(responseFromCache!);
    }
  }
}

interface OffreEmploiResponse {
  resultats: OffreEmploiDataResponse[];
}

interface OffreEmploiDataResponse {
  id: string;
  intitule: string;
}
