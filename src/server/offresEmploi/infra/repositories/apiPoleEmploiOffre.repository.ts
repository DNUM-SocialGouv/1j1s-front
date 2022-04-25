import { OffreEmploi } from "~/server/offresEmploi/domain/offreEmploi";
import { OffreEmploiRepository } from "~/server/offresEmploi/domain/offreEmploi.repository";
import { PoleEmploiHttpClientService } from "~/server/services/http/poleEmploiHttpClient.service";

export class ApiPoleEmploiOffreRepository implements OffreEmploiRepository {
  constructor(
    private poleEmploiHttpClientService: PoleEmploiHttpClientService
  ) {}

  async listeOffreEmploi(): Promise<OffreEmploi[]> {
    const response =
      await this.poleEmploiHttpClientService.get<OffreEmploiResponse>(
        "partenaire/offresdemploi/v2/offres/search?range=0-49"
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
