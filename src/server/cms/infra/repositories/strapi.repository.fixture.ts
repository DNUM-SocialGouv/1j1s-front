import { CmsRepository } from '~/server/cms/domain/cms.repository';

import { StrapiRepository } from './strapi.repository';

export function aStrapiCmsRepository(override?: Partial<StrapiRepository>): CmsRepository {
	return {
		getActualitéList: jest.fn(),
		getArticleBySlug: jest.fn(),
		getCollectionType: jest.fn(),
		getCollectionTypeDeprecated: jest.fn(),
		getFirstFromCollectionType: jest.fn(),
		getMentionObligatoire: jest.fn(),
		getMesuresEmployeurs: jest.fn(),
		getSingleType: jest.fn(),
		listAllArticleSlug: jest.fn(),
		save: jest.fn(),
		...override,
	};
}
