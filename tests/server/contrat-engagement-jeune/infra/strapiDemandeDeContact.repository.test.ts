import { aStrapiHttpClientService } from '@tests/fixtures/services/strapiHttpClientService.fixture';

import { DemandeDeContact } from '~/server/contrat-engagement-jeune/domain/DemandeDeContact';
import { StrapiDemandeDeContactRepository } from '~/server/contrat-engagement-jeune/infra/strapiDemandeDeContact.repository';
import { createFailure,createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

describe('StrapiDemandeDeContactRepository', () => {
  const demandeDeContact: DemandeDeContact = { age: 18, email: 'test@test.com', nom: 'Test', prénom: 'TEST', téléphone: '0123456789', ville: 'Paris' };
  describe('.save()', () => {
    it('fait un POST vers Strapi', async () => {
      // Given
      const spy = aStrapiHttpClientService();
      const repository = new StrapiDemandeDeContactRepository(spy);
      const expectedBody = { data: { age: 18, email: 'test@test.com', nom: 'Test', prenom: 'TEST', telephone: '0123456789', ville: 'Paris' } };
      // When
      await repository.save(demandeDeContact);
      // Then
      expect(spy.post).toHaveBeenCalledWith('contacts', expectedBody);
    });
    it('résoud un Success', async () => {
      // Given
      const spy = aStrapiHttpClientService();
      const repository = new StrapiDemandeDeContactRepository(spy);
      // When
      const result = await repository.save(demandeDeContact);
      // Then
      expect(result).toEqual(createSuccess(undefined));
    });
  });

  describe('Quand la requête HTTP échoue', () => {
    it('Résoud une Failure', async () => {
      // Given
      const spy = aStrapiHttpClientService();
      jest.spyOn(spy, 'post').mockRejectedValue(new Error('Erreur non gérée'));
      const repository = new StrapiDemandeDeContactRepository(spy);
      // When
      const result = await repository.save(demandeDeContact);
      // Then
      expect(result).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
    });
  });
});
