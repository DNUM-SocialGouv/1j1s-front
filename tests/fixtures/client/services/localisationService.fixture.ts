import {
  aLocalisationList,
  aLocalisationListWithEmptyValue,
} from '@tests/fixtures/domain/localisation.fixture';
import { aCommuneList } from '@tests/fixtures/domain/localisationAvecCoordonnées.fixture';

import { LocalisationService } from '~/client/services/localisation.service';
import { createSuccess } from '~/server/errors/either';

export function aLocalisationService(retourRechercheLocalisation = aLocalisationList()): LocalisationService {
  return {
    rechercherCommune: jest.fn().mockResolvedValue(createSuccess({ résultats: aCommuneList() })),
    rechercherLocalisation: jest.fn().mockResolvedValue(createSuccess(retourRechercheLocalisation)),
  } as unknown as LocalisationService;
}

export function aLocalisationServiceWithEmptyRésultat(): LocalisationService {
  return {
    rechercherCommune: jest.fn().mockResolvedValue( createSuccess([])),
    rechercherLocalisation: jest.fn().mockResolvedValue(createSuccess(aLocalisationListWithEmptyValue())),
  } as unknown as LocalisationService;
}

