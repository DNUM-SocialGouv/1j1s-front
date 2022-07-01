import * as Sentry from '@sentry/nextjs';
import * as CaptureContext from '@sentry/types';

import { Localisation } from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { ApiGeoHttpClientService } from '~/server/services/http/apiGeoHttpClient.service';

export class ApiGeoLocalisationRepository implements LocalisationRepository {
  constructor(
    private readonly apiGeoHttpClientService: ApiGeoHttpClientService,
    private readonly apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,
  ) {
  }

  API_GEO_GOUV_PREFIX_LOG = 'API_GEO_GOUV';

  async getCommuneListByNom(communeRecherchée: string): Promise<Localisation[]> {
    return await this.requestForSearchByCommune(`communes?nom=${communeRecherchée}`);
  }

  async getCommuneListByCodePostal(codePostalRecherchée: string): Promise<Localisation[]> {
    return await this.requestForSearchByCommune(`communes?codePostal=${codePostalRecherchée}`);
  }

  async getCommuneListByNuméroDépartement(numéroDépartementRecherché: string): Promise<Localisation[]> {
    return await this.requestForSearchByCommune(`departements/${numéroDépartementRecherché}/communes`);
  }

  async getDépartementListByNom(départementRecherché: string): Promise<Localisation[]> {
    return await this.requestForSearchByDépartementOrRegion(`departements?nom=${départementRecherché}`);
  }

  async getDépartementListByNuméroDépartement(numéroDépartementRecherché: string): Promise<Localisation[]> {
    return await this.requestForSearchByDépartementOrRegion(`departements?code=${numéroDépartementRecherché}`);
  }

  async getRégionListByNom(régionRecherchée: string): Promise<Localisation[]> {
    return await this.requestForSearchByDépartementOrRegion(`regions?nom=${régionRecherchée}`);
  }

  async getLocalisationByTypeLocalisationAndCodeInsee(typeLocalisation: string, codeInsee: string): Promise<Localisation | undefined> {
    let response;

    try {
      if(typeLocalisation === 'communes') {
        const realCodeInsee = await this.apiPoleEmploiRéférentielRepository.findCodeInseeInRéférentielCommune(codeInsee);
        response = await this.apiGeoHttpClientService
          .get<ApiDecoupageAdministratifResponse>(`${typeLocalisation}/${realCodeInsee}`);
      } else {
        response = await this.apiGeoHttpClientService
          .get<ApiDecoupageAdministratifResponse>(`${typeLocalisation}/${codeInsee}`);
      }

      const { code, nom } = response.data;

      return {
        code: typeLocalisation === 'communes' ?  response.data.codesPostaux[0] : code,
        nom: nom,
      };
    } catch (e: unknown) {
      Sentry.captureMessage(`${this.API_GEO_GOUV_PREFIX_LOG} ${e}`, CaptureContext.Severity.Error);
      return undefined;
    }
  }

  private async requestForSearchByCommune(endpoint: string): Promise<Localisation[]> {
    let response;

    try {
      response = await this.apiGeoHttpClientService.get<ApiDecoupageAdministratifResponse[]>(endpoint);
      return response.data.map((commune) => ({
        code: commune.codesPostaux[0],
        nom: commune.nom,
      }));
    } catch (e: unknown) {
      Sentry.captureMessage(`${this.API_GEO_GOUV_PREFIX_LOG} ${e}`, CaptureContext.Severity.Error);
      return [];
    }
  }

  private async requestForSearchByDépartementOrRegion(endpoint: string): Promise<Localisation[]> {
    let response;

    try {
      response = await this.apiGeoHttpClientService.get<ApiDecoupageAdministratifResponse[]>(endpoint);

      return response.data.map((localisation) => ({
        code: localisation.code,
        nom: localisation.nom,
      }));
    } catch (e: unknown) {
      Sentry.captureMessage(`${this.API_GEO_GOUV_PREFIX_LOG} ${e}`, CaptureContext.Severity.Error);
      return [];
    }
  }
}

interface ApiDecoupageAdministratifResponse {
  nom: string;
  code: string;
  codesPostaux: string[];
}
