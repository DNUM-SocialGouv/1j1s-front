import { createFailure, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

import { Entreprise } from '../domain/Entreprise';
import { RejoindreLaMobilisationRepository } from '../domain/RejoindreLaMobilisation.repository';

export class LesEntreprisesSEngagentUseCase {
  constructor(private rejoindreLaMobilisationRepository: RejoindreLaMobilisationRepository) {}

  async rejoindreLaMobilisation(entreprise: Entreprise): Promise<Either<void>> {
    try {
      return this.rejoindreLaMobilisationRepository.save(entreprise);
    } catch (e) {
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    }
  }
}
