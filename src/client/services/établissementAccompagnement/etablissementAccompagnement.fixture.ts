import {
	EtablissementAccompagnementService,
} from '~/client/services/établissementAccompagnement/etablissementAccompagnement.service';
import { createSuccess } from '~/server/errors/either';
import {
	anEtablissementAccompagnementList,
} from '~/server/etablissement-accompagnement/domain/etablissementAccompagnement.fixture';

export function anEtablissementAccompagnementService(): EtablissementAccompagnementService {
	return {
		envoyerDemandeContact: jest.fn().mockResolvedValue(createSuccess(undefined)),
		rechercher: jest.fn().mockResolvedValue(createSuccess(anEtablissementAccompagnementList())),
	};
}
