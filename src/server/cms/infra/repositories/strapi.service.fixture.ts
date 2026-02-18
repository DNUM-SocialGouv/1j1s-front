import { CmsService } from '~/server/cms/domain/cmsService';

export function aStrapiService(override?: Partial<CmsService>): CmsService {
	return {
		getCollectionType: vi.fn(),
		getFirstFromCollectionType: vi.fn(),
		getSingleType: vi.fn(),
		save: vi.fn(),
		...override,
	};
}
