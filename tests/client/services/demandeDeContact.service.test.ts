import { aHttpClientService } from '@tests/fixtures/client/services/httpClientService.fixture';

import { DemandeDeContactService } from '~/client/services/demandeDeContact.service';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

describe('DemandeDeContactService', () => {
  describe('.envoyerPourLeCEJ()', () => {
    it('appelle l\'API avec les paramètres du formulaire de contact et retourne un success', async () => {
      // Given
      const httpClientService = aHttpClientService();
      const demandeContactService = new DemandeDeContactService(httpClientService);
      const body = {
        age: 18,
        email: 'toto@msn.fr',
        nom: 'Mc Totface',
        prénom: 'Toto',
        téléphone: '0678954322',
        ville: 'Cergy',
      };

      // When
      const result = await demandeContactService.envoyerPourLeCEJ(body);

      // Then
      expect(result).toEqual(createSuccess(undefined));
      expect(httpClientService.post).toHaveBeenCalledWith('demandes-de-contact', { ...body, type: 'CEJ' });
    });
    it('appelle API avec les paramètres du formulaire de contact et retourne une Failure', async () => {
      // Given
      const httpClientService = aHttpClientService();
      const demandeContactService = new DemandeDeContactService(httpClientService);
      const body = {
        age: 18,
        email: 'toto@msn.fr',
        nom: 'Mc Totface',
        prénom: 'Toto',
        téléphone: '0678954',
        ville: 'Cergy',
      };

      jest.spyOn(httpClientService,'post').mockRejectedValue(new Error('Erreur Failure'));

      // When
      const result = await demandeContactService.envoyerPourLeCEJ(body);

      // Then
      expect(result).toEqual(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
      expect(httpClientService.post).toHaveBeenCalledWith('demandes-de-contact', { ...body, type: 'CEJ' });
    });
  });

  describe('.envoyerPourLesEntreprisesSEngagent()', () => {
    it('appelle l\'API avec les paramètres du formulaire de contact et retourne un success', async () => {
      // Given
      const httpClientService = aHttpClientService();
      const demandeContactService = new DemandeDeContactService(httpClientService);
      const body = {
        email: 'toto@msn.fr',
        message: 'rrr',
        nom: 'Mc Totface',
        prénom: 'Toto',
        sujet: 'super sujet',
        téléphone: '0678954322',
      };

      // When
      const result = await demandeContactService.envoyerPourLesEntreprisesSEngagent(body);

      // Then
      expect(result).toEqual(createSuccess(undefined));
      expect(httpClientService.post).toHaveBeenCalledWith('demandes-de-contact', { ...body, type: 'LesEntreprisesSEngagent' });
    });
    it('appelle API avec les paramètres du formulaire de contact et retourne une Failure', async () => {
      // Given
      const httpClientService = aHttpClientService();
      const demandeContactService = new DemandeDeContactService(httpClientService);
      const body = {
        email: 'toto@msn.fr',
        message: 'rrr',
        nom: 'Mc Totface',
        prénom: 'Toto',
        sujet: 'super sujet',
        téléphone: '0678954322',
      };

      jest.spyOn(httpClientService,'post').mockRejectedValue(new Error('Erreur Failure'));

      // When
      const result = await demandeContactService.envoyerPourLesEntreprisesSEngagent(body);

      // Then
      expect(result).toEqual(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
      expect(httpClientService.post).toHaveBeenCalledWith('demandes-de-contact', { ...body, type: 'LesEntreprisesSEngagent' });
    });
  });
});
