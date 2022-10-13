import {
  aMétierList,
  anApprentiBoucherFromMatcha,
  anApprentiBoucherOffreFromPoleEmploi,
  aRésultatsRechercheAlternance,
} from '@tests/fixtures/domain/alternance.fixture';
import { MockedCacheService } from '@tests/fixtures/services/cacheService.fixture';
import {
  aLaBonneAlternanceHttpClient,
  anAlternanceListResponse,
} from '@tests/fixtures/services/laBonneAlternanceHttpClientService.fixture';

import { RésultatsRechercheAlternance } from '~/server/alternances/domain/alternance';
import { ConsulterOffreAlternance } from '~/server/alternances/infra/repositories/alternance.type';
import {
  mapMétierRecherchéList,
  mapRésultatsRechercheAlternanceResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';
import {
  ApiLaBonneAlternanceRepository,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import {
  createFailure,
  createSuccess,
  Success,
} from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { CacheService } from '~/server/services/cache/cache.service';
import { HttpClientService } from '~/server/services/http/httpClient.service';


jest.mock('axios', () => {
  return {
    isAxiosError: jest.fn().mockReturnValue(true),
  };
});

describe('ApiLaBonneAlternanceRepository', () => {
  let apiLaBonneAlternanceRepository: ApiLaBonneAlternanceRepository;
  let httpClientService: HttpClientService;
  let cacheService: CacheService;

  beforeEach(() => {
    cacheService = new MockedCacheService();
    httpClientService = aLaBonneAlternanceHttpClient();
    apiLaBonneAlternanceRepository = new ApiLaBonneAlternanceRepository(
      httpClientService,
      cacheService,
    );
  });

  describe('getMétierRecherchéList', () => {
    describe('quand l api répond avec un success', () => {
      it('retourne la liste des métiers recherchés filtrée de l\'api la bonne alternance, insensiblement à la casse', async () => {
        jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aMétierList()));

        const result = await apiLaBonneAlternanceRepository.getMétierRecherchéList('énergie');

        expect(httpClientService.get).toHaveBeenCalledWith('metiers?title=energie', mapMétierRecherchéList);
        expect([
          {
            codeROMEList: ['H1302', 'H1206', 'H2502', 'H1102', 'I1102', 'H1502', 'H1504', 'H1209', 'H1402', 'F1203', 'I1302', 'I1304', 'F1401', 'F1402', 'H2701'],
            intitulé: 'Energie',
          },
          {
            codeROMEList: ['I1307'],
            intitulé: 'Installation et maintenance réseaux telecom et énergie',
          },
        ]).toEqual(result);
      });
    });

    describe('quand l api répond avec une failure', () => {
      it('retourne une liste vide', async () => {
        jest.spyOn(httpClientService, 'get').mockResolvedValue(createFailure(ErreurMétier.CONTENU_INDISPONIBLE));

        const result = await apiLaBonneAlternanceRepository.getMétierRecherchéList('bou');

        expect(httpClientService.get).toHaveBeenCalledWith('metiers?title=bou', mapMétierRecherchéList);
        expect([]).toEqual(result);
      });
    });
  });

  describe('searchAlternance', () => {
    describe('quand l api retourne un success', () => {
      it('met les résultats dans le cache et retourne la liste des alternances recherchées par l\'api la bonne alternance filtré par domaine et lieu', async () => {
        jest
          .spyOn(httpClientService, 'get')
          .mockResolvedValue(createSuccess(anAlternanceListResponse()));

        jest.spyOn(cacheService, 'set');

        const result  = await apiLaBonneAlternanceRepository.searchAlternance({
          code: '75001',
          codeRomeList: ['D1103', 'D1101', 'H2101'],
          latitude: '48.08',
          longitude: '2.01',
          radius: '30',
        }) as Success<RésultatsRechercheAlternance>;

        expect(httpClientService.get).toHaveBeenCalledWith(
          'jobs?insee=75001&latitude=48.08&longitude=2.01&radius=30&romes=D1103%2CD1101%2CH2101&caller=1jeune1solution',
          mapRésultatsRechercheAlternanceResponse,
        );

        expect(result).toEqual(aRésultatsRechercheAlternance());
        expect(cacheService.set).toHaveBeenCalledWith('ALTERNANCE_KEY', anAlternanceListResponse(), 2);
      });
    });

    describe('quand l api retourne une failure', () => {
      it('retourne 0 nombre de résultat et une liste vide et ne met rien en cache', async () => {
        jest.spyOn(httpClientService, 'get').mockResolvedValue(createFailure(ErreurMétier.CONTENU_INDISPONIBLE));

        jest.spyOn(cacheService, 'set');
        const result = await apiLaBonneAlternanceRepository.searchAlternance({
          code: '75001',
          codeRomeList: ['D1103', 'D1101', 'H2101'],
          latitude: '48.08',
          longitude: '2.01',
          radius: '30',
        });

        expect(httpClientService.get).toHaveBeenCalledWith(
          'jobs?insee=75001&latitude=48.08&longitude=2.01&radius=30&romes=D1103%2CD1101%2CH2101&caller=1jeune1solution',
          mapRésultatsRechercheAlternanceResponse,
        );
        expect(result).toEqual({ nombreRésultats: 0, résultats: [] });
        expect(cacheService.set).not.toHaveBeenCalled();
      });
    });
  });

  describe('getOffreAlternance', () => {
    describe('quand l\'offre provient de matcha', () => {
      it('récupère l\'offre d\'alternance selon l\'id', async () => {
        jest.spyOn(cacheService, 'get').mockResolvedValue(anAlternanceListResponse());

        const expected = anApprentiBoucherFromMatcha();
        const offreAlternanceId = '628a64ed2ff4860027ae1501';

        const { result } = await apiLaBonneAlternanceRepository.getOffreAlternance(offreAlternanceId, 'matcha') as Success<ConsulterOffreAlternance>;
        expect(result).toEqual(expected);

      });
    });

    describe('quand l\'offre provient de peJob', () => {
      it('récupère l\'offre d\'alternance selon l\'id', async () => {
        jest.spyOn(cacheService, 'get').mockResolvedValue(anAlternanceListResponse());

        const expected = anApprentiBoucherOffreFromPoleEmploi();
        const offreAlternanceId = '134CMXJ';

        const { result } = await apiLaBonneAlternanceRepository.getOffreAlternance(offreAlternanceId, 'peJob') as Success<ConsulterOffreAlternance>;
        expect(result).toEqual(expected);

      });
    });

    describe("quand l'offre  n'est pas trouvé", () => {
      describe('quand le cache est vide', () => {
        it('retourne une erreur demande incorrecte', async () => {
          jest.spyOn(cacheService, 'get').mockResolvedValue(null);

          const  result  = await apiLaBonneAlternanceRepository.getOffreAlternance('an-id', 'peJob') ;
          expect(result).toEqual(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
        });
      });

      describe("quand le from est matcha  mais l'offre n'est pas trouvé", () => {
        it('retourne une erreur demande incorrecte', async () => {
          jest.spyOn(cacheService, 'get').mockResolvedValue(anAlternanceListResponse());
          const  result  = await apiLaBonneAlternanceRepository.getOffreAlternance('an-id', 'peJob') ;
          expect(result).toEqual(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
        });
      });

      describe("quand le from est peJob  mais l'offre n'est pas trouvé", () => {
        it('retourne une erreur demande incorrecte', async () => {
          jest.spyOn(cacheService, 'get').mockResolvedValue(anAlternanceListResponse());
          const  result  = await apiLaBonneAlternanceRepository.getOffreAlternance('an-id', 'matcha') ;
          expect(result).toEqual(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
        });
      });
    });
  });
});
