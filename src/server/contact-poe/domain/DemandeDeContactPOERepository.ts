import { DemandeDeContactPOE } from '~/server/contact-poe/domain/DemandeDeContactPOE';
import { Either } from '~/server/errors/either';

export interface DemandeDeContactPOERepository {
  savePOE(contactPOE: DemandeDeContactPOE, annotation?: string): Promise<Either<void>>;
}
