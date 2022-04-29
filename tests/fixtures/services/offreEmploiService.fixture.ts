import { aRésultatsRechercheOffreEmploi } from '@tests/fixtures/domain/offreEmploi.fixture';
import { anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';

export const unOffreEmploiService = () => {
  return {
    rechercherOffreEmploi: jest.fn().mockResolvedValue(anAxiosResponse(aRésultatsRechercheOffreEmploi())),
  };
};
