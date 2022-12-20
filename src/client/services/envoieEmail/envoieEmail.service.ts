import { HttpClientService } from '~/client/services/httpClient.service';
import { EnvoieEmail } from '~/server/envoie-email/domain/EnvoieEmail';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

export class EnvoieEmailService {
  constructor(private httpClientService: HttpClientService) {}

  async envoyer(envoieMail: EnvoieEmail) {
    try {
      await this.httpClientService.post('/messages/send', envoieMail);
      return createSuccess(undefined);
    } catch (e) {
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    }
  }
}
