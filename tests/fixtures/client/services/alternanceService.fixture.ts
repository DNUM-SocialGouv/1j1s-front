import {
  anApprentiBoucherOffreFromPoleEmploi,
  aRésultatsRechercheAlternance,
} from '@tests/fixtures/domain/alternance.fixture';

import { AlternanceService } from '~/client/services/alternances/alternance.service';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

export function anAlternanceService(): AlternanceService {
  return {
    rechercherAlternance: jest.fn().mockResolvedValue({ instance: 'success', result: aRésultatsRechercheAlternance() }),
  } as unknown as AlternanceService;
}

export function anEmptyAlternanceService(): AlternanceService {
  return {
    rechercherAlternance: jest.fn().mockResolvedValue({ instance: 'success', result: aRésultatsRechercheAlternance({ nombreRésultats: 0, résultats: [] }) }),
  } as unknown as AlternanceService;
}
export function aSingleResultAlternanceService(): AlternanceService {
  return {
    rechercherAlternance: jest.fn().mockResolvedValue({ instance: 'success', result: aRésultatsRechercheAlternance({ nombreRésultats: 1, résultats: [anApprentiBoucherOffreFromPoleEmploi()] }) }),
  } as unknown as AlternanceService;
}

export function anAlternanceServiceWithErrorServiceIndisponible(): AlternanceService {
  return {
    rechercherAlternance: jest.fn().mockResolvedValue({ errorType: ErreurMétier.SERVICE_INDISPONIBLE, instance: 'failure' }),
  } as unknown as AlternanceService;
}

export function anAlternanceServiceWithErrorDemandeIncorrecte(): AlternanceService {
  return {
    rechercherAlternance: jest.fn().mockResolvedValue({ errorType: ErreurMétier.DEMANDE_INCORRECTE, instance: 'failure' }),
  } as unknown as AlternanceService;
}
