import { DemandeDeContactTipimail } from '../../envoie-email/domain/DemandeDeContactTipimail';
import { Either } from '../../errors/either';
import { DemandeDeContactAccompagnement } from './DemandeDeContact';

export interface DemandeDeContactMailRepository {
  envoyer(demandeDeContactAccompagnement: DemandeDeContactAccompagnement): Promise<Either<void>>
  send(envoieEmail: DemandeDeContactTipimail): Promise<Either<DemandeDeContactTipimail[]>>
}
