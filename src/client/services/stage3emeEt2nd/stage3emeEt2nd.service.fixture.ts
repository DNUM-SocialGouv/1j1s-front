import { createSuccess } from '~/server/errors/either';
import { aResultatRechercheStage3emeEt2nd } from '~/server/stage-3eme-et-2nd/domain/stage3emeEt2nd.fixture';

import { Stage3emeEt2ndService } from './stage3emeEt2nd.service';

export function aStage3emeEt2ndService(override?: Partial<Stage3emeEt2ndService>): Stage3emeEt2ndService {
	return {
		rechercherStage3emeEt2nd: jest.fn().mockResolvedValue(createSuccess(aResultatRechercheStage3emeEt2nd())),
		...override,
	};
}
