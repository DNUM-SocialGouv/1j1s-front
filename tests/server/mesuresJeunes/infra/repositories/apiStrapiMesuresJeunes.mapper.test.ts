import {
  aMesuresJeunes,
  aMesuresJeunesResponse,
} from '@tests/fixtures/domain/mesuresJeunes.fixture';

import { mapMesuresJeunes } from '~/server/mesuresJeunes/infra/repositories/apiStrapiMesuresJeunes.mapper';

describe('ApiStrapiMesuresJeunesMapper', () => {
  describe('mapMesuresJeunes', () => {
    describe('lorsque la liste contient les mesures jeunes', () => {
      it('retourne les mesures jeunes', () => {
        const mesuresJeunesResponse = aMesuresJeunesResponse();
        const expectedMesuresJeunes = aMesuresJeunes();
        const mesuresJeunes = mapMesuresJeunes(mesuresJeunesResponse);
        expect(mesuresJeunes).toEqual(expectedMesuresJeunes);
      });
    });
  });
});
