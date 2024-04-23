import { createSuccess } from '~/server/errors/either';
import { MailRepository } from '~/server/mail/domain/mail.repository';

export function aMailRepository(): MailRepository {
	return {
		send: jest.fn().mockResolvedValue(createSuccess(undefined)),
	};
}
