import { LaBonneAlternanceHttpClient } from "../../../services/http/laBonneAlternanceHttpClient.service";
import { AlternanceRepository } from "../../domain/alternance.repository";
import { MetierRecherche } from "../../domain/metierRecherche";

export class ApiLaBonneAlternanceRepository implements AlternanceRepository {
  constructor(
    private laBonneAlternanceHttpClient: LaBonneAlternanceHttpClient
  ) {}

  async listeMetierRecherche(
    metierRechercher: string
  ): Promise<MetierRecherche[]> {
    const response =
      await this.laBonneAlternanceHttpClient.get<RechercheMetierResponse>(
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
