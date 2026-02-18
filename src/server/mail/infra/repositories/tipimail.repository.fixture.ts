import { createSuccess } from '~/server/errors/either';
import { MailRepository } from '~/server/mail/domain/mail.repository';

export function aMailRepository(): MailRepository {
	return {
		send: vi.fn().mockResolvedValue(createSuccess(undefined)),
	};
}
