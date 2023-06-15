import { createSuccess, Either } from '~/server/errors/either';
import { Mail } from '~/server/mail/domain/mail';
import { MailRepository } from '~/server/mail/domain/mail.repository';
import { mapTipimailRequest } from '~/server/mail/infra/repositories/tipimail.mapper';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';

export class TipimailRepository implements MailRepository {
	constructor(
		private readonly httpClient: PublicHttpClientService,
		private readonly errorManagementService: ErrorManagementService,
		private readonly mailerServiceActive: boolean,
		private readonly mailerServiceRedirectTo?: string,
	) {
	}

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
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API Tipimail',
				contexte: 'Envoi email',
				message: 'impossible d‘envoyer un email',
			});
		}
	}
}
