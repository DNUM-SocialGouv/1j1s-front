import { Localisation } from '~/server/localisations/domain/localisation';
import { RésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées';
import { ApiAdresseResponse } from '~/server/localisations/infra/repositories/apiAdresse.response';
import { ApiDecoupageAdministratifResponse } from '~/server/localisations/infra/repositories/apiGeo.response';

export function mapLocalisationList(response: ApiDecoupageAdministratifResponse[]): Localisation[] {
	return response.map((commune) => ({
		code: commune.codesPostaux ? commune.codesPostaux[0] : commune.code,
		nom: commune.nom,
	}));
}

export const getCodeRegion = (response: ApiDecoupageAdministratifResponse[]): string =>  {
	if (response.length === 0 || !response[0].codeRegion) {
		throw new Error('Il n‘y a pas de code région associé au code postal fourni');
	}
	return response[0].codeRegion;
};

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
