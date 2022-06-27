import {
  aBarmanOffreEmploi,
  anOffreEmploiFiltre,
  aRésultatsRechercheOffreEmploi,
} from '@tests/fixtures/domain/offreEmploi.fixture';
import {
  aApiPoleEmploiRéférentielRepository,
} from '@tests/fixtures/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository.fixture';
import { anAxiosErreur, anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';
import {
  aBarmanOffreEmploiAxiosResponse,
  aPoleEmploiHttpClient,
  aRésultatRechercheOffreEmploiAxiosResponse,
} from '@tests/fixtures/services/poleEmploiHttpClientService.fixture';

import { Failure, Success } from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';
import { OffreEmploi, RésultatsRechercheOffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import { ApiPoleEmploiOffreRepository } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.repository';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';

jest.mock('axios', () => {
  return {
    isAxiosError: jest.fn().mockReturnValue(true),
  };
});

describe('ApiPoleEmploiOffreRepository', () => {
  let poleEmploiHttpClientService: PoleEmploiHttpClientService;
  let apiPoleEmploiOffreRepository: ApiPoleEmploiOffreRepository;
  let apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository;

  beforeEach(() => {
    poleEmploiHttpClientService = aPoleEmploiHttpClient();
    apiPoleEmploiRéférentielRepository = aApiPoleEmploiRéférentielRepository();
    apiPoleEmploiOffreRepository = new ApiPoleEmploiOffreRepository(poleEmploiHttpClientService, apiPoleEmploiRéférentielRepository);
  });

  describe('getOffreEmploi', () => {
    describe('quand l\'offre d\'emploi est trouvé', () => {
      it('récupère l\'offre d\'emploi selon l\'id', async () => {
        jest
          .spyOn(poleEmploiHttpClientService, 'get')
          .mockResolvedValue(aBarmanOffreEmploiAxiosResponse());
        const expected = aBarmanOffreEmploi();
        const offreEmploiId = expected.id;

        const { result } = await apiPoleEmploiOffreRepository.getOffreEmploi(offreEmploiId) as Success<OffreEmploi>;

        expect(result).toEqual(expected);
        expect(poleEmploiHttpClientService.get).toHaveBeenCalledWith(
          'partenaire/offresdemploi/v2/offres/132LKFB',
        );
      });
    });

    describe('quand l\'offre d\'emploi n\'est pas trouvé', () => {
      it('on renvoie une failure avec une error CONTENU_INDISPONIBLE', async () => {
        jest
          .spyOn(poleEmploiHttpClientService, 'get')
          .mockResolvedValue(Promise.resolve({ status: 204 } ));
        const offreEmploiId = '132LKFB';

        const result  = await apiPoleEmploiOffreRepository.getOffreEmploi(offreEmploiId) as Failure;
        console.log(result);
        expect(result.errorType).toEqual(ErrorType.CONTENU_INDISPONIBLE);
      });
    });

    describe('quand l\'api répond avec une 500', () => {
      it('on renvoie une failure avec une error SERVICE_INDISPONIBLE', async () => {
        const offreEmploiId = 'fake-id';

        jest
          .spyOn(poleEmploiHttpClientService, 'get')
          .mockResolvedValue(Promise.reject({ response: { status: 500 } }));

        const result = await apiPoleEmploiOffreRepository.getOffreEmploi(offreEmploiId)  as Failure;

        expect(result.errorType).toEqual(ErrorType.SERVICE_INDISPONIBLE);
      });
    });

    describe('quand l\'api répond avec une erreur non traité', () => {
      it('on renvoie une failure avec une error ERREUR_INATTENDUE', async () => {
        const offreEmploiId = 'fake-id';

        jest
          .spyOn(poleEmploiHttpClientService, 'get')
          .mockResolvedValue(Promise.reject({ response: { status: 666 } }));

        const result = await apiPoleEmploiOffreRepository.getOffreEmploi(offreEmploiId)  as Failure;

        expect(result.errorType).toEqual(ErrorType.ERREUR_INATTENDUE);
      });
    });
  });

  describe('searchOffreEmploi', () => {
    describe('quand nombre de résultat est présent dans la réponse', () => {
      it('recherche les offres d\'emploi de pole emploi', async () => {
        jest
          .spyOn(poleEmploiHttpClientService, 'get')
          .mockResolvedValue(aRésultatRechercheOffreEmploiAxiosResponse());
        const offreEmploiFiltre = anOffreEmploiFiltre();

        const { result } = await apiPoleEmploiOffreRepository.searchOffreEmploi(offreEmploiFiltre) as Success<RésultatsRechercheOffreEmploi>;

        expect(result).toEqual(aRésultatsRechercheOffreEmploi());
        expect(poleEmploiHttpClientService.get).toHaveBeenCalledWith(
          'partenaire/offresdemploi/v2/offres/search?motsCles=boulanger&range=0-29&typeContrat=CDD%2CCDI&region=34',
        );
      });

      it('recherche les offres d\'emploi de pole emploi avec une localisation qui est une commune on va rechercher le code insee sur le référentiel de pole emploi', async () => {
        jest
          .spyOn(poleEmploiHttpClientService, 'get')
          .mockResolvedValue(aRésultatRechercheOffreEmploiAxiosResponse());
        jest
          .spyOn(apiPoleEmploiRéférentielRepository, 'findCodeInseeInRéférentielCommune')
          .mockResolvedValue('75101');

        const offreEmploiFiltre = anOffreEmploiFiltre({
          localisation: {
            code: '75001',
            type: TypeLocalisation.COMMUNE,
          },
        });

        const result = await apiPoleEmploiOffreRepository.searchOffreEmploi(offreEmploiFiltre) as Success<RésultatsRechercheOffreEmploi>;

        expect(result.result).toEqual(aRésultatsRechercheOffreEmploi());
        expect(poleEmploiHttpClientService.get).toHaveBeenCalledWith(
          'partenaire/offresdemploi/v2/offres/search?motsCles=boulanger&range=0-29&typeContrat=CDD%2CCDI&commune=75101',
        );
      });
    });

    describe('quand nombre de résultat est absent dans la réponse', () => {
      it('recherche les offres d\'emploi de pole emploi', async () => {
        jest
          .spyOn(poleEmploiHttpClientService, 'get')
          .mockResolvedValue(aRésultatRechercheOffreEmploiAxiosResponse({ filtresPossibles: undefined }));
        const offreEmploiFiltre = anOffreEmploiFiltre();

        const result = await apiPoleEmploiOffreRepository.searchOffreEmploi(offreEmploiFiltre) as Success<RésultatsRechercheOffreEmploi>;

        expect(result.result).toEqual(aRésultatsRechercheOffreEmploi({ nombreRésultats: 0 }));
        expect(poleEmploiHttpClientService.get).toHaveBeenCalledWith(
          'partenaire/offresdemploi/v2/offres/search?motsCles=boulanger&range=0-29&typeContrat=CDD%2CCDI&region=34',
        );
      });
    });

    describe('quand l\'api pole emploi répond avec une 500', () => {
      it('on renvoie une failure avec une error SERVICE_INDISPONIBLE', async () => {
        jest
          .spyOn(poleEmploiHttpClientService, 'get')
          .mockResolvedValue(Promise.reject(anAxiosErreur(500)));
        const offreEmploiFiltre = anOffreEmploiFiltre();

        const result = await apiPoleEmploiOffreRepository.searchOffreEmploi(offreEmploiFiltre) as Failure;

        expect(result.errorType).toEqual(ErrorType.SERVICE_INDISPONIBLE);
      });

      describe('quand l\'api pole emploi répond avec une 400', () => {
        it('on renvoie une failure avec une error ERREUR_DE_SAISIE', async () => {
          jest
            .spyOn(poleEmploiHttpClientService, 'get')
            .mockResolvedValue(Promise.reject(anAxiosErreur(400)));
          const offreEmploiFiltre = anOffreEmploiFiltre();

          const result = await apiPoleEmploiOffreRepository.searchOffreEmploi(offreEmploiFiltre) as Failure;

          expect(result.errorType).toEqual(ErrorType.DEMANDE_INCORRECTE);
        });

        describe('quand l\'api pole emploi répond avec une 204', () => {
          it('on renvoie un success avec un resultat vide', async () => {
            jest
              .spyOn(poleEmploiHttpClientService, 'get')
              .mockResolvedValue(anAxiosResponse({}, 204));
            const offreEmploiFiltre = anOffreEmploiFiltre();

            const { result } = await apiPoleEmploiOffreRepository.searchOffreEmploi(offreEmploiFiltre) as Success<RésultatsRechercheOffreEmploi>;

            expect(result.nombreRésultats).toEqual(0);
            expect(result.résultats).toEqual([]);
          });
        });

        describe('quand l\'api pole emploi répond avec une erreur non traité', () => {
          it('on renvoie une failure avec une error ERREUR_INATTENDUE', async () => {
            jest
              .spyOn(poleEmploiHttpClientService, 'get')
              .mockResolvedValue(Promise.reject({ response: { status: 503 } }));
            const offreEmploiFiltre = anOffreEmploiFiltre();

            const result = await apiPoleEmploiOffreRepository.searchOffreEmploi(offreEmploiFiltre) as Failure;

            expect(result.errorType).toEqual(ErrorType.ERREUR_INATTENDUE);
          });
        });
      });

      describe('buildParamètresRecherche', () => {
        describe('quand tous les paramètres sont présents dans le filtre', () => {
          it('retourne les paramètres de recherche', async () => {
            const offreEmploiFiltre = anOffreEmploiFiltre();
            const result = await apiPoleEmploiOffreRepository.buildParamètresRecherche(offreEmploiFiltre);

            expect(result).toEqual('motsCles=boulanger&range=0-29&typeContrat=CDD%2CCDI&region=34');
          });
        });

        describe('quand un paramètre est absent', () => {
          it('quand motClé est absent, retourne motsCles vide dans les paramètres de l\'url', async () => {
            const offreEmploiFiltre = anOffreEmploiFiltre({ motClé: undefined });
            const result = await apiPoleEmploiOffreRepository.buildParamètresRecherche(offreEmploiFiltre);

            expect(result).toEqual('range=0-29&typeContrat=CDD%2CCDI&region=34');
          });

          it('quand la localisation est absente, ne retourne pas la localisation dans les paramètres de l\'url', async () => {
            const offreEmploiFiltre = anOffreEmploiFiltre({ localisation: undefined });
            const result = await apiPoleEmploiOffreRepository.buildParamètresRecherche(offreEmploiFiltre);

            expect(result).toEqual('motsCles=boulanger&range=0-29&typeContrat=CDD%2CCDI');
          });
        });

        describe('quand la page vaut 1', () => {
          it('retourne les paramètres de recherche', async () => {
            const offreEmploiFiltre = anOffreEmploiFiltre();
            const result = await apiPoleEmploiOffreRepository.buildParamètresRecherche(offreEmploiFiltre);

            expect(result).toEqual('motsCles=boulanger&range=0-29&typeContrat=CDD%2CCDI&region=34');
          });
        });

        describe('quand la page vaut 3', () => {
          it('retourne les paramètres de recherche', async () => {
            const offreEmploiFiltre = anOffreEmploiFiltre({
              motClé: 'électricien',
              page: 3,
            });
            const result = await apiPoleEmploiOffreRepository.buildParamètresRecherche(offreEmploiFiltre);

            expect(result).toEqual('motsCles=%C3%A9lectricien&range=60-89&typeContrat=CDD%2CCDI&region=34');
          });
        });
      });
    });
  });
});
