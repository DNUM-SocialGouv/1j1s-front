import { createFailure, Either } from '../../errors/either';
import { ErreurMétier } from '../../errors/erreurMétier.types';
import { DemandeDeContactAccompagnement } from '../domain/DemandeDeContact';
import { DemandeDeContactMailRepository } from '../domain/DemandeDeContactMail.repository';

export class EnvoyerDemandeDeContactAccompagnementUsecase {
  constructor(private demandeDeContactMailRepository: DemandeDeContactMailRepository) {}

  async handle(demandeDeContact: DemandeDeContactAccompagnement): Promise<Either<void>> {
    try {
      return this.demandeDeContactMailRepository.envoyer(demandeDeContact);
    } catch (e) {
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    }
  }
}
