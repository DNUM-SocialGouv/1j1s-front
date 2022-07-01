import {
  anApiAdresseHttpClientService,
  aRechercheAdresseResponse,
} from '@tests/fixtures/services/apiAdresseHttpClientService.fixture';
import { anAxiosErreur } from '@tests/fixtures/services/httpClientService.fixture';

import {
  Failure,
  Success,
} from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';
import { RésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées';
import { ApiAdresseRepository } from '~/server/localisations/infra/repositories/apiAdresse.repository';
import { ApiAdresseHttpClientService } from '~/server/services/http/apiAdresseHttpClient.service';

describe('ApiAdresseRepository', () => {
  let apiAdresseHttpClientService: ApiAdresseHttpClientService;
  let apiAdresseRepository: ApiAdresseRepository;

  beforeEach(() => {
    apiAdresseHttpClientService = anApiAdresseHttpClientService();
    apiAdresseRepository = new ApiAdresseRepository(apiAdresseHttpClientService);
  });

  describe('getCommuneList', () => {
    describe('quand la liste de communes est trouvée',() => {
      it('retourne la liste des communes', async () => {
        jest
          .spyOn(apiAdresseHttpClientService, 'get')
          .mockResolvedValue(aRechercheAdresseResponse());
        const recherche = 'jou';
        const expected = {
          résultats: [
            {
              code: '93005',
              coordonnées: {
                lat: 48.926541,
                lon: 2.493832,
              },
              libelle: '20 Avenue Jules Jouy 93600 Aulnay-sous-Bois',
              ville: 'Aulnay-sous-Bois',
            },
            {
              code: '28201',
              coordonnées: {
                lat: 48.510887,
                lon: 1.553914,
              },
              libelle: '20 Avenue de la Gare 28300 Jouy',
              ville: 'Jouy',
            },
          ],
        };

        const { result } = await apiAdresseRepository.getCommuneList(recherche) as Success<RésultatsRechercheCommune>;

        expect(result).toEqual(expected);
      });
    });

    describe('quand l\'api répond avec une 500', () => {
      it('on renvoie une failure avec une error SERVICE_INDISPONIBLE', async () => {
        jest
          .spyOn(apiAdresseHttpClientService, 'get')
          .mockRejectedValue(anAxiosErreur(500));
        const recherche = 'paris';

        const result = await apiAdresseRepository.getCommuneList(recherche) as Failure;

        expect(result.errorType).toEqual(ErrorType.SERVICE_INDISPONIBLE);
      });
    });

    describe('quand l\'api répond avec une erreur non traité', () => {
      it('on renvoie une failure avec une error ERREUR_INATTENDUE', async () => {
        jest
          .spyOn(apiAdresseHttpClientService, 'get')
          .mockRejectedValue(anAxiosErreur(666));
        const recherche = 'not a commune at all';

        const result = await apiAdresseRepository.getCommuneList(recherche) as Failure;

        expect(result.errorType).toEqual(ErrorType.ERREUR_INATTENDUE);
      });
    });
  });
});
