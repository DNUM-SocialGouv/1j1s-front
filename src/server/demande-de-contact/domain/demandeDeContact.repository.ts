import { Either } from '~/server/errors/either';

import {
	DemandeDeContact,
} from './demandeDeContact';

export interface DemandeDeContactRepository {
  envoyer(demandeDeContact: DemandeDeContact): Promise<Either<void>>;
}
