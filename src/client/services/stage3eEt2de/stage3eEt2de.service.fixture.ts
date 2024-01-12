import { createSuccess } from '~/server/errors/either';
import { aResultatRechercheStage3eEt2de } from '~/server/stage-3e-et-2de/domain/stage3eEt2de.fixture';

import { Stage3eEt2deService } from './stage3eEt2de.service';

export function aStage3eEt2deService(override?: Partial<Stage3eEt2deService>): Stage3eEt2deService {
	return {
		rechercherStage3eEt2de: jest.fn().mockResolvedValue(createSuccess(aResultatRechercheStage3eEt2de())),
		...override,
	};
}
