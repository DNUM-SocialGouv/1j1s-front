import { Localisation, RechercheLocalisation } from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import {
	RechercheLocalisationApiResponse,
} from '~/server/localisations/infra/controllers/RechercheLocalisationApiResponse';

export function aLocalisationRepository(): LocalisationRepository {
	return {
		getCodeRegionByCodePostal: jest.fn(),
		getCommuneListByCodePostal: jest.fn(),
		getCommuneListByNom: jest.fn(),
		getCommuneListByNuméroDépartement: jest.fn(),
		getDépartementListByNom: jest.fn(),
		getDépartementListByNuméroDépartement: jest.fn(),
		getRégionListByNom: jest.fn(),
	};
}

export function aDépartement(): Localisation {
	return {
		code: '34',
		nom: 'Hérault',
	};
}

export function aDépartementList(): Localisation[] {
	return [
		aDépartement(),
	];
}

export function aRégion(): Localisation {
	return {
		code: '76',
		nom: 'Occitanie',
	};
}

export function aRégionList(): Localisation[] {
	return [
		aRégion(),
	];
}

export function aLongList(): RechercheLocalisation {
	return {
		communeList: [...Array(21)].map(() => {
			return { code: '76', codePostal: '76', coordonnées: { latitude: 2, longitude: 1 }, libelle: 'fake (76)', ville: 'fake' };
		}),
		departementList: [...Array(22)].map(() => {
			return { code: '76', nom: 'fake' };
		}),
		regionList: [...Array(22)].map(() => {
			return { code: '76', nom: 'fake' };
		}),
	};
}

export function aLocalisationList(): RechercheLocalisationApiResponse {
	return {
		communeList: [],
		departementList: [{ code: '75', nom: 'Paris' }],
		regionList: [],
	};
}

export function aLocalisationListWithCommuneAndDépartement(): RechercheLocalisationApiResponse {
	return {
		communeList: [{ code: '75101', codePostal: '75001', nom: 'Paris' }],
		departementList: [{ code: '75', nom: 'Paris' }],
		regionList: [],
	};
}

export function aLocalisationListWithEmptyValue(): RechercheLocalisationApiResponse {
	return {
		communeList: [],
		departementList: [],
		regionList: [],
	};
}
