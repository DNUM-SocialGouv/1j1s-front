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
    describe('quand nombre de résultat est présent dans la réponse', () => {
      it('recherche les offres d\'emploi de pole emploi', async () => {
        jest
          .spyOn(poleEmploiHttpClientService, 'get')
          .mockResolvedValue(aRésultatRechercheOffreEmploiAxiosResponse());
        const offreEmploiFiltre = anOffreEmploiFiltre();

        const result = await apiPoleEmploiOffreRepository.searchOffreEmploi(offreEmploiFiltre);

        expect(result).toEqual(aRésultatsRechercheOffreEmploi());
        expect(poleEmploiHttpClientService.get).toHaveBeenCalledWith(
          'partenaire/offresdemploi/v2/offres/search?motsCles=boulanger&range=0-29&typeContrat=CDD%2CCDI',
        );
        expect(LoggerService.info).toHaveBeenCalledWith(
          'Recherche offre emploi avec filtres {"motClé":"boulanger","page":1,"typeDeContrats":["CDD","CDI"]}',
        );
      });
    });

    describe('quand nombre de résultat est absent dans la réponse', () => {
      it('recherche les offres d\'emploi de pole emploi', async () => {
        jest
          .spyOn(poleEmploiHttpClientService, 'get')
          .mockResolvedValue(aRésultatRechercheOffreEmploiAxiosResponse({ filtresPossibles: undefined }));
        const offreEmploiFiltre = anOffreEmploiFiltre();

        const result = await apiPoleEmploiOffreRepository.searchOffreEmploi(offreEmploiFiltre);

        expect(result).toEqual(aRésultatsRechercheOffreEmploi({ nombreRésultats: 0 }));
        expect(poleEmploiHttpClientService.get).toHaveBeenCalledWith(
          'partenaire/offresdemploi/v2/offres/search?motsCles=boulanger&range=0-29',
        );
        expect(LoggerService.info).toHaveBeenCalledWith(
          'Recherche offre emploi avec filtres {"motClé":"boulanger","page":1}',
        );
      });
    });
  });

  describe('buildParamètresRecherche', () => {
    describe('quand tous les paramètres sont présents dans le filtre', () => {
      it('retourne les paramètres de recherche', () => {
        const offreEmploiFiltre = anOffreEmploiFiltre();
        const result = apiPoleEmploiOffreRepository.buildParamètresRecherche(offreEmploiFiltre);

        expect(result).toEqual('motsCles=boulanger&range=0-29&typeContrat=CDD%2CCDI');
      });
    });

    describe('quand un paramètre est absent', () => {
      it('retourne ce paramètres de recherche à vide', () => {
        const offreEmploiFiltre = anOffreEmploiFiltre({ motClé: undefined });
        const result = apiPoleEmploiOffreRepository.buildParamètresRecherche(offreEmploiFiltre);

        expect(result).toEqual('motsCles=&range=0-29&typeContrat=CDD%2CCDI');
      });
    });

    describe('quand la page vaut 1', () => {
      it('retourne les paramètres de recherche', () => {
        const offreEmploiFiltre = anOffreEmploiFiltre();
        const result = apiPoleEmploiOffreRepository.buildParamètresRecherche(offreEmploiFiltre);

        expect(result).toEqual('motsCles=boulanger&range=0-29&typeContrat=CDD%2CCDI');
      });
    });

    describe('quand la page vaut 3', () => {
      it('retourne les paramètres de recherche', () => {
        const offreEmploiFiltre = anOffreEmploiFiltre({
          motClé: 'électricien',
          page: 3,
        });
        const result = apiPoleEmploiOffreRepository.buildParamètresRecherche(offreEmploiFiltre);

        expect(result).toEqual('motsCles=%C3%A9lectricien&range=60-89&typeContrat=CDD%2CCDI');
      });
    });
  });

  describe('quand le mot clé est absent', () => {
    it('retourne des paramètres de recherche avec motsCles à vide', () => {
      const offreEmploiFiltre = anOffreEmploiFiltre({ motClé: undefined });
      const result = apiPoleEmploiOffreRepository.buildParamètresRecherche(offreEmploiFiltre);

      expect(result).toEqual('motsCles=&range=0-29&typeContrat=CDD%2CCDI');
    });
  });
});

