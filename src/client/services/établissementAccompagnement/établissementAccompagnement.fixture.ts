import {
	ÉtablissementAccompagnementService,
} from '~/client/services/établissementAccompagnement/établissementAccompagnement.service';
import { createSuccess } from '~/server/errors/either';
import {
	anEtablissementAccompagnementList,
} from '~/server/etablissement-accompagnement/domain/etablissementAccompagnement.fixture';

export function anEtablissementAccompagnementService(): ÉtablissementAccompagnementService {
	return {
		envoyerDemandeContact: jest.fn().mockResolvedValue(createSuccess(undefined)),
		rechercher: jest.fn().mockResolvedValue(createSuccess(anEtablissementAccompagnementList())),
	} as unknown as ÉtablissementAccompagnementService;
}
