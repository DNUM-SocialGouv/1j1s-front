import { aDépartementList, aLocalisationRepository, aRégionList } from '@tests/fixtures/domain/localisation.fixture';
import {
  aCommuneList,
  aLocalisationAvecCoordonnéesRepository,
  aRésultatsRechercheCommune,
} from '@tests/fixtures/domain/localisationAvecCoordonnées.fixture';

import { createFailure, Failure, Success } from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';
import { RechercheLocalisation } from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import {
  LocalisationAvecCoordonnéesRepository,
} from '~/server/localisations/domain/localisationAvecCoordonnées.repository';
import { RechercherLocalisationUseCase } from '~/server/localisations/useCases/rechercherLocalisation.useCase';

describe('RechercherLocalisationUseCase', () => {
  let localisationRepository: LocalisationRepository;
  let localisationAvecCoordonneesRepository: LocalisationAvecCoordonnéesRepository;

  beforeEach(() => {
    localisationRepository = aLocalisationRepository();
    localisationAvecCoordonneesRepository = aLocalisationAvecCoordonnéesRepository();
  });

  describe('Lorsque la recherche contient ne contient que 2 chiffres (département)', () => {
    describe('Lorsque la récupération de la liste de départements fonctionne', () => {
      it('renvoie une liste avec le département correspondant à la recherche', async () => {
        const listeLocalisationUseCase = new RechercherLocalisationUseCase(localisationRepository, localisationAvecCoordonneesRepository);
        jest.spyOn(localisationRepository, 'getDépartementListByNuméroDépartement').mockResolvedValue(aDépartementList());

        const expected: RechercheLocalisation = {
          communeList: [],
          départementList: aDépartementList(),
          régionList: [],
        };
        const { result } = await listeLocalisationUseCase.handle('78') as Success<RechercheLocalisation>;

        expect(result).toEqual(expected);
      });
    });
    describe('Lorsque la récupération de la liste de départements échoue', () => {
      it('renvoie une erreur', async () => {
        const listeLocalisationUseCase = new RechercherLocalisationUseCase(localisationRepository, localisationAvecCoordonneesRepository);
        jest.spyOn(localisationRepository, 'getDépartementListByNuméroDépartement').mockRejectedValue(new Error());

        const result = await listeLocalisationUseCase.handle('78');

        expect(result.instance).toEqual('failure');
      });
    });
  });
  describe('Lorsque la recherche ne contient que 5 chiffres (code postal)', () => {
    describe('Lorsque la récupération de la liste des communes fonctionne', () => {
      it('renvoie la liste de communes correspondant à la recherche', async () => {
        const listeLocalisationUseCase = new RechercherLocalisationUseCase(localisationRepository, localisationAvecCoordonneesRepository);
        jest.spyOn(localisationAvecCoordonneesRepository, 'getCommuneList').mockResolvedValue({ instance: 'success', result: aRésultatsRechercheCommune() });
        const expected: RechercheLocalisation = {
          communeList: aCommuneList(),
          départementList: [],
          régionList: [],
        };
        const { result } = await listeLocalisationUseCase.handle('95100') as Success<RechercheLocalisation>;

        expect(result).toEqual(expected);
      });
    });
    describe('Lorsque la récupération de la liste des communes échoue', () => {
      it('renvoie une erreur', async () => {
        const listeLocalisationUseCase = new RechercherLocalisationUseCase(localisationRepository, localisationAvecCoordonneesRepository);
        jest.spyOn(localisationAvecCoordonneesRepository, 'getCommuneList').mockResolvedValue(createFailure(ErrorType.ERREUR_INATTENDUE));

        const result = await listeLocalisationUseCase.handle('95100') as Failure;

        expect(result.instance).toEqual('failure');
        expect(result.errorType).toEqual(ErrorType.ERREUR_INATTENDUE);
      });
    });
  });
  describe('quand la recherche contient des lettres (nom de commune, département ou région)', () => {
    it('renvoie la liste des communes, départements et régions correspondants à la recherche', async () => {
      const listeLocalisationUseCase = new RechercherLocalisationUseCase(localisationRepository, localisationAvecCoordonneesRepository);
      jest.spyOn(localisationAvecCoordonneesRepository, 'getCommuneList').mockResolvedValue({ instance: 'success', result: aRésultatsRechercheCommune() });
      jest.spyOn(localisationRepository, 'getDépartementListByNom').mockResolvedValue(aDépartementList());
      jest.spyOn(localisationRepository, 'getRégionListByNom').mockResolvedValue(aRégionList());

      const expected: RechercheLocalisation = {
        communeList: aCommuneList(),
        départementList: aDépartementList(),
        régionList: aRégionList(),
      };
      const { result } = await listeLocalisationUseCase.handle('Haut') as Success<RechercheLocalisation>;

      expect(result).toEqual(expected);
    });
  });
  describe('Lorsque la récupération de la liste des communes échoue', () => {
    it('renvoie une erreur', async () => {
      const listeLocalisationUseCase = new RechercherLocalisationUseCase(localisationRepository, localisationAvecCoordonneesRepository);
      jest.spyOn(localisationAvecCoordonneesRepository, 'getCommuneList').mockResolvedValue(createFailure(ErrorType.ERREUR_INATTENDUE));

      const result = await listeLocalisationUseCase.handle('Haut') as Failure;

      expect(result.instance).toEqual('failure');
      expect(result.errorType).toEqual(ErrorType.ERREUR_INATTENDUE);
    });
  });
  describe('Lorsque la récupération de la liste des départements échoue', () => {
    it('renvoie une erreur', async () => {
      const listeLocalisationUseCase = new RechercherLocalisationUseCase(localisationRepository, localisationAvecCoordonneesRepository);
      jest.spyOn(localisationRepository, 'getDépartementListByNuméroDépartement').mockRejectedValue(new Error());

      const result = await listeLocalisationUseCase.handle('Haut') as Failure;

      expect(result.instance).toEqual('failure');
    });
  });
  describe('Lorsque la récupération de la liste des régions échoue', () => {
    it('renvoie une erreur', async () => {
      const listeLocalisationUseCase = new RechercherLocalisationUseCase(localisationRepository, localisationAvecCoordonneesRepository);
      jest.spyOn(localisationRepository, 'getRégionListByNom').mockRejectedValue(new Error());

      const result = await listeLocalisationUseCase.handle('Haut') as Failure;

      expect(result.instance).toEqual('failure');
    });
  });
});

