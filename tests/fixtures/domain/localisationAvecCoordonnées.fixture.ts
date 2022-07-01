import {
  Commune,
  RésultatsRechercheCommune,
} from '~/server/localisations/domain/localisationAvecCoordonnées';
import { LocalisationAvecCoordonnéesRepository } from '~/server/localisations/domain/localisationAvecCoordonnées.repository';

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
      coordonnées: {
        lat: 48.859,
        lon: 2.347,
      },
      libelle: 'Paris',
      ville: 'Paris',
    },
    {
      code: '75115',
      coordonnées: {
        lat: 48.863367,
        lon: 2.397152,
      },
      libelle: 'Paris 15e Arrondissement',
      ville: 'Paris 15e Arrondissement',
    },
  ];
}
