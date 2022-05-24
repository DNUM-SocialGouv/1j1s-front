import { Alternance, AlternanceFiltre, RésultatsRechercheAlternance } from '~/server/alternances/domain/alternance';
import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';
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

    const alternanceFromPoleEmploiList = response.data.peJobs.results.map<Alternance>((peJob) => ({
      description: peJob.job.description,
      entreprise: {
        logo: null,
        nom: peJob.company.name,
      },
      id: peJob.job.id,
      intitulé: peJob.title,
    }));

    const alternanceFromMatchaList = response.data.matchas.results.map<Alternance>((matcha) => ({
      description: matcha.job.romeDetails.definition,
      entreprise: {
        logo: matcha.company.logo,
        nom: matcha.company.name,
      },
      id: matcha.job.id,
      intitulé: matcha.title,
    }));

    const résultats = [...alternanceFromPoleEmploiList, ...alternanceFromMatchaList];

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

interface AlternanceResponse {
  peJobs: PeJobsResponse,
  matchas: MatchasResponse,
}
