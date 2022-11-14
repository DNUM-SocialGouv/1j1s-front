import { Localisation } from '~/client/services/localisations/domain/localisation';
import { RésultatsRechercheCommune } from '~/client/services/localisations/domain/localisationAvecCoordonnées';
import { ApiAdresseResponse } from '~/client/services/localisations/infra/repositories/apiAdresse.response';
import {
  ApiDecoupageAdministratifResponse,
} from '~/client/services/localisations/infra/repositories/apiGeoLocalisation.response';

export function mapLocalisationList(response: ApiDecoupageAdministratifResponse[]): Localisation[] {
  return response.map((commune) => ({
    code: commune.codesPostaux ? commune.codesPostaux[0] : commune.code,
    nom: commune.nom,
  }));
}

export function mapRésultatsRechercheCommune(response: ApiAdresseResponse): RésultatsRechercheCommune {
  return {
    résultats: response.features.map(({ properties, geometry }) => ({
      code: properties.citycode,
      codePostal: properties.postcode,
      coordonnées: {
        latitude: geometry.coordinates[1],
        longitude: geometry.coordinates[0],
      },
      libelle: `${properties.label} (${properties.postcode})`,
      ville: properties.city,
    })),
  };
}
