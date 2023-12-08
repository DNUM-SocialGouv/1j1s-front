import { createSuccess } from '~/server/errors/either';
import { aListeDeMetierStage3eme } from '~/server/stage-3eme/domain/metierStage3eme.fixture';
import { aResultatRechercheStage3eme } from '~/server/stage-3eme/domain/stage3eme.fixture';

import { Stage3emeService } from './stage3eme.service';

export function aStage3emeService(override?: Partial<Stage3emeService>): Stage3emeService {
	return {
		rechercherAppellationMetier: jest.fn().mockResolvedValue(createSuccess(aListeDeMetierStage3eme())),
		rechercherStage3eme: jest.fn().mockResolvedValue(createSuccess(aResultatRechercheStage3eme())),
		...override,
	};
}
