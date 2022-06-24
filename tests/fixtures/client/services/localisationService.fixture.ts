import {
  aDépartement,
  aLocalisationList,
  aLocalisationListWithEmptyValue,
} from '@tests/fixtures/domain/localisation.fixture';

import { LocalisationService } from '~/client/services/localisation.service';

export function aLocalisationService(retourRechercheLocalisation = aLocalisationList()): LocalisationService {
  return {
    rechercherLocalisation: jest.fn().mockResolvedValue(retourRechercheLocalisation),
    récupérerLocalisationAvecCodeInsee: jest.fn().mockResolvedValue(aDépartement()),
  } as unknown as LocalisationService;
}

export function aLocalisationServiceWithEmptyRésultat(): LocalisationService {
  return {
    rechercherLocalisation: jest.fn().mockResolvedValue(aLocalisationListWithEmptyValue()),
    récupérerLocalisationAvecCodeInsee: jest.fn().mockResolvedValue(aLocalisationListWithEmptyValue()),
  } as unknown as LocalisationService;
}

