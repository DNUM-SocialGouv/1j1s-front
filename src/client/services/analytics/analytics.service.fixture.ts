import { AnalyticsService } from './analytics.service';

export function anAnalyticsService(overrides?: Partial<AnalyticsService>): AnalyticsService {
	return {
		envoyerAnalyticsPageVue: jest.fn(),
		isAnalyticsAutorisé: jest.fn(() => false),
		isConsentementCookieAutorisé: jest.fn(() => true),
		...overrides,
	} as unknown as AnalyticsService;
}
