import { aCommune, aDépartement, aLocalisationRepository, aRégion } from '@tests/fixtures/domain/localisation.fixture';

import { Localisation, TypeLocalisation } from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import {
  RécupérerLocalisationAvecCodeInseeUseCase,
} from '~/server/localisations/useCases/récupérerLocalisationAvecCodeInsee.useCase';

describe('RécupérerLocalisationAvecCodeInseeUseCase', () => {
  let localisationRepository: LocalisationRepository;

  beforeEach(() => {
    localisationRepository = aLocalisationRepository();
  });

  describe('quand le type de localisation est une commune', () => {
    it('renvoie la localisation', async() => {
      const localisationUseCase = new RécupérerLocalisationAvecCodeInseeUseCase(localisationRepository);
      const localisationRepositoryMocked = jest.spyOn(localisationRepository, 'getLocalisationByTypeLocalisationAndCodeInsee').mockResolvedValue(aCommune());

      const expected: Localisation = {
        code: '34290',
        nom: 'Abeilhan',
      };

      const result = await localisationUseCase.handle(TypeLocalisation.COMMUNE, '34001');

      expect(result).toEqual(expected);
      expect(localisationRepositoryMocked).toHaveBeenCalledWith('communes', '34001');
    });
  });

  describe('quand le type de localisation est un département', () => {
    it('renvoie la localisation', async() => {
      const localisationUseCase = new RécupérerLocalisationAvecCodeInseeUseCase(localisationRepository);
      const localisationRepositoryMocked = jest.spyOn(localisationRepository, 'getLocalisationByTypeLocalisationAndCodeInsee').mockResolvedValue(aDépartement());

      const expected: Localisation = {
        code: '34',
        nom: 'Hérault',
      };
      const result = await localisationUseCase.handle(TypeLocalisation.DEPARTEMENT, '34');

      expect(result).toEqual(expected);
      expect(localisationRepositoryMocked).toHaveBeenCalledWith('departements', '34');
    });
  });

  describe('quand le type de localisation est une région', () => {
    it('renvoie la localisation', async() => {
      const localisationUseCase = new RécupérerLocalisationAvecCodeInseeUseCase(localisationRepository);
      const localisationRepositoryMocked = jest.spyOn(localisationRepository, 'getLocalisationByTypeLocalisationAndCodeInsee').mockResolvedValue(aRégion());

      const expected: Localisation = {
        code: '76',
        nom: 'Occitanie',
      };
      const result = await localisationUseCase.handle(TypeLocalisation.REGION, '76');

      expect(result).toEqual(expected);
      expect(localisationRepositoryMocked).toHaveBeenCalledWith('regions', '76');
    });
  });
});
