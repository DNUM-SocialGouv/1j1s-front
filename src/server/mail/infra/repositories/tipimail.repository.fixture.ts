import { createSuccess } from '~/server/errors/either';

import { TipimailRepository } from './tipimail.repository';

export function aMailRepository(): TipimailRepository {
  return {
    send: jest.fn().mockResolvedValue(createSuccess(undefined)),
  } as unknown as TipimailRepository;
}
