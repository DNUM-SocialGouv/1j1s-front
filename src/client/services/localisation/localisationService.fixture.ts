import { createSuccess } from '~/server/errors/either';
import {
	aLocalisationList,
	aLocalisationListWithEmptyValue,
} from '~/server/localisations/domain/localisation.fixture';
import { aCommuneList } from '~/server/localisations/domain/localisationAvecCoordonnées.fixture';

import { LocalisationService } from './localisation.service';

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

