import { Either } from '~/server//errors/either';
import { DemandeDeContactAccompagnement } from '~/server/demande-de-contact/domain/demandeDeContact';
import { DemandeDeContactAccompagnementRepository } from '~/server/demande-de-contact/domain/demandeDeContactAccompagnement.repository';

export class EnvoyerDemandeDeContactAccompagnementUseCase {
  constructor(private demandeDeContactMailRepository: DemandeDeContactAccompagnementRepository) {}

  async handle(demandeDeContactAccompagnement: DemandeDeContactAccompagnement): Promise<Either<void>> {
    return this.demandeDeContactMailRepository.send(demandeDeContactAccompagnement);
  }
}
