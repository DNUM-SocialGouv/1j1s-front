import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import { ListeLocalisationUseCase } from '~/server/localisations/useCases/listeLocalisation.useCase';

describe('ListeLocalisationUseCase', () => {
  let localisationRepository: LocalisationRepository;

  beforeEach(() => {
    localisationRepository = {
      getAdresseList: jest.fn(),
      getCommuneList: jest.fn(),
      getDépartementList: jest.fn(),
      getRégionList: jest.fn(),
    };
  });

  describe('quand la recherche contient 2 chiffres on va rechercher seulement les départements', () => {
    it('renvoie la liste de département correspondant à la recherche', async () => {
      const listeLocalisationUseCase = new ListeLocalisationUseCase(localisationRepository);
      jest.spyOn(localisationRepository, 'getDépartementList').mockResolvedValue([
        {
          codeInsee: '78',
          libelle: 'Yvelines',
        },
      ]);

      const expected = 
        {
          communeList: [],
          départementList: [{
            codeInsee: '78',
            libelle: 'Yvelines',
          }],
          régionList: [],
        };
      const result = await listeLocalisationUseCase.handle('78');

      expect(result).toEqual(expected);
    });
  });
  describe('quand la recherche contient 5 chiffres on va rechercher les communes', () => {
    it('renvoie la liste de commune correspondant à la recherche', 
      async () => {
        const listeLocalisationUseCase = new ListeLocalisationUseCase(localisationRepository);
        jest.spyOn(localisationRepository, 'getCommuneList').mockResolvedValue([
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
      const listeLocalisationUseCase = new ListeLocalisationUseCase(localisationRepository);
      jest.spyOn(localisationRepository, 'getCommuneList').mockResolvedValue([
        {
          codeInsee: '02377',
          libelle: 'Haution',
        },
      ]);
      jest.spyOn(localisationRepository, 'getDépartementList').mockResolvedValue([
        {
          codeInsee: '68',
          libelle: 'Haut-Rhin',
        },
      ]);
      jest.spyOn(localisationRepository, 'getRégionList').mockResolvedValue([
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
