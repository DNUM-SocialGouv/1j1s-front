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

jest.mock('~/server/services/logger.service');

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
          'partenaire/offresdemploi/v2/offres/search?motsCles=boulanger&range=0-29&typeContrat=CDD%2CCDI&region=34',
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
          'partenaire/offresdemploi/v2/offres/search?motsCles=boulanger&range=0-29&typeContrat=CDD%2CCDI&region=34',
        );
      });
    });
  });

  describe('buildParamètresRecherche', () => {
    describe('quand tous les paramètres sont présents dans le filtre', () => {
      it('retourne les paramètres de recherche', () => {
        const offreEmploiFiltre = anOffreEmploiFiltre();
        const result = apiPoleEmploiOffreRepository.buildParamètresRecherche(offreEmploiFiltre);

        expect(result).toEqual('motsCles=boulanger&range=0-29&typeContrat=CDD%2CCDI&region=34');
      });
    });

    describe('quand un paramètre est absent', () => {
      it('quand motClé est absent, retourne motsCles vide dans les paramètres de l\'url', () => {
        const offreEmploiFiltre = anOffreEmploiFiltre({ motClé: undefined });
        const result = apiPoleEmploiOffreRepository.buildParamètresRecherche(offreEmploiFiltre);

        expect(result).toEqual('motsCles=&range=0-29&typeContrat=CDD%2CCDI&region=34');
      });

      it('quand la localisation est absente, ne retourne pas la localisation dans les paramètres de l\'url', () => {
        const offreEmploiFiltre = anOffreEmploiFiltre({ localisation: undefined });
        const result = apiPoleEmploiOffreRepository.buildParamètresRecherche(offreEmploiFiltre);

        expect(result).toEqual('motsCles=boulanger&range=0-29&typeContrat=CDD%2CCDI');
      });
    });

    describe('quand la page vaut 1', () => {
      it('retourne les paramètres de recherche', () => {
        const offreEmploiFiltre = anOffreEmploiFiltre();
        const result = apiPoleEmploiOffreRepository.buildParamètresRecherche(offreEmploiFiltre);

        expect(result).toEqual('motsCles=boulanger&range=0-29&typeContrat=CDD%2CCDI&region=34');
      });
    });

    describe('quand la page vaut 3', () => {
      it('retourne les paramètres de recherche', () => {
        const offreEmploiFiltre = anOffreEmploiFiltre({
          motClé: 'électricien',
          page: 3,
        });
        const result = apiPoleEmploiOffreRepository.buildParamètresRecherche(offreEmploiFiltre);

        expect(result).toEqual('motsCles=%C3%A9lectricien&range=60-89&typeContrat=CDD%2CCDI&region=34');
      });
    });
  });

  describe('quand le mot clé est absent', () => {
    it('retourne des paramètres de recherche avec motsCles à vide', () => {
      const offreEmploiFiltre = anOffreEmploiFiltre({ motClé: undefined });
      const result = apiPoleEmploiOffreRepository.buildParamètresRecherche(offreEmploiFiltre);

      expect(result).toEqual('motsCles=&range=0-29&typeContrat=CDD%2CCDI&region=34');
    });
  });
});

