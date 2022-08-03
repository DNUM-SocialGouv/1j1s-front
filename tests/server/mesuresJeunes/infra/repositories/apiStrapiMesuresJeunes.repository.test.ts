import { aMesuresJeunes } from '@tests/fixtures/domain/mesuresJeunes.fixture';
import { aStrapiHttpClientService } from '@tests/fixtures/services/strapiHttpClientService.fixture';

import { createSuccess, Success } from '~/server/errors/either';
import { MesuresJeunes } from '~/server/mesuresJeunes/domain/mesuresJeunes';
import { mapMesuresJeunes } from '~/server/mesuresJeunes/infra/repositories/apiStrapiMesuresJeunes.mapper';
import {
  ApiStrapiMesuresJeunesRepository,
} from '~/server/mesuresJeunes/infra/repositories/apiStrapiMesuresJeunes.repository';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';

let strapiHttpClientService: StrapiHttpClientService;
let apiStrapiMesuresJeunesRepository: ApiStrapiMesuresJeunesRepository;

describe('ApiStrapiMesuresJeunesRepository', () => {
  describe('getCartesMesuresJeunes', () => {
    beforeAll(() => {
      strapiHttpClientService = aStrapiHttpClientService();
      apiStrapiMesuresJeunesRepository = new ApiStrapiMesuresJeunesRepository(strapiHttpClientService);
    });
    describe('Si les cartes mesures jeunes sont trouvés', () => {
      it('récupère les cartes jeunes', async () => {
        jest.spyOn(strapiHttpClientService, 'get').mockResolvedValue(createSuccess(aMesuresJeunes()));
        const expectedMesuesJeunes = aMesuresJeunes();
        const result = await apiStrapiMesuresJeunesRepository.getMesuresJeunes() as Success<MesuresJeunes>;

        expect(result.result).toEqual(expectedMesuesJeunes);
        expect(strapiHttpClientService.get).toHaveBeenCalledWith('mesure-jeune?populate[vieProfessionnelle][populate]=*&populate[orienterFormer][populate]=*&populate[accompagnement][populate]=*&populate[aidesFinancieres][populate]=*', mapMesuresJeunes);
      });
    });
  });
});
