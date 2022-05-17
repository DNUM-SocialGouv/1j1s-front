import { aLocalisationList, aLocalisationListWithEmptyValue } from '@tests/fixtures/domain/localisation.fixture';

import { LocalisationService } from '~/client/services/localisation.service';

export function aLocalisationService(): LocalisationService {
  return {
    rechercheLocalisation: jest.fn().mockResolvedValue(aLocalisationList()),
    récupérerLocalisationAvecCodeInsee: jest.fn().mockResolvedValue(aLocalisationList()),
  } as unknown as LocalisationService;
}

export function aLocalisationServiceWithEmptyRésultat(): LocalisationService {
  return {
    rechercheLocalisation: jest.fn().mockResolvedValue(aLocalisationListWithEmptyValue()),
    récupérerLocalisationAvecCodeInsee: jest.fn().mockResolvedValue(aLocalisationListWithEmptyValue()),
  } as unknown as LocalisationService;
}

