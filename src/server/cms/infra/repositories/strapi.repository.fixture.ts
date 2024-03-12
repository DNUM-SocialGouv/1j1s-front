import { CmsRepository } from '~/server/cms/domain/cms.repository';

import { StrapiRepository } from './strapi.repository';

export function aStrapiCmsRepository(override?: Partial<StrapiRepository>): CmsRepository {
	return {
		getCollectionType: jest.fn(),
		getCollectionTypeDeprecated: jest.fn(),
		getFirstFromCollectionType: jest.fn(),
		getSingleType: jest.fn(),
		save: jest.fn(),
		...override,
	};
}
