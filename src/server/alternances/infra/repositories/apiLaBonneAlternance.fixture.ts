import { AlternanceFiltre } from '~/server/alternances/domain/alternance';

export function anAlternanceFiltre(): AlternanceFiltre {
	return {
		codeCommune: '13180',
		codeRomes: ['D1406', 'D1407'],
		distanceCommune: '30',
		latitudeCommune: '48.2',
		longitudeCommune: '29.10',
	};
}
