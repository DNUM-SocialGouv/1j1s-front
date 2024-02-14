import { createSuccess } from '~/server/errors/either';

import { LesEntreprisesSEngagentService } from './lesEntreprisesSEngagent.service';

export function aLesEntreprisesSEngagentService(): LesEntreprisesSEngagentService {
	return {
		envoyerFormulaireEngagement: jest.fn().mockResolvedValue(createSuccess(undefined)),
	} as unknown as LesEntreprisesSEngagentService;
}
