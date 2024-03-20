import { CmsService } from '~/server/cms/domain/cmsService';

export function aStrapiService(override?: Partial<CmsService>): CmsService {
	return {
		getCollectionType: jest.fn(),
		getFirstFromCollectionType: jest.fn(),
		getSingleType: jest.fn(),
		save: jest.fn(),
		...override,
	};
}
