import {
  ÉtablissementAccompagnementService,
} from '~/client/services/établissementAccompagnement/établissementAccompagnement.service';
import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { aDemandeDeContactAccompagnement } from '~/server/demande-de-contact/domain/demandeDeContact.fixture';
import { createSuccess } from '~/server/errors/either';
import {
  anOrderedÉtablissementAccompagnementList,
} from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement.fixture';

describe('établissementAccompagnementService', () => {
  describe('rechercher', () => {
    it('retourne la liste des établissement d‘accompagnement', async () => {
      const httpClient = anHttpClientService();
      jest.spyOn(httpClient, 'get').mockResolvedValue(createSuccess(anOrderedÉtablissementAccompagnementList()));
      const établissementAccompagnementService = new ÉtablissementAccompagnementService(httpClient);
      const accompagnementQueryParams = {
        codeCommune: '41600',
        libelleCommune: 'Lamotte-Beuvron',
        typeAccompagnement: 'cij',
      };  

      const actual = await établissementAccompagnementService.rechercher(accompagnementQueryParams);

      expect(httpClient.get).toHaveBeenCalledWith('etablissements-accompagnement?codeCommune=41600&libelleCommune=Lamotte-Beuvron&typeAccompagnement=cij');
      expect(actual).toEqual(createSuccess(anOrderedÉtablissementAccompagnementList()));
    });
  });

  describe('envoyerDemandeContact', () => {
    it('envoie la demande de contact', async () => {
      const httpClient = anHttpClientService();
      jest.spyOn(httpClient, 'post').mockResolvedValue(createSuccess(undefined));
      const établissementAccompagnementService = new ÉtablissementAccompagnementService(httpClient);
      const demandeDeContact = aDemandeDeContactAccompagnement();

      const actual = await établissementAccompagnementService.envoyerDemandeContact(demandeDeContact);

      expect(httpClient.post).toHaveBeenCalledWith('etablissements-accompagnement/contact', demandeDeContact);
      expect(actual).toEqual(createSuccess(undefined));
    });
  });
});
