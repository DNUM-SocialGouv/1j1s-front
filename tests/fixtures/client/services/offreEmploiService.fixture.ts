import { aRésultatsRechercheOffreEmploi } from '@tests/fixtures/domain/offreEmploi.fixture';

export const unOffreEmploiService = () => {
  return {
    rechercherOffreEmploi: jest.fn().mockResolvedValue(aRésultatsRechercheOffreEmploi()),
  };
};
