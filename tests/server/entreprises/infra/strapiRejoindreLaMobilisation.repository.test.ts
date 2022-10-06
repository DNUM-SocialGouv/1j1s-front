import { unContenuEntreprise, uneEntreprise } from '@tests/fixtures/client/services/lesEntreprisesSEngagementService.fixture';
import { aStrapiHttpClientService } from '@tests/fixtures/services/strapiHttpClientService.fixture';

import {
  StrapiRejoindreLaMobilisationRepository,
} from '~/server/entreprises/infra/strapiRejoindreLaMobilisation.repository';
import { createFailure,createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

describe('StrapiRejoindreLaMobilisationRepository', () => {
  const entreprise = uneEntreprise();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('.save()', () => {
    it('fait un POST vers Strapi', async () => {
      // Given
      const spy = aStrapiHttpClientService();
      const repository = new StrapiRejoindreLaMobilisationRepository(spy);
      const expectedBody = {
        data: unContenuEntreprise(),
      };
      // When
      await repository.save(entreprise);
      // Then
      expect(spy.post).toHaveBeenCalledWith('entreprises', expectedBody);
    });
    it('résoud un Success', async () => {
      // Given
      const spy = aStrapiHttpClientService();
      const repository = new StrapiRejoindreLaMobilisationRepository(spy);
      // When
      const result = await repository.save(entreprise);
      // Then
      expect(result).toEqual(createSuccess(undefined));
    });
  });

  describe('Quand la requête HTTP échoue', () => {
    it('Résoud une Failure', async () => {
      // Given
      const spy = aStrapiHttpClientService();
      jest.spyOn(spy, 'post').mockRejectedValue(new Error('Erreur non gérée'));
      const repository = new StrapiRejoindreLaMobilisationRepository(spy);
      // When
      const result = await repository.save(entreprise);
      // Then
      expect(result).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
    });
  });
});
