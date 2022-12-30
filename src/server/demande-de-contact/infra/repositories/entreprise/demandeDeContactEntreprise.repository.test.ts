import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapiCms.repository.fixture';
import { DemandeDeContactEntreprise } from '~/server/demande-de-contact/domain/demandeDeContact';
import {
  DemandeDeContactEntrepriseRepository,
} from '~/server/demande-de-contact/infra/repositories/entreprise/demandeDeContactEntreprise.repository';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

describe('DemandeDeContactEntrepriseRepository', () => {
  describe('envoyer', () => {
    const demandeDeContactEntreprise: DemandeDeContactEntreprise = {
      email: 'test@test.com',
      message: 'rrr',
      nom: 'Test',
      prénom: 'TEST',
      sujet: 'super sujet',
      téléphone: '0123456789',
    };

    it('envoie la demande au CMS', async () => {
      // Given
      const strapiCmsRepository = aStrapiCmsRepository();
      const repository = new DemandeDeContactEntrepriseRepository(strapiCmsRepository);
      const expectedBody = {
        email: 'test@test.com',
        message: 'rrr',
        nom: 'Test',
        prenom: 'TEST',
        sujet: 'super sujet',
        telephone: '0123456789',
      };
      // When
      const result = await repository.envoyer(demandeDeContactEntreprise);
      // Then
      expect(result).toEqual(createSuccess(undefined));
      expect(strapiCmsRepository.save).toHaveBeenCalledWith('contact-entreprises', expectedBody);
    });

    describe('Quand la requête HTTP échoue', () => {
      it('Résout une Failure', async () => {
        // Given
        const strapiCmsRepository = aStrapiCmsRepository();
        const repository = new DemandeDeContactEntrepriseRepository(strapiCmsRepository);
        jest.spyOn(strapiCmsRepository, 'save').mockResolvedValue(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
        // When
        const result = await repository.envoyer(demandeDeContactEntreprise);
        // Then
        expect(result).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
      });
    });
  });
});
