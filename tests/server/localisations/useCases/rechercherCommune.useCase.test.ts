import {
  aLocalisationAvecCoordonnéesRepository,
  aRésultatsRechercheCommune,
} from '@tests/fixtures/domain/localisationAvecCoordonnées.fixture';

import { createSuccess } from '~/server/errors/either';
import { LocalisationAvecCoordonnéesRepository } from '~/server/localisations/domain/localisationAvecCoordonnées.repository';
import { RechercherCommuneUseCase } from '~/server/localisations/useCases/rechercherCommune.useCase';

describe('RechercherCommuneUseCase', () => {
  let localisationAvecCoordonnéesRepository: LocalisationAvecCoordonnéesRepository;

  beforeEach(() => {
    localisationAvecCoordonnéesRepository = aLocalisationAvecCoordonnéesRepository();
  });

  describe('getCommuneList', () => {
    it('renvoie la liste des communes en fonction de la recherche', async () => {
      const rechercherCommuneUseCase = new RechercherCommuneUseCase(localisationAvecCoordonnéesRepository);
      jest.spyOn(localisationAvecCoordonnéesRepository, 'getCommuneList').mockResolvedValue(createSuccess(aRésultatsRechercheCommune()));

      const expected = { instance: 'success', result: {
        résultats: [{
          code: '75056',
          coordonnées: {
            latitude: 48.859,
            longitude: 2.347,
          },
          libelle: 'Paris',
          ville: 'Paris',
        },
        {
          code: '75115',
          coordonnées: {
            latitude: 48.863367,
            longitude: 2.397152,
          },
          libelle: 'Paris 15e Arrondissement',
          ville: 'Paris 15e Arrondissement',
        }],
      } };

      const result = await rechercherCommuneUseCase.handle('paris');

      expect(result).toEqual(expected);
    });
  });
});
