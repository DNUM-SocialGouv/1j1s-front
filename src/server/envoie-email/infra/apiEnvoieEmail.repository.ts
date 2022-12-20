import axios from 'axios';

import { createFailure, createSuccess, Either } from '../../errors/either';
import { ErreurMétier } from '../../errors/erreurMétier.types';
import { HttpClientService } from '../../services/http/httpClientService';
import { LoggerService } from '../../services/logger.service';
import { EnvoieEmail } from '../domain/EnvoieEmail';
import { mapEnvoieEmail } from './apiEnvoieEmail.mapper';

export class ApiEnvoieEmailRepository{
  constructor(private httpClient: HttpClientService) {}

  async send(envoieEmail: EnvoieEmail): Promise<Either<EnvoieEmail[]>> {
    try {
      const { data } = await this.httpClient.post('/messages/send', mapEnvoieEmail(envoieEmail));
      return createSuccess(data);
    } catch (e) {
      LoggerService.error('[API Tipimail] Erreur lors de l’envoie de mail');
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 404) {
          return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
        }
      }
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    }
  }
}
