import { MarketingService } from './marketing.service';

export function aMarketingService(override: Partial<MarketingService>): MarketingService {
	return {
		trackPage: jest.fn(),
		...override,
	};
}
