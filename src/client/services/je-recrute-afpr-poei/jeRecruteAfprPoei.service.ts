import {
  FormulairesPoleEmploi,
} from '~/client/components/features/JeDeviensMentor/RecrutementCandidatPôleEmploi/FormulairePOE/FormulairePOE';
import { HttpClientService } from '~/client/services/httpClient.service';
import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

export class JeRecruteAfprPoeiService {
  constructor(private httpClientService: HttpClientService) {
  }

  async envoyerFormulairePoleEmploi(formulaire: FormulairesPoleEmploi): Promise<Either<void>> {
    try {
      await this.httpClientService.post('recrutement-poe', formulaire);
      return createSuccess(undefined);
    } catch (e) {
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    }

  }
}
