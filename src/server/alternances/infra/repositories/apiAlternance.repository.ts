import { AlternanceFiltre, AlternanceId, RésultatsRechercheAlternance } from '~/server/alternances/domain/alternance';
import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';
import { ConsulterOffreAlternanceMatcha } from '~/server/alternances/infra/repositories/alternance.type';
import {
  mapMétierRecherchéList,
  mapOffreAlternanceMatcha,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';
import { AlternanceMatchasResponse } from '~/server/alternances/infra/repositories/responses/alternanceResponse.type';
import {
  RechercheMetierResponse,
} from '~/server/alternances/infra/repositories/responses/rechercheMetierResponse.type';
import { Either } from '~/server/errors/either';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';
import { ApiPoleEmploiOffreRepository } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.repository';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export class ApiAlternanceRepository implements AlternanceRepository {

  constructor(
    private httpClientService: HttpClientService,
    private apiPoleEmploiOffreRepository: ApiPoleEmploiOffreRepository,
  ) {
  }

  async getMétierRecherchéList(métierRecherché: string): Promise<MétierRecherché[]> {
    const normalizedMétierRecherché = ApiAlternanceRepository.normalizeStringWithoutDiacriticGlyph(métierRecherché);
    const response = await this.httpClientService.get<RechercheMetierResponse, MétierRecherché[]>(
      `metiers?title=${normalizedMétierRecherché}`,
      mapMétierRecherchéList,
    );
    switch (response.instance) {
      case 'success':
        return response.result.filter((métierRecherché) => {
          return ApiAlternanceRepository
            .normalizeStringWithoutDiacriticGlyph(métierRecherché.intitulé)
            .indexOf(normalizedMétierRecherché) >= 0;
        });
      case 'failure': return [];
    }
  }

  async searchAlternance(alternanceFiltre: AlternanceFiltre): Promise<RésultatsRechercheAlternance> {
    const localisation = alternanceFiltre.code ? { code: alternanceFiltre.code, type: TypeLocalisation.COMMUNE } : undefined;
    const response = await this.apiPoleEmploiOffreRepository.searchOffreEmploi({
      codeROMEs: alternanceFiltre.codeRomeList.slice(0, 3),
      grandDomaineList: [],
      localisation,
      natureContrats: ['E2','FS'],
      nombreOffreParPage: 50,
      page: 1,
      typeDeContratList: [],
    });
    switch (response.instance) {
      case 'success': {
        return {
          nombreRésultats: response.result.nombreRésultats,
          résultats: response.result.résultats.map((result) => ({
            adresse: undefined,
            contact: undefined,
            description: result.description,
            entreprise: undefined,
            from: 'peJob',
            id: result.id,
            intitulé: result.intitulé,
            niveauRequis: undefined,
            typeDeContrats: ['Contrat apprentissage'],
            ville: result.lieuTravail,
            étiquetteList: result.étiquetteList,
          })),
        };
      }
      case 'failure': {
        return {
          nombreRésultats: 0,
          résultats: [],
        };
      }
    }
  }

  async getOffreAlternance(id: AlternanceId): Promise<Either<ConsulterOffreAlternanceMatcha>> {
    return await this.httpClientService.get<AlternanceMatchasResponse, ConsulterOffreAlternanceMatcha>(
      `jobs/matcha/${id}`,
      mapOffreAlternanceMatcha,
    );
  }

  private static normalizeStringWithoutDiacriticGlyph(string: string) {
    return string
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');
  }
}

