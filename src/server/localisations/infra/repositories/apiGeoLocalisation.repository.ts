import { Either } from '~/server/errors/either';
import { Localisation } from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import {
  ApiDecoupageAdministratifResponse,
} from '~/server/localisations/infra/repositories/apiGeoLocalisation.response';
import { mapLocalisationList } from '~/server/localisations/infra/repositories/apiLocalisation.mapper';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export class ApiGeoLocalisationRepository implements LocalisationRepository {
  constructor(
    private readonly apiGeoHttpClientService: HttpClientService,
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
    return await this.apiGeoHttpClientService.get<ApiDecoupageAdministratifResponse[], Localisation[]>(
      endpoint,
      mapLocalisationList,
    );
  }
}
