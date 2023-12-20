import { useRouter } from 'next/router';

import { getSingleQueryParam } from '~/client/utils/queryParams.utils';

export interface CommuneQueryParams {
	codeCommune?: string
	latitudeCommune?: string
	longitudeCommune?: string
	codePostal?: string
	ville?: string
	libelleCommune?: string
} // FIXME (SULI 20-12-2023): le nom des champs est intimement lié au "name" des inputs hidden dans combobox commune :(
// FIXME à cause de getFormAsQuery

export function useCommuneQuery(): CommuneQueryParams {
	const { query } = useRouter();
	return {
		codeCommune: getSingleQueryParam(query.codeCommune),
		codePostal: getSingleQueryParam(query.codePostal),
		latitudeCommune: getSingleQueryParam(query.latitudeCommune),
		libelleCommune: getSingleQueryParam(query.libelleCommune),
		longitudeCommune: getSingleQueryParam(query.longitudeCommune),
		ville: getSingleQueryParam(query.ville),
	};
}

export function aCommuneQuery(overrides?: Partial <CommuneQueryParams>): CommuneQueryParams {
	return {
		codeCommune: '75056',
		codePostal: '75006',
		latitudeCommune: '48.859',
		libelleCommune: 'Paris (75006)',
		longitudeCommune: '2.347',
		ville: 'Paris',
		...overrides,
	};
}
