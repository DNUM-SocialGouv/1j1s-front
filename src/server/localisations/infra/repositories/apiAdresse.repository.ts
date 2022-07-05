import * as Sentry from '@sentry/nextjs';
import * as CaptureContext from '@sentry/types';
import axios from 'axios';

import {
  createFailure,
  createSuccess,
  Either,
} from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';
import { RésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées';
import { LocalisationAvecCoordonnéesRepository } from '~/server/localisations/domain/localisationAvecCoordonnées.repository';
import { ApiAdresseHttpClientService } from '~/server/services/http/apiAdresseHttpClient.service';

export class ApiAdresseRepository implements LocalisationAvecCoordonnéesRepository {
  constructor(
    private readonly apiAdresseHttpClientService: ApiAdresseHttpClientService,
  ) {
  }

  API_ADRESSE_PREFIX_LOG = 'API_ADRESSE';

  async getCommuneList(adresseRecherchée: string): Promise<Either<RésultatsRechercheCommune>> {
    let response;
    try {
      response = await this.apiAdresseHttpClientService.get<ApiAdresseResponse>(
        `search/?q=${adresseRecherchée}&type=municipality&limit=20`,
      );
      const communeList = response.data.features.map(({ properties, geometry }) => ({
        code: properties.citycode,
        coordonnées: {
          latitude: geometry.coordinates[1],
          longitude: geometry.coordinates[0],
        },
        libelle: properties.label,
        ville: properties.city,
      }));
      return createSuccess({ résultats: communeList });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 500) {
          return createFailure(ErrorType.SERVICE_INDISPONIBLE);
        }
      }
      Sentry.captureMessage(`${this.API_ADRESSE_PREFIX_LOG} ${e}`, CaptureContext.Severity.Error);
      return createFailure(ErrorType.ERREUR_INATTENDUE);
    }
  }
}

interface ApiAdresseResponse {
  features: ApiAdresseFeaturesResponse[];
}

interface ApiAdresseFeaturesResponse {
  properties: ApiAdressePropertiesResponse;
  geometry: ApiAdresseGeometryResponse;

}

interface ApiAdressePropertiesResponse {
  label: string;
  city: string;
  citycode: string;
}

interface  ApiAdresseGeometryResponse {
  coordinates: [number, number]
}
