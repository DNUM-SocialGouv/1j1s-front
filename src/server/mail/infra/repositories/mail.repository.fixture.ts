import { createSuccess } from '~/server/errors/either';

import { MailRepository } from './mail.repository';

export function aMailRepository(): MailRepository {
  return {
    send: jest.fn().mockResolvedValue(createSuccess(undefined)),
  } as unknown as MailRepository;
}
