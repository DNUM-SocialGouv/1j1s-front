import {
  aPoleEmploiHttpClient,
  aRechercheJobÉtudiantResponse,
} from '@tests/fixtures/services/poleEmploiHttpClientService.fixture';

import { ApiPoleEmploiJobÉtudiantRepository } from '~/server/jobsÉtudiant/infra/repositories/apiPoleEmploiJobÉtudiant.repository';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';

describe('ApiPoleEmploiJobÉtudiantRepository', () => {
  describe('getJobÉtudiantList', () => {
    let poleEmploiHttpClientService: PoleEmploiHttpClientService;

    beforeEach(() => {
      poleEmploiHttpClientService = aPoleEmploiHttpClient();
    });

    it('retourne la liste des jobs etudiants de pole emploi', async () => {
      const apiPoleEmploiJobÉtudiantRepository = new ApiPoleEmploiJobÉtudiantRepository(poleEmploiHttpClientService);

      jest.spyOn(poleEmploiHttpClientService, 'get').mockResolvedValue(aRechercheJobÉtudiantResponse());

      const result = await apiPoleEmploiJobÉtudiantRepository.getJobÉtudiantList();

      expect([
        { id: '130WZJJ', intitule: 'Hote/Hotesse de Caisse (H/F)' },
        { id: '130WZJD', intitule: 'ou Accompagnant(e) éducatif(ve) et social(e) (H/F)' },
        { id: '130WZHH', intitule: 'Auxiliaire de vie            (H/F)' },
      ]).toEqual(result);
    });
  });
});
