import * as Sentry from '@sentry/nextjs';
import * as CaptureContext from '@sentry/types';

import { createSuccess } from '~/server/errors/either';
import { Localisation } from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import {
  ApiDecoupageAdministratifResponse,
} from '~/server/localisations/infra/repositories/apiGeoLocalisation.response';
import { mapLocalisationList } from '~/server/localisations/infra/repositories/apiLocalisation.mapper';
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
    return await this.request(`communes?nom=${communeRecherchée}`);
  }

  async getCommuneListByCodePostal(codePostalRecherchée: string): Promise<Localisation[]> {
    return await this.request(`communes?codePostal=${codePostalRecherchée}`);
  }

  async getCommuneListByNuméroDépartement(numéroDépartementRecherché: string): Promise<Localisation[]> {
    return await this.request(`departements/${numéroDépartementRecherché}/communes`);
  }

  async getDépartementListByNom(départementRecherché: string): Promise<Localisation[]> {
    return await this.request(`departements?nom=${départementRecherché}`);
  }

  async getDépartementListByNuméroDépartement(numéroDépartementRecherché: string): Promise<Localisation[]> {
    return await this.request(`departements?code=${numéroDépartementRecherché}`);
  }

  async getRégionListByNom(régionRecherchée: string): Promise<Localisation[]> {
    return await this.request(`regions?nom=${régionRecherchée}`);
  }

  private async request(endpoint: string): Promise<Localisation[]> {
    const response = await this.apiGeoHttpClientService.get<ApiDecoupageAdministratifResponse[], Localisation[]>(
      endpoint,
      mapLocalisationList,
    );

    switch (response.instance) {
      case 'success': return response.result.data;
      case 'failure': return [];
    }
  }
}
