import { createSuccess, Either } from '~/server/errors/either';
import { RésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées';
import {
  LocalisationAvecCoordonnéesRepository,
} from '~/server/localisations/domain/localisationAvecCoordonnées.repository';
import { ApiAdresseResponse } from '~/server/localisations/infra/repositories/apiAdresse.response';
import { mapRésultatsRechercheCommune } from '~/server/localisations/infra/repositories/apiLocalisation.mapper';
import { ApiAdresseHttpClientService } from '~/server/services/http/apiAdresseHttpClient.service';

export class ApiAdresseRepository implements LocalisationAvecCoordonnéesRepository {
  constructor(
    private readonly apiAdresseHttpClientService: ApiAdresseHttpClientService,
  ) {
  }

  async getCommuneList(adresseRecherchée: string): Promise<Either<RésultatsRechercheCommune>> {
    const response = await this.apiAdresseHttpClientService.get<ApiAdresseResponse, RésultatsRechercheCommune>(
      `search/?q=${adresseRecherchée}&type=municipality&limit=21`,
      mapRésultatsRechercheCommune,
    );

    switch (response.instance) {
      case 'success': return createSuccess(response.result.data);
      case 'failure': return response;
    }
  }
}
