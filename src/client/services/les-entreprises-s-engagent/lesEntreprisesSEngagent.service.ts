import { HttpClientService } from '~/client/services/httpClient.service';
import { FormulaireEngagement } from '~/pages/les-entreprises-s-engagent/inscription';
import { createSuccess, Either } from '~/server/errors/either';

export class LesEntreprisesSEngagentService {
  constructor(private httpClientService: HttpClientService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async envoyerFormulaireEngagement(formulaire: FormulaireEngagement): Promise<Either<void>> {
    return createSuccess(undefined);
  }
}
