import * as Sentry from '@sentry/nextjs';
import * as CaptureContext from '@sentry/types';

import { Adresse } from '~/server/localisations/domain/adresse';
import { Localisation } from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { ApiAdresseHttpClientService } from '~/server/services/http/apiAdresseHttpClient.service';
import { ApiGeoHttpClientService } from '~/server/services/http/apiGeoHttpClient.service';

export class ApiGeoLocalisationRepository implements LocalisationRepository {
  constructor(
    private readonly apiGeoHttpClientService: ApiGeoHttpClientService,
    private readonly apiAdresseHttpClientService: ApiAdresseHttpClientService,
    private readonly apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,
  ) {
  }

  API_GEO_GOUV_PREFIX_LOG = 'API_GEO_GOUV';

  async getAdresseList(adresseRecherchée: string): Promise<Adresse[]> {
    let response;

    try {
      response = await this.apiAdresseHttpClientService.get<ApiGeoAdresseResponse>(
        `search/?q=${adresseRecherchée}`,
      );
      return response.data.features.map((adresse) => ({
        codeInsee: adresse.properties.citycode,
        libelle: adresse.properties.label,
        ville: adresse.properties.city,
      }));
    } catch (e: unknown) {
      Sentry.captureMessage(`${this.API_GEO_GOUV_PREFIX_LOG} ${e}`, CaptureContext.Severity.Error);
      Sentry.captureMessage(`${this.API_GEO_GOUV_PREFIX_LOG} ${JSON.stringify(response)}`, CaptureContext.Severity.Error);
      return [];
    }
  }

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
      Sentry.captureMessage(`${this.API_GEO_GOUV_PREFIX_LOG} ${JSON.stringify(response)}`, CaptureContext.Severity.Error);
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
      Sentry.captureMessage(`${this.API_GEO_GOUV_PREFIX_LOG} ${JSON.stringify(response)}`, CaptureContext.Severity.Error);
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
      Sentry.captureMessage(`${this.API_GEO_GOUV_PREFIX_LOG} ${JSON.stringify(response)}`, CaptureContext.Severity.Error);
      return [];
    }
  }
}

interface ApiGeoAdresseResponse {
  features: ApiGeoAdresseFeaturesResponse[];
}

interface ApiGeoAdresseFeaturesResponse {
  properties: ApiGeoAdressePropertiesResponse;
}

interface ApiGeoAdressePropertiesResponse {
  label: string;
  city: string;
  citycode: string;
}

interface ApiDecoupageAdministratifResponse {
  nom: string;
  code: string;
  codesPostaux: string[];
}
