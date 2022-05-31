import { aRésultatsRechercheAlternance } from '@tests/fixtures/domain/alternance.fixture';

import { AlternanceService } from '~/client/services/alternances/alternance.service';

export function anAlternanceService(): AlternanceService {
  return {
    rechercherAlternance: jest.fn().mockResolvedValue(aRésultatsRechercheAlternance()),
  } as unknown as AlternanceService;
}
