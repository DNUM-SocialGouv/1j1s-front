import { AnalyticsService } from './analytics.service';

export function anAnalyticsService(): AnalyticsService {
	return {
		envoyerAnalyticsPageVue: jest.fn(),
		isAnalyticsAutorisé: jest.fn(() => false),
		isConsentementCookieAutorisé: jest.fn(() => false),
	} as unknown as AnalyticsService;
}
