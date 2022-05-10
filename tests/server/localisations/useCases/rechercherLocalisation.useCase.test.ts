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
      jest.spyOn(localisationRepository, 'getDépartementListByNuméroDépartement').mockResolvedValue([
        {
          codeInsee: '78',
          libelle: 'Yvelines',
        },
      ]);
      jest.spyOn(localisationRepository, 'getCommuneListByNuméroDépartement').mockResolvedValue([
        {
          codeInsee: '78003',
          libelle: 'Ablis',
        },
        {
          codeInsee: '78005',
          libelle: 'Achères',
        },
      ]);

      const expected = 
        {
          communeList: [
            {
              codeInsee: '78003',
              libelle: 'Ablis',
            },
            {
              codeInsee: '78005',
              libelle: 'Achères',
            },
          ],
          départementList: [
            {
              codeInsee: '78',
              libelle: 'Yvelines',
            },
          ],
          régionList: [],
        };
      const result = await listeLocalisationUseCase.handle('78');

      expect(result).toEqual(expected);
    });
  });
  describe('quand la recherche contient 5 chiffres on va rechercher les communes par code postal', () => {
    it('renvoie la liste de commune correspondant à la recherche', 
      async () => {
        const listeLocalisationUseCase = new RechercherLocalisationUseCase(localisationRepository);
        jest.spyOn(localisationRepository, 'getCommuneListByCodePostal').mockResolvedValue([
          {
            codeInsee: '95100',
            libelle: 'Argenteuil',
          },
        ]);   
        const expected = 
          {
            communeList: [{
              codeInsee: '95100',
              libelle: 'Argenteuil',
            }],
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
      jest.spyOn(localisationRepository, 'getCommuneListByNom').mockResolvedValue([
        {
          codeInsee: '02377',
          libelle: 'Haution',
        },
      ]);
      jest.spyOn(localisationRepository, 'getDépartementListByNom').mockResolvedValue([
        {
          codeInsee: '68',
          libelle: 'Haut-Rhin',
        },
      ]);
      jest.spyOn(localisationRepository, 'getRégionListByNom').mockResolvedValue([
        {
          codeInsee: '32',
          libelle: 'Haut-de-France',
        },
      ]);
      const expected = 
        {
          communeList: [{
            codeInsee: '02377',
            libelle: 'Haution',
          }],
          départementList: [{
            codeInsee: '68',
            libelle: 'Haut-Rhin',
          }],
          régionList: [{
            codeInsee: '32',
            libelle: 'Haut-de-France',
          }],
        };
      const result = await listeLocalisationUseCase.handle('Haut');

      expect(result).toEqual(expected);
    });
  });
});
