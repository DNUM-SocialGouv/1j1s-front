import { Either } from '~/server//errors/either';
import { DemandeDeContactAccompagnement } from '~/server/demande-de-contact/domain/demandeDeContact';
import { DemandeDeContactRepository } from '~/server/demande-de-contact/domain/demandeDeContact.repository';

export class EnvoyerDemandeDeContactAccompagnementUseCase {
  constructor(private demandeDeContactRepository: DemandeDeContactRepository) {}

  async handle(demandeDeContactAccompagnement: DemandeDeContactAccompagnement): Promise<Either<void>> {
    return this.demandeDeContactRepository.envoyer(demandeDeContactAccompagnement);
  }
}
