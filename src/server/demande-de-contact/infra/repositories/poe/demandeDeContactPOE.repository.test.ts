import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapiCms.repository.fixture';
import { DemandeDeContactPOE } from '~/server/demande-de-contact/domain/demandeDeContact';
import {
  DemandeDeContactPOERepository,
} from '~/server/demande-de-contact/infra/repositories/poe/demandeDeContactPOE.repository';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

describe('DemandeDeContactPOERepository', () => {
  describe('envoyer', () => {
    const demandeDeContactPOE: DemandeDeContactPOE = {
      codePostal: '75001',
      commentaire: 'Coucou un commentaire',
      email: 'test@test.com',
      nom: 'TEST',
      nomSociété: 'Société de test',
      nombreARecruter: '5',
      prénom: 'Test',
      secteur: 'agriculture',
      siret: '12345678901234',
      taille: 'small',
      travail: 'Assistance téléphonique',
      téléphone: '0123456789',
      ville: 'Paris',
    };

    it('envoie la demande au CMS', async () => {
      // Given
      const strapiCmsRepository = aStrapiCmsRepository();
      const repository = new DemandeDeContactPOERepository(strapiCmsRepository);
      const expectedBody = {
        code_postal: '75001',
        commentaire: 'Coucou un commentaire',
        email: 'test@test.com',
        nom: 'TEST',
        nom_societe: 'Société de test',
        nombreARecruter: '5',
        prenom: 'Test',
        secteur: 'agriculture',
        siret: '12345678901234',
        taille: 'small',
        telephone: '0123456789',
        travail: 'Assistance téléphonique',
        ville: 'Paris',
      };
      // When
      const result = await repository.envoyer(demandeDeContactPOE);
      // Then
      expect(result).toEqual(createSuccess(undefined));
      expect(strapiCmsRepository.save).toHaveBeenCalledWith('contacts-poe', expectedBody);
    });

    describe('Quand la requête HTTP échoue', () => {
      it('Résout une Failure', async () => {
        // Given
        const strapiCmsRepository = aStrapiCmsRepository();
        const repository = new DemandeDeContactPOERepository(strapiCmsRepository);
        jest.spyOn(strapiCmsRepository, 'save').mockResolvedValue(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
        // When
        const result = await repository.envoyer(demandeDeContactPOE);
        // Then
        expect(result).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
      });
    });
  });
});
