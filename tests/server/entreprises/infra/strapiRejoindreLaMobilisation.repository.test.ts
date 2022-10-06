import { unContenuEntreprise, uneEntreprise } from '@tests/fixtures/client/services/lesEntreprisesSEngagementService.fixture';
import nock from 'nock';

import {
  StrapiRejoindreLaMobilisationRepository,
} from '~/server/entreprises/infra/strapiRejoindreLaMobilisation.repository';
import { createFailure,createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { HttpClientService } from '~/server/services/http/httpClient.service';

describe('StrapiRejoindreLaMobilisationRepository', () => {
  const entreprise = uneEntreprise();
  afterEach(() => {
    nock.cleanAll();
  });

  const strapiUrl = 'http://strapi.local/api';

  describe('.save()', () => {
    const client = new HttpClientService({
      apiName: 'test strapi',
      apiUrl: strapiUrl,
    });
    const repository = new StrapiRejoindreLaMobilisationRepository(client);

    it('fait un POST vers Strapi', async () => {
      // Given
      const bodyTrap = trap<any>();
      const strapi = nock(strapiUrl)
        .post('/entreprises', bodyTrap)
        .reply(201, {});
      const expectedBody = {
        data: unContenuEntreprise(),
      };
      // When
      await repository.save(entreprise);
      // Then
      expect(strapi.isDone()).toBe(true);
      expect(bodyTrap.value()).toEqual(expectedBody);
    });
    it('résoud un Success', async () => {
      // Given
      nock(strapiUrl)
        .post('/entreprises')
        .reply(201, {});
      // When
      const result = await repository.save(entreprise);
      // Then
      expect(result).toEqual(createSuccess(undefined));
    });
    describe('Quand il y a une annotation', () => {
      it('ajoute l\'annotation aux champs envoyés', async () => {
        // Given
        const bodyTrap = trap<any>();
        nock(strapiUrl)
          .post('/entreprises', bodyTrap)
          .reply(201, {});
        const annotation = 'un petit mot pour plus tard';
        const expectedBody = {
          data: {
            ...unContenuEntreprise(),
            erreur: annotation,
          },
        };
        // When
        await repository.save(entreprise, annotation);
        // Then
        expect(bodyTrap.value()).toEqual(expectedBody);
      });
    });

    describe('Quand la requête HTTP échoue', () => {
      it('Résoud une Failure', async () => {
      // Given
        nock(strapiUrl)
          .post('/entreprises')
          .reply(500, {});
        // When
        const result = await repository.save(entreprise);
        // Then
        expect(result).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
      });
    });
  });
});

function trap<T> () {

  let value: T|undefined = undefined;
  function t(p: T) {
    value = p;
    return true;
  }

  t.value = () => value;

  return t;
}
