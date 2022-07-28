import { anApiAdresseHttpClientService } from '@tests/fixtures/services/apiAdresseHttpClientService.fixture';

import { createSuccess, Success } from '~/server/errors/either';
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
          .mockResolvedValue(createSuccess({
            résultats: [
              {
                code: '93005',
                coordonnées: {
                  latitude: 48.926541,
                  longitude: 2.493832,
                },
                libelle: '20 Avenue Jules Jouy 93600 Aulnay-sous-Bois',
                ville: 'Aulnay-sous-Bois',
              },
              {
                code: '28201',
                coordonnées: {
                  latitude: 48.510887,
                  longitude: 1.553914,
                },
                libelle: '20 Avenue de la Gare 28300 Jouy',
                ville: 'Jouy',
              },
            ],
          }));
        const recherche = 'jou';
        const expected = {
          résultats: [
            {
              code: '93005',
              coordonnées: {
                latitude: 48.926541,
                longitude: 2.493832,
              },
              libelle: '20 Avenue Jules Jouy 93600 Aulnay-sous-Bois',
              ville: 'Aulnay-sous-Bois',
            },
            {
              code: '28201',
              coordonnées: {
                latitude: 48.510887,
                longitude: 1.553914,
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
  });
});
