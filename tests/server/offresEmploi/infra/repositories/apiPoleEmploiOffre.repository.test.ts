import {
  aBarmanOffreEmploi,
  anOffreEmploiFiltre,
  aRésultatsRechercheOffreEmploi,
} from '@tests/fixtures/domain/offreEmploi.fixture';
import {
  aApiPoleEmploiRéférentielRepository,
} from '@tests/fixtures/server/offresEmploi/apiPoleEmploiRéférentiel.repository.fixture';
import { aPoleEmploiHttpClient } from '@tests/fixtures/services/poleEmploiHttpClientService.fixture';

import { createSuccess, Success } from '~/server/errors/either';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';
import { OffreEmploi, RésultatsRechercheOffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import {
  mapOffreEmploi,
  mapRésultatsRechercheOffreEmploi,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploi.mapper';
import { ApiPoleEmploiOffreRepository } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.repository';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';

describe('ApiPoleEmploiOffreRepository', () => {
  let httpClientServiceWithAuthentification: HttpClientServiceWithAuthentification;
  let apiPoleEmploiOffreRepository: ApiPoleEmploiOffreRepository;
  let apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository;

  beforeEach(() => {
    httpClientServiceWithAuthentification = aPoleEmploiHttpClient();
    apiPoleEmploiRéférentielRepository = aApiPoleEmploiRéférentielRepository();
    apiPoleEmploiOffreRepository = new ApiPoleEmploiOffreRepository(httpClientServiceWithAuthentification, apiPoleEmploiRéférentielRepository);
  });

  describe('getOffreEmploi', () => {
    describe('quand l\'offre d\'emploi est trouvé', () => {
      it('récupère l\'offre d\'emploi selon l\'id', async () => {
        jest
          .spyOn(httpClientServiceWithAuthentification, 'get')
          .mockResolvedValue(createSuccess( aBarmanOffreEmploi()));
        const expected = aBarmanOffreEmploi();
        const offreEmploiId = expected.id;

        const { result } = await apiPoleEmploiOffreRepository.getOffreEmploi(offreEmploiId) as Success<OffreEmploi>;

        expect(result).toEqual(expected);
        expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(
          'partenaire/offresdemploi/v2/offres/132LKFB',
          mapOffreEmploi,
        );
      });
    });
  });

  describe('searchOffreEmploi', () => {
    describe('quand nombre de résultat est présent dans la réponse', () => {
      it('recherche les offres d\'emploi de pole emploi', async () => {
        jest
          .spyOn(httpClientServiceWithAuthentification, 'get')
          .mockResolvedValue(createSuccess(aRésultatsRechercheOffreEmploi()));
        const offreEmploiFiltre = anOffreEmploiFiltre();

        const { result } = await apiPoleEmploiOffreRepository.searchOffreEmploi(offreEmploiFiltre) as Success<RésultatsRechercheOffreEmploi>;

        expect(result).toEqual(aRésultatsRechercheOffreEmploi());
        expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(
          'partenaire/offresdemploi/v2/offres/search?motsCles=boulanger&range=0-29&typeContrat=CDD%2CCDI&region=34',
          mapRésultatsRechercheOffreEmploi,
        );
      });

      it('recherche les offres d\'emploi de pole emploi avec une localisation qui est une commune on va rechercher le code insee sur le référentiel de pole emploi', async () => {
        jest
          .spyOn(httpClientServiceWithAuthentification, 'get')
          .mockResolvedValue(createSuccess(aRésultatsRechercheOffreEmploi()));
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
        expect(httpClientServiceWithAuthentification.get).toHaveBeenCalledWith(
          'partenaire/offresdemploi/v2/offres/search?motsCles=boulanger&range=0-29&typeContrat=CDD%2CCDI&commune=75101',
          mapRésultatsRechercheOffreEmploi,
        );
      });
    });
  });
});
