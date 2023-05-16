import { AnalyticsService } from './analytics.service';

export function anAnalyticsService(): AnalyticsService {
	return {
		envoyerAnalyticsPageVue: jest.fn(),
		isConsentementCookieAutorisé: jest.fn(() => false),
	} as unknown as AnalyticsService;
}
