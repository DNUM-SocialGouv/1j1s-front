import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import { Mail } from '~/server/mail/domain/mail';
import { MailRepository } from '~/server/mail/domain/mail.repository';
import { mapTipimailRequest } from '~/server/mail/infra/repositories/tipimail.mapper';
import { isHttpError } from '~/server/services/http/httpError';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';
import { LoggerService } from '~/server/services/logger.service';

const SOURCE = 'API Tipimail';

export class TipimailRepository implements MailRepository {
	constructor(
    private httpClient: PublicHttpClientService,
	private loggerService: LoggerService,
    private mailerServiceActive: boolean,
    private mailerServiceRedirectTo?: string,
	) {}

	async send(mail: Mail, context: string[]): Promise<Either<void>> {
		const tipimailRequest = mapTipimailRequest(mail, context, this.mailerServiceRedirectTo);
		try {
			if (this.mailerServiceActive) {
				await this.httpClient.post('messages/send', tipimailRequest);
			} else {
				// eslint-disable-next-line no-console
				console.log('Mailer désactivé, email non envoyé', JSON.stringify(tipimailRequest));
			}
			return createSuccess(undefined);
		} catch (e) {
			this.loggerService.errorWithExtra(
				new SentryException(
					'[API Tipimail] impossible d‘envoyer un email',
					{ context: 'Envoi mail', source: SOURCE },
					{ errorDetail: e },
				),
			);
			if (isHttpError(e)) {
				if (e.response?.status === 400) {
					return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
				}
			}
			return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
		}
	}
}
