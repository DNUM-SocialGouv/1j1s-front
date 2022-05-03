import {
  aBarmanOffreEmploi,
  anOffreEmploiFiltre,
  aRésultatsRechercheOffreEmploi,
} from '@tests/fixtures/domain/offreEmploi.fixture';
import {
  aBarmanOffreEmploiAxiosResponse,
  aPoleEmploiHttpClient,
  aRésultatRechercheOffreEmploiAxiosResponse,
} from '@tests/fixtures/services/poleEmploiHttpClientService.fixture';

import { ApiPoleEmploiOffreRepository } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.repository';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';
import { LoggerService } from '~/server/services/logger.service';

jest.mock('~/server/services/logger.service', () => {
  return {
    LoggerService: {
      error: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
    },
  };
});

describe('ApiPoleEmploiOffreRepository', () => {
  let poleEmploiHttpClientService: PoleEmploiHttpClientService;
  let apiPoleEmploiOffreRepository: ApiPoleEmploiOffreRepository;

  beforeEach(() => {
    poleEmploiHttpClientService = aPoleEmploiHttpClient();
    apiPoleEmploiOffreRepository = new ApiPoleEmploiOffreRepository(poleEmploiHttpClientService);
  });

  describe('getOffreEmploi', () => {
    it('récupère l\'offre d\'emploi selon l\'id', async () => {
      jest
        .spyOn(poleEmploiHttpClientService, 'get')
        .mockResolvedValue(aBarmanOffreEmploiAxiosResponse());
      const expected = aBarmanOffreEmploi();
      const offreEmploiId = expected.id;

      const result = await apiPoleEmploiOffreRepository.getOffreEmploi(offreEmploiId);

      expect(result).toEqual(expected);
      expect(poleEmploiHttpClientService.get).toHaveBeenCalledWith(
        'partenaire/offresdemploi/v2/offres/132LKFB',
      );
      expect(LoggerService.info).toHaveBeenCalledWith(
        'Récupération offre emploi 132LKFB',
      );
    });
  });

  describe('searchOffreEmploi', () => {
    it('recherche les offres d\'emploi de pole emploi', async () => {
      jest
        .spyOn(poleEmploiHttpClientService, 'get')
        .mockResolvedValue(aRésultatRechercheOffreEmploiAxiosResponse());
      const offreEmploiFiltre = anOffreEmploiFiltre();

      const result = await apiPoleEmploiOffreRepository.searchOffreEmploi(offreEmploiFiltre);

      expect(result).toEqual(aRésultatsRechercheOffreEmploi());
      expect(poleEmploiHttpClientService.get).toHaveBeenCalledWith(
        'partenaire/offresdemploi/v2/offres/search?range=0-29&motsCles=boulanger',
      );
      expect(LoggerService.info).toHaveBeenCalledWith(
        'Recherche offre emploi avec filtres {"motClé":"boulanger","page":1}',
      );
    });
  });

  describe('buildParamètresRecherche', () => {
    describe('quand le mot clé existe', () => {
      describe('quand la page vaut 1', () => {
        it('retourne les paramètres de recherche', () => {
          const offreEmploiFiltre = anOffreEmploiFiltre();
          const result = apiPoleEmploiOffreRepository.buildParamètresRecherche(offreEmploiFiltre);

          expect(result).toEqual('range=0-29&motsCles=boulanger');
        });
      });

      describe('quand la page vaut 3', () => {
        it('retourne les paramètres de recherche', () => {
          const offreEmploiFiltre = anOffreEmploiFiltre({ page: 3 });
          const result = apiPoleEmploiOffreRepository.buildParamètresRecherche(offreEmploiFiltre);

          expect(result).toEqual('range=60-89&motsCles=boulanger');
        });
      });
    });

    describe('quand le mot clé est absent', () => {
      it('retourne des paramètres de recherche avec motsCles à vide', () => {
        const offreEmploiFiltre = anOffreEmploiFiltre({ motClé: undefined });
        const result = apiPoleEmploiOffreRepository.buildParamètresRecherche(offreEmploiFiltre);

        expect(result).toEqual('range=0-29&motsCles=');
      });
    });
  });
});
