import { DemandeDeContactAccompagnement } from '~/server/demande-de-contact/domain/demandeDeContact';
import { Either } from '~/server/errors/either';

export interface DemandeDeContactAccompagnementRepository {
  send(demandeDeContactAccompagnement: DemandeDeContactAccompagnement): Promise<Either<void>>
}
