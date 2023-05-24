import { AnalyticsService } from './analytics.service';

export function anAnalyticsService(overrides?: Partial<AnalyticsService>): AnalyticsService {
	return {
		envoyerAnalyticsPageVue: jest.fn(),
		isAllowed: jest.fn(() => true),
		...overrides,
	};
}
