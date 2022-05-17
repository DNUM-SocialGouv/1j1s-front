import {
  aCommune,
  aDépartement,
  aLocalisationRepository,
  aRégion,
} from '@tests/fixtures/domain/localisation.fixture';

import { TypeLocalisation } from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import { RécupérerLocalisationAvecCodeInseeUseCase } from '~/server/localisations/useCases/récupérerLocalisationAvecCodeInseeUseCase';

describe('RécupérerLocalisationAvecCodeInseeUseCase', () => {
  let localisationRepository: LocalisationRepository;

  beforeEach(() => {
    localisationRepository = aLocalisationRepository();
  });

  describe('quand le type de localisation est une commune', () => {
    it('renvoie la localisation', async() => {
      const localisationUseCase = new RécupérerLocalisationAvecCodeInseeUseCase(localisationRepository);
      const localisationRepositoryMocked = jest.spyOn(localisationRepository, 'getLocalisationByCode').mockResolvedValue(aCommune());

      const expected = {
        code: '34290',
        codeInsee: '34001',
        libelle: 'Abeilhan',
      };
      const result = await localisationUseCase.handle(TypeLocalisation.COMMUNE, '34001');

      expect(result).toEqual(expected);
      expect(localisationRepositoryMocked).toHaveBeenCalledWith('communes', '34001');
    });
  });

  describe('quand le type de localisation est un département', () => {
    it('renvoie la localisation', async() => {
      const localisationUseCase = new RécupérerLocalisationAvecCodeInseeUseCase(localisationRepository);
      const localisationRepositoryMocked = jest.spyOn(localisationRepository, 'getLocalisationByCode').mockResolvedValue(aDépartement());

      const expected = {
        code: '34',
        codeInsee: '34',
        libelle: 'Hérault',
      };
      const result = await localisationUseCase.handle(TypeLocalisation.DEPARTEMENT, '34');

      expect(result).toEqual(expected);
      expect(localisationRepositoryMocked).toHaveBeenCalledWith('departements', '34');
    });
  });

  describe('quand le type de localisation est une région', () => {
    it('renvoie la localisation', async() => {
      const localisationUseCase = new RécupérerLocalisationAvecCodeInseeUseCase(localisationRepository);
      const localisationRepositoryMocked = jest.spyOn(localisationRepository, 'getLocalisationByCode').mockResolvedValue(aRégion());

      const expected = {
        code: '76',
        codeInsee: '76',
        libelle: 'Occitanie',
      };
      const result = await localisationUseCase.handle(TypeLocalisation.REGION, '76');

      expect(result).toEqual(expected);
      expect(localisationRepositoryMocked).toHaveBeenCalledWith('regions', '76');
    });
  });
});
