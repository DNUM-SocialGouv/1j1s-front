import { aRésultatsRechercheOffreEmploi } from '@tests/fixtures/domain/offreEmploi.fixture';

import { OffreEmploiService } from '~/client/services/offreEmploi.service';

export function anOffreEmploiService() {
  return {
    rechercherOffreEmploi: jest.fn().mockResolvedValue(aRésultatsRechercheOffreEmploi()),
  } as unknown as OffreEmploiService;
}
