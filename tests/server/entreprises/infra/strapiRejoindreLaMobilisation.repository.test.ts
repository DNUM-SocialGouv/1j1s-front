import { aStrapiHttpClientService } from '@tests/fixtures/services/strapiHttpClientService.fixture';

import { Entreprise } from '~/server/entreprises/domain/Entreprise';
import {
  StrapiRejoindreLaMobilisationRepository,
} from '~/server/entreprises/infra/strapiRejoindreLaMobilisation.repository';
import { createFailure,createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

describe('StrapiRejoindreLaMobilisationRepository', () => {
  const entreprise: Entreprise = {
    codePostal: '75002',
    email: 'email@octo.com',
    nom: 'Toto',
    nomSociété: 'Octo',
    prénom: 'Tata',
    secteur: 'Dev',
    siret: '123456789123',
    taille: '~ 1000',
    travail: 'Dev',
    téléphone: '0611223344',
  };
  
  describe('.save()', () => {
    it('fait un POST vers Strapi', async () => {
      // Given
      const spy = aStrapiHttpClientService();
      const repository = new StrapiRejoindreLaMobilisationRepository(spy);
      const expectedBody = {
        data: {
          code_postal: '75002',
          email: 'email@octo.com',
          nom: 'Toto',
          nom_societe: 'Octo',
          prenom: 'Tata',
          secteur: 'Dev',
          siret: '123456789123',
          taille: '~ 1000',
          telephone: '0611223344',
          travail: 'Dev',
        },
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
