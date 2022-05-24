import { aMétierRecherchéList } from '@tests/fixtures/domain/alternance.fixture';

import { MétierRecherchéService } from '~/client/services/alternances/métierRecherché.service';

export function aMétierRecherchéService(): MétierRecherchéService {
  return {
    rechercherMétier: jest.fn().mockResolvedValue(aMétierRecherchéList()),
  } as unknown as MétierRecherchéService;
}
