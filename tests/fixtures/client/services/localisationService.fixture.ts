import {
  aDépartement,
  aLocalisationList,
  aLocalisationListWithEmptyValue,
} from '@tests/fixtures/domain/localisation.fixture';
import { aCommuneList } from '@tests/fixtures/domain/localisationAvecCoordonnées.fixture';

import { LocalisationService } from '~/client/services/localisation.service';

export function aLocalisationService(retourRechercheLocalisation = aLocalisationList()): LocalisationService {
  return {
    rechercherCommune: jest.fn().mockResolvedValue({ instance: 'success', result: { résultats: aCommuneList() } }),
    rechercherLocalisation: jest.fn().mockResolvedValue(retourRechercheLocalisation),
    récupérerLocalisationAvecCodeInsee: jest.fn().mockResolvedValue(aDépartement()),
  } as unknown as LocalisationService;
}

export function aLocalisationServiceWithEmptyRésultat(): LocalisationService {
  return {
    rechercherCommune: jest.fn().mockResolvedValue( { instance: 'success', result: [] }),
    rechercherLocalisation: jest.fn().mockResolvedValue(aLocalisationListWithEmptyValue()),
    récupérerLocalisationAvecCodeInsee: jest.fn().mockResolvedValue(aLocalisationListWithEmptyValue()),
  } as unknown as LocalisationService;
}

