import { FormulaireEngagement } from '~/client/components/features/LesEntreprisesSEngagent/Rejoignez/Inscription/Inscription';
import { HttpClientService } from '~/client/services/httpClient.service';
import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

export class LesEntreprisesSEngagentService {
  constructor(private httpClientService: HttpClientService) {
  }

  async envoyerFormulaireEngagement(formulaire: FormulaireEngagement): Promise<Either<void>> {
    try {
      await this.httpClientService.post('entreprises', formulaire);
      return createSuccess(undefined);
    } catch (e) {
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    }

  }
}
