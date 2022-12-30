import { createSuccess } from '~/server/errors/either';

import { StrapiCmsRepository } from './strapiCms.repository';

export function aStrapiCmsRepository() {
	return {
		getResource: jest.fn().mockResolvedValue(createSuccess(undefined)),
		save: jest.fn().mockResolvedValue(createSuccess(undefined)),
	} as unknown as StrapiCmsRepository;
}
