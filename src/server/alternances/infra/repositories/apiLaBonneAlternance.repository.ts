import { AlternanceFiltre, RésultatsRechercheAlternance } from '~/server/alternances/domain/alternance';
import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';
import { mapAlternance } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';
import { MatchasResponse } from '~/server/alternances/infra/repositories/matchasResponse.type';
import { PeJobsResponse } from '~/server/alternances/infra/repositories/peJobsResponse.type';
import { LaBonneAlternanceHttpClient } from '~/server/services/http/laBonneAlternanceHttpClient.service';

export class ApiLaBonneAlternanceRepository implements AlternanceRepository {
  constructor(
    private laBonneAlternanceHttpClient: LaBonneAlternanceHttpClient,
  ) {
  }

  // adresse mail à changer c'est pour identifier l'appelant idéalement une adresse mail de contact dnum
  private REQUIRED_PARAMETER_FOR_MA_BONNE_ALTERNANCE = '1j1s@octo.com';

  async getMétierRecherchéList(métierRecherché: string): Promise<MétierRecherché[]> {
    const response = await this.laBonneAlternanceHttpClient.get<RechercheMetierResponse>(
      `metiers?title=${métierRecherché}`,
    );

    return response.data.labelsAndRomes.map((rechercheMetier) => ({
      codeROMEList: rechercheMetier.romes,
      intitulé: rechercheMetier.label,
    }));
  }

  async getAlternanceList(alternanceFiltre: AlternanceFiltre): Promise<RésultatsRechercheAlternance> {
    const response = await this.laBonneAlternanceHttpClient.get<AlternanceResponse>(
      `jobs?romes=${alternanceFiltre.codeRomeList.toString()}&caller=${this.REQUIRED_PARAMETER_FOR_MA_BONNE_ALTERNANCE}`,
    );

    const résultats = mapAlternance(response.data);

    return {
      nombreRésultats: résultats.length,
      résultats,
    };
  }
}

interface RechercheMetierResponse {
  labelsAndRomes: RechercheMetierDataResponse[];
}

interface RechercheMetierDataResponse {
  label: string;
  romes: string[];
}

export interface AlternanceResponse {
  peJobs: PeJobsResponse,
  matchas: MatchasResponse,
}
