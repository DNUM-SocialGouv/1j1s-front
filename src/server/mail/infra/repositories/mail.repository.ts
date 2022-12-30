import axios from 'axios';

import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import { Mail } from '~/server/mail/domain/mail';
import { replaceToAddress } from '~/server/mail/infra/repositories/mail.mapper';
import { HttpClientService } from '~/server/services/http/httpClientService';
import { LoggerService } from '~/server/services/logger.service';

const SOURCE = 'API Tipimail';

export class MailRepository {
  constructor(
    private httpClient: HttpClientService,
    private mailerServiceActive: boolean,
    private mailerServiceRedirectTo?: string,
  ) {}

  async send(mail: Mail): Promise<Either<void>> {
    try {
      if (this.mailerServiceActive) {
        const mailWithRedirection = replaceToAddress(mail, this.mailerServiceRedirectTo);
        await this.httpClient.post('messages/send', mailWithRedirection);
      } else {
        // eslint-disable-next-line no-console
        console.log('Mailer désactivé, email non envoyé', JSON.stringify(mail));
      }
      return createSuccess(undefined);
    } catch (e) {
      LoggerService.errorWithExtra(
        new SentryException(
          '[API Tipimail] impossible d‘envoyer un email',
          { context: 'Envoi mail', source: SOURCE },
          { errorDetail: e },
        ),
      );
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 400) {
          return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
        }
      }
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    }
  }
}
