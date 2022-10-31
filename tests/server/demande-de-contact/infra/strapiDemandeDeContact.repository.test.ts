import { aStrapiHttpClientService } from '@tests/fixtures/services/strapiHttpClientService.fixture';

import { DemandeDeContactCEJ, DemandeDeContactEntreprise } from '~/server/demande-de-contact/domain/DemandeDeContact';
import { StrapiDemandeDeContactRepository } from '~/server/demande-de-contact/infra/strapiDemandeDeContact.repository';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

describe('StrapiDemandeDeContactRepository', () => {
  
  describe('.saveCEJ()', () => {
    const demandeDeContactCEJ: DemandeDeContactCEJ = { age: 18, codePostal: '75001', email: 'test@test.com', nom: 'Test', prénom: 'TEST', téléphone: '0123456789', ville: 'Paris' };

    it('fait un POST vers Strapi', async () => {
      // Given
      const spy = aStrapiHttpClientService();
      const repository = new StrapiDemandeDeContactRepository(spy);
      const expectedBody = { data: { age: 18, code_postal: '75001', email: 'test@test.com', nom: 'Test', prenom: 'TEST', telephone: '0123456789', ville: 'Paris' } };
      // When
      await repository.saveCEJ(demandeDeContactCEJ);
      // Then
      expect(spy.post).toHaveBeenCalledWith('contact-cejs', expectedBody);
    });
    it('résout un Success', async () => {
      // Given
      const spy = aStrapiHttpClientService();
      const repository = new StrapiDemandeDeContactRepository(spy);
      // When
      const result = await repository.saveCEJ(demandeDeContactCEJ);
      // Then
      expect(result).toEqual(createSuccess(undefined));
    });

    describe('Quand la requête HTTP échoue', () => {
      it('Résout une Failure', async () => {
        // Given
        const spy = aStrapiHttpClientService();
        jest.spyOn(spy, 'post').mockRejectedValue(new Error('Erreur non gérée'));
        const repository = new StrapiDemandeDeContactRepository(spy);
        // When
        const result = await repository.saveCEJ(demandeDeContactCEJ);
        // Then
        expect(result).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
      });
    });
  });
  
  describe('.saveEntreprise()', () => {
    const demandeDeContactEntreprise: DemandeDeContactEntreprise = { email: 'test@test.com', message: 'rrr', nom: 'Test', prénom: 'TEST', sujet: 'super sujet', téléphone: '0123456789' };

    it('fait un POST vers Strapi', async () => {
      // Given
      const spy = aStrapiHttpClientService();
      const repository = new StrapiDemandeDeContactRepository(spy);
      const expectedBody = { data: { email: 'test@test.com', message: 'rrr', nom: 'Test', prenom: 'TEST', sujet: 'super sujet', telephone: '0123456789' } };
      // When
      await repository.saveEntreprise(demandeDeContactEntreprise);
      // Then
      expect(spy.post).toHaveBeenCalledWith('contact-entreprises', expectedBody);
    });
    it('résout un Success', async () => {
      // Given
      const spy = aStrapiHttpClientService();
      const repository = new StrapiDemandeDeContactRepository(spy);
      // When
      const result = await repository.saveEntreprise(demandeDeContactEntreprise);
      // Then
      expect(result).toEqual(createSuccess(undefined));
    });

    describe('Quand la requête HTTP échoue', () => {
      it('Résout une Failure', async () => {
        // Given
        const spy = aStrapiHttpClientService();
        jest.spyOn(spy, 'post').mockRejectedValue(new Error('Erreur non gérée'));
        const repository = new StrapiDemandeDeContactRepository(spy);
        // When
        const result = await repository.saveEntreprise(demandeDeContactEntreprise);
        // Then
        expect(result).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
      });
    });
  });
  
});
