import { Either } from '~/server/errors/either';
import { RésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées';
import {
  LocalisationAvecCoordonnéesRepository,
} from '~/server/localisations/domain/localisationAvecCoordonnées.repository';
import { ApiAdresseResponse } from '~/server/localisations/infra/repositories/apiAdresse.response';
import { mapRésultatsRechercheCommune } from '~/server/localisations/infra/repositories/apiLocalisation.mapper';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export class ApiAdresseRepository implements LocalisationAvecCoordonnéesRepository {
  constructor(
    private readonly httpClientService: HttpClientService,
  ) {
  }

  async getCommuneList(adresseRecherchée: string): Promise<Either<RésultatsRechercheCommune>> {
    return await this.httpClientService.get<ApiAdresseResponse, RésultatsRechercheCommune>(
      `search/?q=${adresseRecherchée}&type=municipality&limit=21`,
      mapRésultatsRechercheCommune,
    );
  }
}
