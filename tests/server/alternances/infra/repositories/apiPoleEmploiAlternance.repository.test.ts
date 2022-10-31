import {
  aBarmanOffre,
  anOffreÉchantillonFiltre,
  anOffreEmploiFiltre,
  aRésultatsRechercheOffre,
} from '@tests/fixtures/domain/offre.fixture';
import {
  aPoleEmploiParamètreBuilderService,
} from '@tests/fixtures/server/offresEmploi/poleEmploiParamètreBuilder.service.fixture';
import { MockedCacheService } from '@tests/fixtures/services/cacheService.fixture';
import {
  aPoleEmploiHttpClient,
  aRésultatsRechercheOffreEmploiResponse,
} from '@tests/fixtures/services/poleEmploiHttpClientService.fixture';

import {
  ApiPoleEmploiAlternanceRepository,
} from '~/server/alternances/infra/repositories/apiPoleEmploiAlternance.repository';
import { createSuccess, Failure, Success } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { Offre, RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import {
  mapOffre,
  mapRésultatsRechercheOffre,
  mapRésultatsRechercheOffreResponse,
} from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploi.mapper';
import {
  PoleEmploiParamètreBuilderService,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiParamètreBuilder.service';
import { CacheService } from '~/server/services/cache/cache.service';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';

describe('ApiPoleEmploiAlternanceRepository', () => {
  let httpClientServiceWithAuthentification: HttpClientServiceWithAuthentification;
  let apiPoleEmploiAlternanceRepository: ApiPoleEmploiAlternanceRepository;
  let poleEmploiParamètreBuilderService: PoleEmploiParamètreBuilderService;
  let cacheService: CacheService;

  beforeEach(() => {
    cacheService = new MockedCacheService();
    httpClientServiceWithAuthentification = aPoleEmploiHttpClient();
    poleEmploiParamètreBuilderService = aPoleEmploiParamètreBuilderService();
    apiPoleEmploiAlternanceRepository = new ApiPoleEmploiAlternanceRepository(httpClientServiceWithAuthentification, poleEmploiParamètreBuilderService, cacheService);
  });

  describe('getOffreEmploi', () => {
    describe('quand l’offre d’alternance est trouvé', () => {
      it('récupère l’offre d’alternance selon l’id', async () => {
        jest
          .spyOn(httpClientServiceWithAuthentification, 'get')
          .mockResolvedValue(createSuccess(aBarmanOffre()));
        const expected = aBarmanOffre();
        const offreEmploiId = expected.id;

        const { result } = await apiPoleEmploiAlternanceRepository.get(offreEmploiId) as Success<Offre>;

        expect(result).toEqual(expected);
        expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(
          '/132LKFB',
          mapOffre,
        );
      });
    });
  });

  describe('search', () => {
    describe("quand la recherche est lancée automatiquement pour les offres d'emplois", () => {
      describe('quand les informations ne sont pas encore mis en cache', () => {
        it("fait l'appel à l'api et set les informations dans le cache", async () => {
          jest
            .spyOn(httpClientServiceWithAuthentification, 'get')
            .mockResolvedValue(createSuccess(aRésultatsRechercheOffreEmploiResponse()));

          jest
            .spyOn(poleEmploiParamètreBuilderService, 'buildCommonParamètresRecherche')
            .mockResolvedValue('range=0-14');

          jest.spyOn(cacheService, 'get').mockResolvedValue(null);
          jest.spyOn(cacheService, 'set');

          const offreFiltre = anOffreÉchantillonFiltre();

          const { result } = await apiPoleEmploiAlternanceRepository.search(offreFiltre) as Success<RésultatsRechercheOffre>;

          expect(cacheService.get).toHaveBeenCalledWith('ECHANTILLON_OFFRE_ALTERNANCE_KEY');

          expect(result).toEqual(aRésultatsRechercheOffre());
          expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(
            '/search?range=0-14&natureContrat=E2,FS',
            mapRésultatsRechercheOffreResponse,
          );

          expect(cacheService.set).toHaveBeenCalledWith('ECHANTILLON_OFFRE_ALTERNANCE_KEY', aRésultatsRechercheOffreEmploiResponse(), 24);
        });
      });

      describe('quand les informations sont déjà en cache', () => {
        it("ne fait pas l'appel à l'api et get les informations du cache", async () => {
          jest.spyOn(cacheService, 'get').mockResolvedValue(aRésultatsRechercheOffreEmploiResponse());
          jest.spyOn(cacheService, 'set');

          const offreFiltre = anOffreÉchantillonFiltre();

          const { result } = await apiPoleEmploiAlternanceRepository.search(offreFiltre) as Success<RésultatsRechercheOffre>;

          expect(cacheService.get).toHaveBeenCalledWith('ECHANTILLON_OFFRE_ALTERNANCE_KEY');

          expect(result).toEqual(aRésultatsRechercheOffre());
          expect(httpClientServiceWithAuthentification.get).not.toHaveBeenCalled();

          expect(cacheService.set).not.toHaveBeenCalled();
        });

      });
    });

    describe("quand la recherche est lancée par l'utilisateur", () => {
      it("ne get pas les informations du cache et fait appel à l'api avec les filtres", async () => {
        jest
          .spyOn(httpClientServiceWithAuthentification, 'get')
          .mockResolvedValue(createSuccess(aRésultatsRechercheOffre()));

        jest.spyOn(cacheService, 'get').mockResolvedValue(aRésultatsRechercheOffreEmploiResponse());
        jest.spyOn(cacheService, 'set');

        const offreFiltre = anOffreEmploiFiltre();

        const { result } = await apiPoleEmploiAlternanceRepository.search(offreFiltre) as Success<RésultatsRechercheOffre>;

        expect(cacheService.get).not.toHaveBeenCalled();

        expect(result).toEqual(aRésultatsRechercheOffre());
        expect(httpClientServiceWithAuthentification.get).toHaveBeenCalled();

        expect(cacheService.set).not.toHaveBeenCalled();
      });
    });

    describe('quand la range est supérieur à 1149', () => {
      it('renvoie une erreur DEMANDE_INCORRECTE', async () => {
        const offreEmploiFiltre = anOffreEmploiFiltre({ page: 1001 });
        jest
          .spyOn(poleEmploiParamètreBuilderService, 'buildCommonParamètresRecherche')
          .mockResolvedValue(undefined);

        const { errorType } = await apiPoleEmploiAlternanceRepository.search(offreEmploiFiltre) as Failure;

        expect(errorType).toEqual(ErreurMétier.DEMANDE_INCORRECTE);
      });
    });

    describe('quand nombre de résultat est présent dans la réponse', () => {
      it('recherche les offres d’alternance de pole emploi', async () => {
        jest
          .spyOn(httpClientServiceWithAuthentification, 'get')
          .mockResolvedValue(createSuccess(aRésultatsRechercheOffre()));
        jest
          .spyOn(poleEmploiParamètreBuilderService, 'buildCommonParamètresRecherche')
          .mockResolvedValue('region=34&motsCles=boulanger&range=0-14');
        const offreEmploiFiltre = anOffreEmploiFiltre();

        const { result } = await apiPoleEmploiAlternanceRepository.search(offreEmploiFiltre) as Success<RésultatsRechercheOffre>;

        expect(result).toEqual(aRésultatsRechercheOffre());
        expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(
          '/search?region=34&motsCles=boulanger&range=0-14&natureContrat=E2,FS',
          mapRésultatsRechercheOffre,
        );
      });
    });
  });
});
