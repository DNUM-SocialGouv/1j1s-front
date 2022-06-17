import { aRésultatsRechercheAlternance } from '@tests/fixtures/domain/alternance.fixture';

import { AlternanceService } from '~/client/services/alternances/alternance.service';
import { ErrorType } from '~/server/errors/error.types';

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

export function anAlternanceServiceWithErrorInattendue(): AlternanceService {
  return {
    rechercherAlternance: jest.fn().mockResolvedValue({ errorType: ErrorType.ERREUR_INATTENDUE, instance: 'failure' }),
  } as unknown as AlternanceService;
}

export function anAlternanceServiceWithErrorServiceIndisponible(): AlternanceService {
  return {
    rechercherAlternance: jest.fn().mockResolvedValue({ errorType: ErrorType.SERVICE_INDISPONIBLE, instance: 'failure' }),
  } as unknown as AlternanceService;
}

export function anAlternanceServiceWithErrorDemandeIncorrecte(): AlternanceService {
  return {
    rechercherAlternance: jest.fn().mockResolvedValue({ errorType: ErrorType.DEMANDE_INCORRECTE, instance: 'failure' }),
  } as unknown as AlternanceService;
}
