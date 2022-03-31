import { HttpClientService } from "../../../services/http/HttpClientService";
import { AlternanceRepository } from "../../domain/AlternanceRepository";
import { MetierRecherche } from "../../domain/MetierRecherche";

export class ApiLaBonneAlternanceRepository implements AlternanceRepository {
  constructor(private httpClientService: HttpClientService) {}

  async listeMetierRecherche(
    metierRechercher: string
  ): Promise<MetierRecherche[]> {
    const response = await this.httpClientService.get<RechercheMetierResponse>(
      "https://labonnealternance.apprentissage.beta.gouv.fr/api/V1/metiers?title=" +
        metierRechercher
    );

    return response.data.labelsAndRomes.map((rechercheMetier) => ({
      intitule: rechercheMetier.label,
      repertoireOperationnelMetiersEmplois: rechercheMetier.romes,
    }));
  }
}

interface RechercheMetierResponse {
  labelsAndRomes: RechercheMetierDataResponse[];
}

interface RechercheMetierDataResponse {
  label: string;
  romes: string[];
}
