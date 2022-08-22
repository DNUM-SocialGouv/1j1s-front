import {
  LesEntreprisesSEngagentService,
} from '~/client/services/les-entreprises-s-engagent/lesEntreprisesSEngagent.service';
import { createSuccess } from '~/server/errors/either';

export function aLesEntreprisesSEngagementService(): LesEntreprisesSEngagentService {
  return {
    envoyerFormulaireEngagement: jest.fn().mockResolvedValue(createSuccess(undefined)),
  } as unknown as LesEntreprisesSEngagentService;
}
