import {
  aCommuneList,
  aDépartementList,
  aLocalisationRepository,
  aRégionList,
} from '@tests/fixtures/domain/localisation.fixture';

import { CodeInsee } from '~/server/localisations/domain/codeInsee';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import { RechercherLocalisationUseCase } from '~/server/localisations/useCases/rechercherLocalisation.useCase';

describe('RechercherLocalisationUseCase', () => {
  let localisationRepository: LocalisationRepository;

  beforeEach(() => {
    localisationRepository = aLocalisationRepository();
  });

  describe('quand la recherche contient 2 chiffres on va rechercher le département et les communes par le code du département', () => {
    it('renvoie une liste avec le département et les communes correspondant à la recherche', async () => {
      const listeLocalisationUseCase = new RechercherLocalisationUseCase(localisationRepository);
      jest.spyOn(localisationRepository, 'getDépartementListByNuméroDépartement').mockResolvedValue(aDépartementList());
      jest.spyOn(localisationRepository, 'getCommuneListByNuméroDépartement').mockResolvedValue(aCommuneList());

      const expected =
        {
          communeList: [
            {
              code: '34290',
              codeInsee: CodeInsee.createCodeInsee('34001'),
              libelle: 'Abeilhan',
            },
            {
              code: '34230',
              codeInsee: CodeInsee.createCodeInsee('34002'),
              libelle: 'Adissan',
            },
          ],
          départementList: [
            {
              code: '34',
              codeInsee: CodeInsee.createCodeInsee('34'),
              libelle: 'Hérault',
            },
          ],
          régionList: [],
        };
      const result = await listeLocalisationUseCase.handle('78');

      expect(result).toEqual(expected);
    });
  });
  describe('quand la recherche contient 5 chiffres on va rechercher les communes par code postal', () => {
    it('renvoie la liste de communes correspondant à la recherche',
      async () => {
        const listeLocalisationUseCase = new RechercherLocalisationUseCase(localisationRepository);
        jest.spyOn(localisationRepository, 'getCommuneListByCodePostal').mockResolvedValue(aCommuneList());
        const expected =
          {
            communeList: [
              {
                code: '34290',
                codeInsee: CodeInsee.createCodeInsee('34001'),
                libelle: 'Abeilhan',
              },
              {
                code: '34230',
                codeInsee: CodeInsee.createCodeInsee('34002'),
                libelle: 'Adissan',
              },
            ],
            départementList: [],
            régionList: [],
          };
        const result = await listeLocalisationUseCase.handle('95100');

        expect(result).toEqual(expected);
      });
  });
  describe('quand la recherche contient seulement des lettres on va rechercher les communes, les départements et les régions', () => {
    it('renvoie la liste correspondant à la recherche', async () => {
      const listeLocalisationUseCase = new RechercherLocalisationUseCase(localisationRepository);
      jest.spyOn(localisationRepository, 'getCommuneListByNom').mockResolvedValue(aCommuneList());
      jest.spyOn(localisationRepository, 'getDépartementListByNom').mockResolvedValue(aDépartementList());
      jest.spyOn(localisationRepository, 'getRégionListByNom').mockResolvedValue(aRégionList());
      const expected =
        {
          communeList: [
            {
              code: '34290',
              codeInsee: CodeInsee.createCodeInsee('34001'),
              libelle: 'Abeilhan',
            },
            {
              code: '34230',
              codeInsee: CodeInsee.createCodeInsee('34002'),
              libelle: 'Adissan',
            },
          ],
          départementList: [
            {
              code: '34',
              codeInsee: CodeInsee.createCodeInsee('34'),
              libelle: 'Hérault',
            },
          ],
          régionList: [
            {
              code: '76',
              codeInsee: CodeInsee.createCodeInsee('76'),
              libelle: 'Occitanie',
            },
          ],
        };
      const result = await listeLocalisationUseCase.handle('Haut');

      expect(result).toEqual(expected);
    });
  });
});

