import {
	ÉtablissementAccompagnementService,
} from '~/client/services/établissementAccompagnement/établissementAccompagnement.service';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import {
	aMissionLocaleÉtablissementAccompagnementList,
	anÉtablissementAccompagnementList,
} from '~/server/etablissement-accompagnement/domain/etablissementAccompagnement.fixture';

export function anÉtablissementAccompagnementService(): ÉtablissementAccompagnementService {
	return {
		envoyerDemandeContact: jest.fn().mockResolvedValue(createSuccess(undefined)),
		rechercher: jest.fn().mockResolvedValue(createSuccess(anÉtablissementAccompagnementList())),
	} as unknown as ÉtablissementAccompagnementService;
}

export function anÉtablissementMissionLocaleService(): ÉtablissementAccompagnementService {
	return {
		envoyerDemandeContact: jest.fn().mockResolvedValue(createFailure(ErreurMetier.DEMANDE_INCORRECTE)),
		rechercher: jest.fn().mockResolvedValue(createSuccess(aMissionLocaleÉtablissementAccompagnementList())),
	} as unknown as ÉtablissementAccompagnementService;
}
