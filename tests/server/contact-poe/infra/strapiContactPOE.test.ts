import { aStrapiHttpClientService } from '@tests/fixtures/services/strapiHttpClientService.fixture';

import { DemandeDeContactPOE } from '~/server/contact-poe/domain/DemandeDeContactPOE';
import { StrapiDemandeDeContactPOERepository } from '~/server/contact-poe/infra/strapiDemandeDeContactPOE.repository';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

describe('StrapiDemandeDeContactPOERepository', () => {
  describe('.savePOE()', () => {
    const demandeDeContactPOE: DemandeDeContactPOE = {
      codePostal: '75001',
      email: 'test@test.com',
      nom: 'TEST',
      nomSociété: 'Société de test',
      commentaire: 'Coucou un commentaire',
      nombreARecruter: '5',
      prénom: 'Test',
      secteur: 'agriculture',
      siret: '12345678901234',
      taille: 'small',
      travail: 'Assistance téléphonique',
      téléphone: '0123456789',
      ville: 'Paris',
    };

    it('fait un POST vers Strapi', async () => {
      // Given
      const spy = aStrapiHttpClientService();
      const repository = new StrapiDemandeDeContactPOERepository(spy);
      const expectedBody = {
        data: {
          code_postal: '75001',
          email: 'test@test.com',
          nom: 'TEST',
          nom_societe: 'Société de test',
          commentaire: 'Coucou un commentaire',
          nombre_a_recruter: '5',
          prenom: 'Test',
          secteur: 'agriculture',
          siret: '12345678901234',
          taille: 'small',
          telephone: '0123456789',
          travail: 'Assistance téléphonique',
          ville: 'Paris',
        },
      };
      // When
      await repository.savePOE(demandeDeContactPOE);
      // Then
      expect(spy.post).toHaveBeenCalledWith('contacts-poe', expectedBody);
    });

    it('résout un Success', async () => {
      // Given
      const spy = aStrapiHttpClientService();
      const repository = new StrapiDemandeDeContactPOERepository(spy);
      // When
      const result = await repository.savePOE(demandeDeContactPOE);
      // Then
      expect(result).toEqual(createSuccess(undefined));
    });

    describe('Quand la requête HTTP échoue', () => {
      it('Résout une Failure', async () => {
        // Given
        const spy = aStrapiHttpClientService();
        jest.spyOn(spy, 'post').mockRejectedValue(new Error('Erreur non gérée'));
        const repository = new StrapiDemandeDeContactPOERepository(spy);
        // When
        const result = await repository.savePOE(demandeDeContactPOE);
        // Then
        expect(result).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
      });
    });
  });
});
