import { AlternanceRepository } from "~/server/alternances/domain/alternance.repository";
import { MetierRecherche } from "~/server/alternances/domain/metierRecherche";
import { LaBonneAlternanceHttpClient } from "~/server/services/http/laBonneAlternanceHttpClient.service";

export class ApiLaBonneAlternanceRepository implements AlternanceRepository {
  constructor(
    private laBonneAlternanceHttpClient: LaBonneAlternanceHttpClient
  ) {}

  async getMétierRecherchéList(
    metierRechercher: string
  ): Promise<MetierRecherche[]> {
    const response =
      await this.laBonneAlternanceHttpClient.get<RechercheMetierResponse>(
        "api/V1/metiers?title=" + metierRechercher
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
