import { Mail } from '~/server/mail/domain/mail';
import { TipimailRequest } from '~/server/mail/infra/repositories/tipimail';

export function mapTipimailRequest(mail: Mail, context: string[], redirectTo?: string): TipimailRequest {
	return {
		headers: {
			'X-TM-DOMAIN': '1jeune1solution.gouv.fr',
			'X-TM-TAGS': context,
		},
		...mail,
		to: mail.to.map((to: Mail.Contact) => ({
			...to,
			address: redirectTo || to.address,
		})),
	};
}
