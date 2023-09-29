import { createSuccess } from '~/server/errors/either';
import {
	aLocalisationList,
	aLocalisationListWithEmptyValue,
} from '~/server/localisations/domain/localisation.fixture';
import { aCommuneList } from '~/server/localisations/domain/localisationAvecCoordonnées.fixture';

import { LocalisationService } from './localisation.service';

export function aLocalisationServiceWithEmptyResultat(): LocalisationService {
	return aLocalisationService({
		rechercherCommune: jest.fn().mockResolvedValue(createSuccess({ résultats: [] })),
		rechercherLocalisation: jest.fn().mockResolvedValue(createSuccess(aLocalisationListWithEmptyValue())),
	});
}

export function aLocalisationService(override?: Partial<LocalisationService>): LocalisationService {
	return {
		isInvalidLocalisationQuery: jest.fn().mockReturnValue(false),
		rechercherCommune: jest.fn().mockResolvedValue(createSuccess({ résultats: aCommuneList() })),
		rechercherLocalisation: jest.fn().mockResolvedValue(createSuccess(aLocalisationList())),
		...override,
	};
}
