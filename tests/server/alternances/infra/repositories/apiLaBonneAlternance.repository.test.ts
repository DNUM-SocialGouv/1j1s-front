import {
  anApprentiBoucherFromMatcha,
  anApprentiBoucherFromPoleEmploi, aRésultatsRechercheAlternance,
} from '@tests/fixtures/domain/alternance.fixture';
import { aLaBonneAlternanceHttpClient } from '@tests/fixtures/services/laBonneAlternanceHttpClientService.fixture';

import {
  mapMétierRecherchéList, mapRésultatRechercheAlternance,
  mapRésultatsRechercheAlternance,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';
import {
  ApiLaBonneAlternanceRepository,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { AlternanceDetailResponse } from '~/server/alternances/infra/repositories/responses/alternanceResponse.type';
import { createFailure, createSuccess, Success } from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';
import { LaBonneAlternanceHttpClientService } from '~/server/services/http/laBonneAlternanceHttpClient.service';

jest.mock('axios', () => {
  return {
    isAxiosError: jest.fn().mockReturnValue(true),
  };
});

describe('ApiLaBonneAlternanceRepository', () => {
  let apiLaBonneAlternanceRepository: ApiLaBonneAlternanceRepository;
  let laBonneAlternanceHttpClientService: LaBonneAlternanceHttpClientService;

  beforeEach(() => {
    laBonneAlternanceHttpClientService = aLaBonneAlternanceHttpClient();
    apiLaBonneAlternanceRepository = new ApiLaBonneAlternanceRepository(
      laBonneAlternanceHttpClientService,
    );
  });

  describe('getMétierRecherchéList', () => {
    describe('quand l api répond avec un success', () => {
      it('retourne la liste des métiers recherchés par l\'api la bonne alternance', async () => {
        jest.spyOn(laBonneAlternanceHttpClientService, 'get').mockResolvedValue(createSuccess([
          {
            codeROMEList: ['D1103', 'D1101', 'H2101'],
            intitulé: 'Boucherie, charcuterie, traiteur',
          },
          {
            codeROMEList: ['D1102', 'D1104'],
            intitulé: 'Boulangerie, pâtisserie, chocolaterie',
          },
        ]));

        const result = await apiLaBonneAlternanceRepository.getMétierRecherchéList('bou');

        expect(laBonneAlternanceHttpClientService.get).toHaveBeenCalledWith('metiers?title=bou', mapMétierRecherchéList);
        expect([
          {
            codeROMEList: ['D1103', 'D1101', 'H2101'],
            intitulé: 'Boucherie, charcuterie, traiteur',
          },
          {
            codeROMEList: ['D1102', 'D1104'],
            intitulé: 'Boulangerie, pâtisserie, chocolaterie',
          },
        ]).toEqual(result);
      });
    });

    describe('quand l api répond avec une failure', () => {
      it('retourne une liste vide', async () => {
        jest.spyOn(laBonneAlternanceHttpClientService, 'get').mockResolvedValue(createFailure(ErrorType.ERREUR_INATTENDUE));

        const result = await apiLaBonneAlternanceRepository.getMétierRecherchéList('bou');

        expect(laBonneAlternanceHttpClientService.get).toHaveBeenCalledWith('metiers?title=bou', mapMétierRecherchéList);
        expect([]).toEqual(result);
      });
    });
  });

  describe('searchAlternance', () => {
    describe('quand l api retourne un success', () => {
      it('retourne la liste des alternances recherchées par l\'api la bonne alternance filtré par domaine et lieu', async () => {
        jest.spyOn(laBonneAlternanceHttpClientService, 'get').mockResolvedValue(createSuccess(aRésultatsRechercheAlternance()));

        const result = await apiLaBonneAlternanceRepository.searchAlternance({ code: '75001', codeRomeList: ['D1103','D1101','H2101'], latitude:'48.08', longitude:'2.01', radius: '30' });

        expect(laBonneAlternanceHttpClientService.get).toHaveBeenCalledWith('jobs?insee=75001&latitude=48.08&longitude=2.01&radius=30&romes=D1103%2CD1101%2CH2101&caller=1jeune1solution', mapRésultatsRechercheAlternance);
        expect(result).toEqual(aRésultatsRechercheAlternance());
      });
    });

    describe('quand l api retourne une failure', () => {
      it('retourne 0 nombre de résultat et une liste vide', async () => {
        jest.spyOn(laBonneAlternanceHttpClientService, 'get').mockResolvedValue(createFailure(ErrorType.ERREUR_INATTENDUE));

        const result = await apiLaBonneAlternanceRepository.searchAlternance({ code: '75001', codeRomeList: ['D1103','D1101','H2101'], latitude:'48.08', longitude:'2.01', radius: '30' });

        expect(laBonneAlternanceHttpClientService.get).toHaveBeenCalledWith('jobs?insee=75001&latitude=48.08&longitude=2.01&radius=30&romes=D1103%2CD1101%2CH2101&caller=1jeune1solution', mapRésultatsRechercheAlternance);
        expect(result).toEqual({ nombreRésultats: 0, résultats: [] });
      });
    });
  });

  describe('getOffreAlternance', () => {
    describe('quand l\'offre provient de pole emploi', () => {
      it('récupère l\'offre d\'alternance selon l\'id', async () => {

        jest
          .spyOn(laBonneAlternanceHttpClientService, 'get')
          .mockResolvedValue(createSuccess(anApprentiBoucherFromPoleEmploi()));
        const expected = anApprentiBoucherFromPoleEmploi();
        const offreAlternanceId = '134BYGN';
        const from = 'peJob';

        const result = await apiLaBonneAlternanceRepository.getOffreAlternance(offreAlternanceId, from) as unknown as Success<AlternanceDetailResponse>;
        expect(result.result).toEqual(expected);
        expect(laBonneAlternanceHttpClientService.get).toHaveBeenCalledWith(
          `jobs/job/${offreAlternanceId}`,
          mapRésultatRechercheAlternance,
        );
      });
    });

    describe('quand l\'offre provient de matcha', () => {
      it('récupère l\'offre d\'alternance selon l\'id', async () => {

        jest
          .spyOn(laBonneAlternanceHttpClientService, 'get')
          .mockResolvedValue(createSuccess(anApprentiBoucherFromMatcha()));
        const expected = anApprentiBoucherFromMatcha();
        const offreAlternanceId = '628a65a72ff4860027ae1531';
        const from = 'matcha';

        const result = await apiLaBonneAlternanceRepository.getOffreAlternance(offreAlternanceId, from) as unknown as Success<AlternanceDetailResponse>;
        expect(result.result).toEqual(expected);
        expect(laBonneAlternanceHttpClientService.get).toHaveBeenCalledWith(
          `jobs/matcha/${offreAlternanceId}`,
          mapRésultatRechercheAlternance,
        );
      });
    });
  });
});
