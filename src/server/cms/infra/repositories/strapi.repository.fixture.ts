import { CmsRepository } from '~/server/cms/domain/cms.repository';

import { StrapiRepository } from './strapi.repository';

export function aStrapiCmsRepository(override?: Partial<StrapiRepository>): CmsRepository {
	return {
		getActualitéList: jest.fn(),
		getAllVideosCampagneApprentissage: jest.fn(),
		getArticleBySlug: jest.fn(),
		getCollectionType: jest.fn(),
		getCollectionTypeDeprecated: jest.fn(),
		getFirstFromCollectionType: jest.fn(),
		getMentionObligatoire: jest.fn(),
		getMesuresEmployeurs: jest.fn(),
		getOffreDeStageBySlug: jest.fn(),
		getServiceJeuneList: jest.fn(),
		listAllArticleSlug: jest.fn(),
		listAllOffreDeStageSlug: jest.fn(),
		save: jest.fn(),
		saveOffreDeStage: jest.fn(),
		...override,
	};
}
