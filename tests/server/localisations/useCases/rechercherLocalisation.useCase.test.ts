import { aCommuneList, aDépartementList, aRégionList } from '@tests/fixtures/domain/localisation.fixture';

import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import { RechercherLocalisationUseCase } from '~/server/localisations/useCases/rechercherLocalisation.useCase';

describe('RechercherLocalisationUseCase', () => {
  let localisationRepository: LocalisationRepository;

  beforeEach(() => {
    localisationRepository = {
      getAdresseList: jest.fn(),
      getCommuneListByCodePostal: jest.fn(),
      getCommuneListByNom: jest.fn(),
      getCommuneListByNuméroDépartement: jest.fn(),
      getDépartementListByNom: jest.fn(),
      getDépartementListByNuméroDépartement : jest.fn(),
      getRégionListByNom: jest.fn(),
    };
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
              codeInsee: '34001',
              libelle: 'Abeilhan',
            },
            {
              codeInsee: '34002',
              libelle: 'Adissan',
            },
          ],
          départementList: [
            {
              codeInsee: '34',
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
                codeInsee: '34001',
                libelle: 'Abeilhan',
              },
              {
                codeInsee: '34002',
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
              codeInsee: '34001',
              libelle: 'Abeilhan',
            },
            {
              codeInsee: '34002',
              libelle: 'Adissan',
            },
          ],
          départementList: [
            {
              codeInsee: '34',
              libelle: 'Hérault',
            },
          ],
          régionList: [
            {
              codeInsee: '76',
              libelle: 'Occitanie',
            },
          ],
        };
      const result = await listeLocalisationUseCase.handle('Haut');

      expect(result).toEqual(expected);
    });
  });
});

