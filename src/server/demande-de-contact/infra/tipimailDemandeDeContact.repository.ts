import axios from 'axios';

import { DemandeDeContactAccompagnement } from '~/server/demande-de-contact/domain/demandeDeContact';
import { DemandeDeContactAccompagnementRepository } from '~/server/demande-de-contact/domain/demandeDeContactAccompagnement.repository';
import {
  buildDemandeDeContactApiTipimail,
} from '~/server/demande-de-contact/infra/tipimailDemandeDeContact.builder';
import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import { HttpClientService } from '~/server/services/http/httpClientService';
import { LoggerService } from '~/server/services/logger.service';

const SOURCE = 'API Tipimail';

export class TipimailDemandeDeContactRepository implements DemandeDeContactAccompagnementRepository {
  constructor(
    private httpClient: HttpClientService,
    private mailerServiceActive: boolean,
    private mailerServiceRedirectTo?: string,
  ) {}

  async send(demandeDeContactAccompagnement: DemandeDeContactAccompagnement): Promise<Either<void>> {
    try {
      const tipimailDemandeDeContactRequest = buildDemandeDeContactApiTipimail(demandeDeContactAccompagnement, this.mailerServiceRedirectTo);
      if (this.mailerServiceActive) {
        await this.httpClient.post('messages/send', tipimailDemandeDeContactRequest);
      } else {
        // eslint-disable-next-line no-console
        console.log('Mailer désactivé, email non envoyé', JSON.stringify(tipimailDemandeDeContactRequest));
      }
      return createSuccess(undefined);
    } catch (e) {
      LoggerService.errorWithExtra(
        new SentryException(
          '[API Tipimail] impossible d‘envoyer un email',
          { context: 'Envoi demande de contact', source: SOURCE },
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
