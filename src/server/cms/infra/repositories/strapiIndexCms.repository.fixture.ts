import { createSuccess } from '~/server/errors/either';

import { StrapiIndexCmsRepository } from './strapiIndexCms.repository';

export function aStrapiIndexCmsRepository() {
	return {
		save: jest.fn().mockResolvedValue(createSuccess(undefined)),
		saveOffreDeStage: undefined,
	} as unknown as StrapiIndexCmsRepository;
}
