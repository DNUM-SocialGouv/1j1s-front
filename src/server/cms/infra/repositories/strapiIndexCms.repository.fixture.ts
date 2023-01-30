import { createSuccess } from '~/server/errors/either';

import { StrapiIndexCmsRepository } from './strapiIndexCms.repository';

export function aStrapiIndexCmsRepository() {
	return {
		saveOffreDeStage: undefined,
		save: jest.fn().mockResolvedValue(createSuccess(undefined)),
	} as unknown as StrapiIndexCmsRepository;
}
