import { ContactPOE } from '~/server/contact-poe/domain/ContactPOE';
import { Either } from '~/server/errors/either';

export interface FormerPoleEmploiRepository {
  save(contactpoe: ContactPOE, annotation?: string): Promise<Either<void>>;
}
