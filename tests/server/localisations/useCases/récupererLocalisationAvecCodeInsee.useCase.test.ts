import { aCommune, aDépartement, aLocalisationRepository, aRégion } from '@tests/fixtures/domain/localisation.fixture';

import { CodeInsee } from '~/server/localisations/domain/codeInsee';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import {
  RécupérerLocalisationAvecCodeInseeUseCase,
} from '~/server/localisations/useCases/récupérerLocalisationAvecCodeInseeUseCase';

describe('RécupérerLocalisationAvecCodeInseeUseCase', () => {
  let localisationRepository: LocalisationRepository;

  beforeEach(() => {
    localisationRepository = aLocalisationRepository();
  });

  describe('quand le type de localisation est une commune', () => {
    it('renvoie la localisation', async() => {
      const localisationUseCase = new RécupérerLocalisationAvecCodeInseeUseCase(localisationRepository);
      const localisationRepositoryMocked = jest.spyOn(localisationRepository, 'getLocalisationByTypeLocalisationAndCodeInsee').mockResolvedValue(aCommune());

      const expected = {
        code: '34290',
        codeInsee: CodeInsee.createCodeInsee('34001'),
        libelle: 'Abeilhan',
      };
      const result = await localisationUseCase.handle(TypeLocalisation.COMMUNE, CodeInsee.createCodeInsee('34001'));

      expect(result).toEqual(expected);
      expect(localisationRepositoryMocked).toHaveBeenCalledWith('communes', CodeInsee.createCodeInsee('34001'));
    });
  });

  describe('quand le type de localisation est un département', () => {
    it('renvoie la localisation', async() => {
      const localisationUseCase = new RécupérerLocalisationAvecCodeInseeUseCase(localisationRepository);
      const localisationRepositoryMocked = jest.spyOn(localisationRepository, 'getLocalisationByTypeLocalisationAndCodeInsee').mockResolvedValue(aDépartement());

      const expected = {
        code: '34',
        codeInsee: CodeInsee.createCodeInsee('34'),
        libelle: 'Hérault',
      };
      const result = await localisationUseCase.handle(TypeLocalisation.DEPARTEMENT, CodeInsee.createCodeInsee('34'));

      expect(result).toEqual(expected);
      expect(localisationRepositoryMocked).toHaveBeenCalledWith('departements', CodeInsee.createCodeInsee('34'));
    });
  });

  describe('quand le type de localisation est une région', () => {
    it('renvoie la localisation', async() => {
      const localisationUseCase = new RécupérerLocalisationAvecCodeInseeUseCase(localisationRepository);
      const localisationRepositoryMocked = jest.spyOn(localisationRepository, 'getLocalisationByTypeLocalisationAndCodeInsee').mockResolvedValue(aRégion());

      const expected = {
        code: '76',
        codeInsee: CodeInsee.createCodeInsee('76'),
        libelle: 'Occitanie',
      };
      const result = await localisationUseCase.handle(TypeLocalisation.REGION, CodeInsee.createCodeInsee('76'));

      expect(result).toEqual(expected);
      expect(localisationRepositoryMocked).toHaveBeenCalledWith('regions', CodeInsee.createCodeInsee('76'));
    });
  });
});
