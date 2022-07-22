import { Localisation } from '~/server/localisations/domain/localisation';
import { RésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées';
import { ApiAdresseResponse } from '~/server/localisations/infra/repositories/apiAdresse.response';
import {
  ApiDecoupageAdministratifResponse,
} from '~/server/localisations/infra/repositories/apiGeoLocalisation.response';

export function mapLocalisationList(response: ApiDecoupageAdministratifResponse[]): Localisation[] {
  return response.map((commune) => ({
    code: commune.codesPostaux[0],
    nom: commune.nom,
  }));
}

export function mapRésultatsRechercheCommune(response: ApiAdresseResponse): RésultatsRechercheCommune {
  return {
    résultats: response.features.map(({ properties, geometry }) => ({
      code: properties.citycode,
      coordonnées: {
        latitude: geometry.coordinates[1],
        longitude: geometry.coordinates[0],
      },
      libelle: properties.label,
      ville: properties.city,
    })),
  };
}
