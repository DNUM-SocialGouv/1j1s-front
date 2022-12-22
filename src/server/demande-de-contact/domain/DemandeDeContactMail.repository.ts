import { Either } from '../../errors/either';
import { DemandeDeContactAccompagnement } from './DemandeDeContact';

export interface DemandeDeContactMailRepository {
  envoyer(demandeDeContactAccompagnement: DemandeDeContactAccompagnement): Promise<Either<void>>
}
