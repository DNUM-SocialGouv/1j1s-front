import {
	Commune,
	RésultatsRechercheCommune,
} from './localisationAvecCoordonnées';
import { LocalisationAvecCoordonnéesRepository } from './localisationAvecCoordonnées.repository';

export function aLocalisationAvecCoordonnéesRepository() : LocalisationAvecCoordonnéesRepository {
	return {
		getCommuneList: jest.fn(),
	};
}

export function aRésultatsRechercheCommune(): RésultatsRechercheCommune {
	return {
		résultats: aCommuneList(),
	};
}


export function aCommuneList(): Commune[] {
	return [
		{
			code: '75056',
			codePostal: '75006',
			coordonnées: {
				latitude: 48.859,
				longitude: 2.347,
			},
			libelle: 'Paris (75006)',
			ville: 'Paris',
		},
		{
			code: '75115',
			codePostal: '75015',
			coordonnées: {
				latitude: 48.863367,
				longitude: 2.397152,
			},
			libelle: 'Paris 15e Arrondissement (75015)',
			ville: 'Paris 15e Arrondissement',
		},
	];
}
