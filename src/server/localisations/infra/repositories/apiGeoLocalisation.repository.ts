import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { Localisation } from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import {
  ApiDecoupageAdministratifResponse,
} from '~/server/localisations/infra/repositories/apiGeoLocalisation.response';
import { mapLocalisationList } from '~/server/localisations/infra/repositories/apiLocalisation.mapper';
import { HttpClientService } from '~/server/services/http/httpClientService';
import { LoggerService } from '~/server/services/logger.service';

export class ApiGeoLocalisationRepository implements LocalisationRepository {
  constructor(
    private readonly httpClientService: HttpClientService,
  ) {
  }

  async getCommuneListByNom(communeRecherchée: string): Promise<Either<Localisation[]>> {
    return await this.request(`communes?nom=${communeRecherchée}`);
  }

  async getCommuneListByCodePostal(codePostalRecherchée: string): Promise<Either<Localisation[]>> {
    return await this.request(`communes?codePostal=${codePostalRecherchée}`);
  }

  async getCommuneListByNuméroDépartement(numéroDépartementRecherché: string): Promise<Either<Localisation[]>> {
    return await this.request(`departements/${numéroDépartementRecherché}/communes`);
  }

  async getDépartementListByNom(départementRecherché: string): Promise<Either<Localisation[]>> {
    return await this.request(`departements?nom=${départementRecherché}`);
  }

  async getDépartementListByNuméroDépartement(numéroDépartementRecherché: string): Promise<Either<Localisation[]>> {
    return await this.request(`departements?code=${numéroDépartementRecherché}`);
  }

  async getRégionListByNom(régionRecherchée: string): Promise<Either<Localisation[]>> {
    return await this.request(`regions?nom=${régionRecherchée}`);
  }

  private async request(endpoint: string): Promise<Either<Localisation[]>> {
    try {
      const response = await this.httpClientService.get<ApiDecoupageAdministratifResponse[]>(endpoint);
      return createSuccess(mapLocalisationList(response.data));
    } catch (e) {
      LoggerService.error('[API Localisation] impossible de rechercher');
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    }

  }
}
