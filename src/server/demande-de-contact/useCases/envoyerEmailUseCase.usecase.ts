import { DemandeDeContactTipimail } from '../../envoie-email/domain/DemandeDeContactTipimail';
import { Either } from '../../errors/either';
import { DemandeDeContactMailRepository } from '../domain/DemandeDeContactMail.repository';

export class EnvoyerEmailUseCaseUsecase {
  constructor(private demandeDeContactEmailRepository: DemandeDeContactMailRepository) {}

  async handle(envoieEmail: DemandeDeContactTipimail): Promise<Either<DemandeDeContactTipimail[]>> {
    return this.demandeDeContactEmailRepository.send(envoieEmail);
  }
}
