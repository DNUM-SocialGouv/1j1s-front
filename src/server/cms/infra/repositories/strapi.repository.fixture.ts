import { createSuccess } from '~/server/errors/either';

import { StrapiRepository } from './strapi.repository';

export function aStrapiCmsRepository(override?:Partial<StrapiRepository>) {
	return {
		getResource: jest.fn().mockResolvedValue(createSuccess(undefined)),
		save: jest.fn().mockResolvedValue(createSuccess(undefined)),
		saveEntrepriseRejoindreLaMobilisation: jest.fn().mockResolvedValue(createSuccess(undefined)),
		...override,
	} as unknown as StrapiRepository;
}
