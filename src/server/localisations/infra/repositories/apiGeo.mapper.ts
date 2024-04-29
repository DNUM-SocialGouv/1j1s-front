import { Localisation } from '~/server/localisations/domain/localisation';
import { ApiDecoupageAdministratifResponse } from '~/server/localisations/infra/repositories/apiGeo.response';

export function mapLocalisationList(response: ApiDecoupageAdministratifResponse[]): Localisation[] {
	return response.map((commune) => {
		return {
			code: commune.codesPostaux ? commune.codesPostaux[0] : commune.code,
			nom: commune.nom,
		};
	});
}

export const getCodeRegion = (response: ApiDecoupageAdministratifResponse[]): string => {
	if (response.length === 0 || !response[0].codeRegion) {
		throw new Error('Il n‘y a pas de code région associé au code postal fourni');
	}
	return response[0].codeRegion;
};

