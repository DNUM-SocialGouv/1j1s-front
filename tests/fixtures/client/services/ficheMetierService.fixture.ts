import { aFicheMetierResult, aFicheMetierResultWithPagination } from '@tests/fixtures/domain/ficheMetier.fixture';

import { FicheMetierService } from '~/client/services/ficheMetier/ficheMetier.service';

export function aFicheMetierService(): FicheMetierService {
  return {
    rechercherFichesMétier: jest.fn().mockResolvedValue({ instance: 'success', result: aFicheMetierResult() }),
  } as unknown as FicheMetierService;
}

export function aFicheMetierServiceWithPagination(): FicheMetierService {
  return {
    rechercherFichesMétier: jest.fn().mockResolvedValue({ instance: 'success', result: aFicheMetierResultWithPagination() }),
  } as unknown as FicheMetierService;
}
