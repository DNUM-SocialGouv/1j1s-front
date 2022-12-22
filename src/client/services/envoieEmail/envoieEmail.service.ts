import { HttpClientService } from '~/client/services/httpClient.service';
import { DemandeDeContactTipimail } from '~/server/envoie-email/domain/DemandeDeContactTipimail';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

export class EnvoieEmailService {
  constructor(private httpClientService: HttpClientService) {}

  async envoyer(envoieMail: DemandeDeContactTipimail) {
    try {
      const { data } = await this.httpClientService.post('/messages/send', envoieMail);
      return createSuccess(data);
    } catch (e) {
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    }
  }
}
