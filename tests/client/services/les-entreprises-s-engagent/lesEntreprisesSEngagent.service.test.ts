import { aHttpClientService } from '@tests/fixtures/client/services/httpClientService.fixture';
import { anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';

import {
  LesEntreprisesSEngagentService,
} from '~/client/services/les-entreprises-s-engagent/lesEntreprisesSEngagent.service';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

describe('LesEntreprisesSEngagentService', () => {
  describe('l’envoie du formulaire c’est bien passé', () => {
    it('revoie un Success', async () => {
      const httpClientService = aHttpClientService();
      jest.spyOn(httpClientService, 'post').mockResolvedValue(anAxiosResponse(undefined));
      const lesEntreprisesSEngagentServiceService = new LesEntreprisesSEngagentService(httpClientService);

      const result = await lesEntreprisesSEngagentServiceService.envoyerFormulaireEngagement({
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
        ville: 'Maison-Alfort',
      });

      expect(httpClientService.post).toHaveBeenCalledWith('entreprises', {
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
        ville: 'Maison-Alfort',
      });
      expect(result).toEqual(createSuccess(undefined));
    });
  });

  describe('l’envoie du formulaire tombe en erreur', () => {
    it('revoie une Failure', async () => {
      const httpClientService = aHttpClientService();
      jest.spyOn(httpClientService, 'post').mockRejectedValue(new Error('Error'));
      const lesEntreprisesSEngagentServiceService = new LesEntreprisesSEngagentService(httpClientService);

      const result = await lesEntreprisesSEngagentServiceService.envoyerFormulaireEngagement({
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
        ville: 'Maison-Lafitte',
      });
      expect(result).toEqual(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
    });
  });
});
