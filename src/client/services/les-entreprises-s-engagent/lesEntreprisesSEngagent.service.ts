import { HttpClientService } from '~/client/services/httpClient.service';
import { FormulaireEngagement } from '~/pages/les-entreprises-s-engagent/inscription';
import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

export class LesEntreprisesSEngagentService {
  constructor(private httpClientService: HttpClientService) {}

  async envoyerFormulaireEngagement(formulaire: FormulaireEngagement): Promise<Either<void>> {
    try {
      await this.httpClientService.post('entreprises', formulaire);
      return createSuccess(undefined);
    } catch (e) {
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    }

  }
}
