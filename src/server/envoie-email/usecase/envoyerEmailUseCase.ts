import { Either } from '~/server/errors/either';

import { EnvoieEmail } from '../domain/EnvoieEmail';
import { ApiEnvoieEmailRepository } from '../infra/apiEnvoieEmail.repository';

export class EnvoyerEmailUseCase {
  constructor(private apiEnvoieEmailRepository: ApiEnvoieEmailRepository) {}

  async handle(envoieEmail: EnvoieEmail): Promise<Either<EnvoieEmail[]>> {
    return this.apiEnvoieEmailRepository.send(envoieEmail);
  }
}
