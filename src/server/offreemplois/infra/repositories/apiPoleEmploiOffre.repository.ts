import { ClientService } from "../../../services/http/client.service";
import { PoleEmploiHttpClientService } from "../../../services/http/poleEmploiHttpClient.service";
import { OffreEmploi } from "../../domain/offreEmploi";
import { OffreEmploiRepository } from "../../domain/offreEmploi.repository";

export class ApiPoleEmploiOffreRepository implements OffreEmploiRepository {
  constructor(
    private poleEmploiHttpClientService: PoleEmploiHttpClientService
  ) {}

  async listeOffreEmploi(): Promise<OffreEmploi[]> {
    const response =
      await this.poleEmploiHttpClientService.get<OffreEmploiResponse>(
        "https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres/search?range=0-49"
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
