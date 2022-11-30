import nock from 'nock';

import {
  unContenuEntreprise,
  uneEntreprise,
} from '~/client/services/lesEntreprisesSEngagent/lesEntreprisesSEngagentService.fixture';
import {
  StrapiRejoindreLaMobilisationRepository,
} from '~/server/entreprises/infra/strapiRejoindreLaMobilisation.repository';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';
import { Trap } from '~/server/trap';

describe('StrapiRejoindreLaMobilisationRepository', () => {
  const entreprise = uneEntreprise();
  afterEach(() => {
    nock.cleanAll();
  });

  const strapiUrl = 'http://strapi.local/api';

  describe('.save()', () => {
    const client = new HttpClientServiceWithAuthentification({
      apiName: 'test strapi',
      apiUrl: strapiUrl,
      tokenAgent: {
        getToken: jest.fn(),
      },
    });
    const repository = new StrapiRejoindreLaMobilisationRepository(client);

    it('fait un POST vers Strapi', async () => {
      // Given
      const bodyTrap = Trap<object>();
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

    it('résout un Success', async () => {
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
        const bodyTrap = Trap<object>();
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
      it('Résout une Failure', async () => {
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

