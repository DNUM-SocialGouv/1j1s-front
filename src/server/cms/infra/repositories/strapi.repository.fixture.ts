import { createSuccess } from '~/server/errors/either';

import { StrapiRepository } from './strapi.repository';

export function aStrapiCmsRepository() {
	return {
		getResource: jest.fn().mockResolvedValue(createSuccess(undefined)),
		save: jest.fn().mockResolvedValue(createSuccess(undefined)),
	} as unknown as StrapiRepository;
}
