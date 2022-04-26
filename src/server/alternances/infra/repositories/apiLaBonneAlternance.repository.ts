import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';
import { LaBonneAlternanceHttpClient } from '~/server/services/http/laBonneAlternanceHttpClient.service';

export class ApiLaBonneAlternanceRepository implements AlternanceRepository {
  constructor(
    private laBonneAlternanceHttpClient: LaBonneAlternanceHttpClient,
  ) {
  }

  async getMétierRecherchéList(métierRecherché: string): Promise<MétierRecherché[]> {
    const response = await this.laBonneAlternanceHttpClient.get<RechercheMetierResponse>(
      `api/V1/metiers?title=${métierRecherché}`,
    );

    return response.data.labelsAndRomes.map((rechercheMetier) => ({
      intitule: rechercheMetier.label,
      répertoireOpérationnelMétiersEmplois: rechercheMetier.romes,
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
