import { aDépartementList, aLocalisationRepository, aRégionList } from '@tests/fixtures/domain/localisation.fixture';
import {
  aCommuneList,
  aLocalisationAvecCoordonnéesRepository,
  aRésultatsRechercheCommune,
} from '@tests/fixtures/domain/localisationAvecCoordonnées.fixture';

import { createFailure, createSuccess, Failure, Success } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
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

  describe('Lorsque la recherche ne contient que 2 chiffres (département)', () => {
    describe('Lorsque la récupération de la liste de départements fonctionne', () => {
      it('renvoie une liste avec le département correspondant à la recherche', async () => {
        const listeLocalisationUseCase = new RechercherLocalisationUseCase(localisationRepository, localisationAvecCoordonneesRepository);
        jest.spyOn(localisationRepository, 'getDépartementListByNuméroDépartement').mockResolvedValue(createSuccess(aDépartementList()));

        const expected: RechercheLocalisation = {
          communeList: [],
          départementList: aDépartementList(),
          régionList: [],
        };
        const { result } = await listeLocalisationUseCase.handle('78') as Success<RechercheLocalisation>;

        expect(result).toEqual(expected);
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
        jest.spyOn(localisationAvecCoordonneesRepository, 'getCommuneList').mockResolvedValue(createFailure(ErreurMétier.CONTENU_INDISPONIBLE));

        const result = await listeLocalisationUseCase.handle('95100') as Failure;

        expect(result.instance).toEqual('failure');
        expect(result.errorType).toEqual(ErreurMétier.CONTENU_INDISPONIBLE);
      });
    });
  });
  describe('quand la recherche contient des lettres (nom de commune, département ou région)', () => {
    describe('lorsque la recherche contient moins de 3 lettres', () => {
      it('renvoie une erreur', async () => {
        const listeLocalisationUseCase = new RechercherLocalisationUseCase(localisationRepository, localisationAvecCoordonneesRepository);
        jest.spyOn(localisationAvecCoordonneesRepository, 'getCommuneList');
        jest.spyOn(localisationRepository, 'getDépartementListByNom');
        jest.spyOn(localisationRepository, 'getRégionListByNom');

        const result = await listeLocalisationUseCase.handle('Pa') as Failure;

        expect(result.instance).toEqual('failure');
        expect(result.errorType).toEqual(ErreurMétier.DEMANDE_INCORRECTE);
        expect(localisationAvecCoordonneesRepository.getCommuneList).not.toHaveBeenCalled();
        expect(localisationRepository.getDépartementListByNom).not.toHaveBeenCalled();
        expect(localisationRepository.getRégionListByNom).not.toHaveBeenCalled();

      });
    });
    it('renvoie la liste des communes, départements et régions correspondants à la recherche', async () => {
      const listeLocalisationUseCase = new RechercherLocalisationUseCase(localisationRepository, localisationAvecCoordonneesRepository);
      jest.spyOn(localisationAvecCoordonneesRepository, 'getCommuneList').mockResolvedValue(createSuccess(aRésultatsRechercheCommune()));
      jest.spyOn(localisationRepository, 'getDépartementListByNom').mockResolvedValue(createSuccess(aDépartementList()));
      jest.spyOn(localisationRepository, 'getRégionListByNom').mockResolvedValue(createSuccess(aRégionList()));

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
      jest.spyOn(localisationAvecCoordonneesRepository, 'getCommuneList').mockResolvedValue(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));

      const result = await listeLocalisationUseCase.handle('Haut') as Failure;

      expect(result.instance).toEqual('failure');
      expect(result.errorType).toEqual(ErreurMétier.SERVICE_INDISPONIBLE);
    });
  });
});

