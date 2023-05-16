import { AnalyticsService } from './analytics.service';

export function anAnalyticsService(overrides?: Partial<AnalyticsService>): AnalyticsService {
	return {
		envoyerAnalyticsPageVue: jest.fn(),
		isConsentementCookieAutorisé: jest.fn(() => true),
		...overrides,
	} as unknown as AnalyticsService;
}
